import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as Vue from 'vue'
import * as VueServer from 'vue/server-renderer'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'

function evaluate(code, extra = {}, imports = {}) {
  const output = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const context = { exports: {}, ...Vue, ...extra, require: name => {
    if (name === 'vue') return Vue
    if (name === 'vue/server-renderer') return VueServer
    if (name in imports) return imports[name]
    throw new Error(`Unexpected import: ${name}`)
  } }
  vm.runInNewContext(output, context)
  return context.exports
}
const { normalizeCalculatorPartner } = evaluate(fs.readFileSync('app/utils/calculatorPartner.ts', 'utf8'))

test('both partner pages can calculate every metric when metrics are null', () => {
  for (const type of ['printing_shop', 'paper_store']) {
    const row = normalizeCalculatorPartner({ id: 1, type, metrics: null })
    for (const key of ['offset', 'paper', 'group', 'size', 'type', 'laminate', 'dieCutting', 'hotPrint']) assert.equal(row.metrics[key], 0)
    assert.equal(row.kind, type === 'paper_store' ? 'paper_shop' : type)
  }
})
test('Laravel and legacy nonzero metric names remain correct', () => {
  const row = normalizeCalculatorPartner({ id: 2, type: 'printing_shop', metrics: { paperCount: 15, printingCount: 3, laminationCount: 2, foilCount: 4 } })
  assert.equal(row.metrics.paper, 15); assert.equal(row.metrics.offset, 3); assert.equal(row.metrics.laminate, 2); assert.equal(row.metrics.hotPrint, 4)
  assert.equal(normalizeCalculatorPartner({ id: 3, kind: 'paper_shop', metrics: { paper: 8, size: 5 } }).metrics.paper, 8)
  assert.equal(normalizeCalculatorPartner(null), null)
})

function apiHarness(response, failure) {
  const notices = []
  const source = fs.readFileSync('app/utils/apiFetch.ts', 'utf8').replaceAll('import.meta.client', 'true').replaceAll('import.meta.server', 'false')
  const { apiFetch } = evaluate(source, {
    $fetch: async () => { if (failure) throw failure; return response }, Headers,
    useCookie: () => ({ value: null }), useRuntimeConfig: () => ({ public: { apiBase: '' } }),
    window: { localStorage: { getItem: () => null } }, process: { env: {} },
  }, { '~/utils/actionToast': { showActionToast: (...args) => notices.push(args) } })
  return { apiFetch, notices }
}
test('CRUD success receives a toast while reads/uploads do not', async () => {
  const { apiFetch, notices } = apiHarness({ success: true })
  await apiFetch('/api/v1/admin/departments', { method: 'POST' })
  assert.equal(notices.length, 1); assert.equal(notices[0][1], 'success')
  await apiFetch('/api/v1/admin/departments')
  await apiFetch('/api/v1/admin/uploads/image', { method: 'POST' })
  assert.equal(notices.length, 1)
})
test('application-level failures never produce a success toast', async () => {
  const { apiFetch, notices } = apiHarness({ success: false, message: 'Data ditolak.' })
  await assert.rejects(apiFetch('/api/v1/admin/departments', { method: 'POST' }), /Data ditolak/ )
  assert.equal(notices.length, 1); assert.equal(notices[0][1], 'error')
})
test('failed CRUD emits error details and still rejects for form error handling', async () => {
  const error = { status: 422, data: { errors: { name: ['Nama wajib diisi.'] } } }
  const { apiFetch, notices } = apiHarness(undefined, error)
  await assert.rejects(apiFetch('/api/v1/admin/designations/1', { method: 'PUT' }), cause => cause === error)
  assert.equal(notices[0][0], 'Nama wajib diisi.'); assert.equal(notices[0][1], 'error')
})

async function renderComponent(file, props, imports = {}) {
  const { descriptor } = parse(fs.readFileSync(file, 'utf8'))
  const script = compileScript(descriptor, { id: 'ui-test' })
  const template = compileTemplate({ source: descriptor.template.content, filename: file, id: 'ui-test', ssr: true, ssrCssVars: [], compilerOptions: { bindingMetadata: script.bindings } })
  assert.equal(template.errors.length, 0)
  const compiled = evaluate(`${script.content}\n${template.code}\nexports.default.ssrRender = exports.ssrRender;`, {}, imports)
  const app = Vue.createSSRApp(compiled.default, props)
  app.component('FeatherIcon', { template: '<span />' })
  app.component('SalesDialog', { template: '<div><slot /></div>' })
  return VueServer.renderToString(app)
}
test('member input renders selected names as removable chips without a checkbox list', async () => {
  const html = await renderComponent('app/components/Common/OrganizationMemberPicker.vue', { modelValue: ['2'], employees: [{ id: 2, name: 'Sari' }] })
  assert.match(html, /Sari/); assert.match(html, /Hapus Sari/); assert.match(html, /role="combobox"/); assert.doesNotMatch(html, /type="checkbox"|type="radio"/)
})
test('photo field renders Employee style preview/remove and hides the native file picker', async () => {
  const html = await renderComponent('app/components/Common/EntityPhotoField.vue', { modelValue: '/storage/photo.jpg' })
  assert.match(html, /rounded-full/); assert.match(html, /Hapus foto/); assert.match(html, /Change Photo/); assert.match(html, /type="file"[^>]*class="hidden"/)
})


const moneyField = { props: ['modelValue', 'readonly', 'disabled'], template: '<input :value="modelValue" :readonly="readonly" :disabled="disabled" />' }
const formImports = {
  '~/components/Common/CurrencyInput.vue': { default: moneyField },
  '~/components/Sales/SalesDialog.vue': { default: { template: '<div><slot /></div>' } },
  '~/utils/salesUi': {},
}

test('cash advance edit displays calculated outstanding read-only and preserves saved tenor', async () => {
  const html = await renderComponent('app/components/Pages/CashAdvance/CashAdvanceFormModal.vue', {
    open: true, item: { id: '1', employeeId: '9', employee: 'Rani', totalCash: 900000, totalPaid: 300000, installmentCount: 3, payments: [{ id: '1' }], period: 'Monthly', date: '2026-10-23' }, employees: [], accounts: [],
  }, formImports)
  assert.match(html, /value="600000"[^>]*readonly/)
  assert.match(html, /value="900000"[^>]*disabled/)
  assert.match(html, /value="3"/)
  assert.match(html, /Otomatis: total kasbon/)
})

test('expense edit explains cumulative payments and locks the account after payment', async () => {
  const html = await renderComponent('app/components/Pages/Expense/ExpenseFormDialog.vue', {
    open: true, item: { id: '2', name: 'Perawatan AC', amount: 600000, paid: 200000, bankAccountId: '3' }, categories: [], bankAccounts: [],
  }, formImports)
  assert.match(html, /Total kumulatif/)
  assert.match(html, /value="200000"/)
  assert.match(html, /<select[^>]*disabled/)
  assert.match(html, /Rekening #3/)
})
