import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import * as Vue from 'vue'

function harness(file, records = []) {
  const calls = []
  let refreshes = 0
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const context = { exports: {}, ...Vue, FormData, File,
    useApiFetch: (url, options) => { calls.push({ read: url, options }); return { data: Vue.ref({ data: records }), pending: Vue.ref(false), error: Vue.ref(null), refresh: async () => { refreshes++ } } },
    apiFetch: async (url, options) => { calls.push({ url, ...options }); return { success: true, data: {} } },
    require: name => { if (name === '~/utils/calculatorPartner') return { normalizeCalculatorPartner: row => row }; throw new Error('Unexpected runtime import') }
  }
  vm.runInNewContext(code, context)
  return { exports: context.exports, calls, refreshes: () => refreshes }
}

test('payslip forms generate via employee ID and send only payroll inputs', async () => {
  const h = harness('app/composables/usePayslips.ts')
  const api = h.exports.usePayslips()
  await api.savePayslip({ employeeId: '8', name: 'Nadia', period: '2026-10', dayWorked: 26, overtime: 0, deduction: 0, salaryRate: 999999, allowance: 999999, status: 'Paid' })
  const call = h.calls.find(item => item.method === 'POST')
  assert.equal(call.url, '/api/v1/admin/payslips/generate')
  assert.equal(call.body.employeeId, '8')
  assert.equal('salaryRate' in call.body, false)
  assert.equal('status' in call.body, false)
  await api.savePayslip({ id: '2', employeeId: '8', period: '2026-10', dayWorked: 26, overtime: 0, deduction: 0 })
  assert.equal(h.calls.find(item => item.method === 'PUT').url, '/api/v1/admin/payslips/2')
})

test('document upload submits original file bytes and edit uses PUT', async () => {
  const h = harness('app/composables/useDownloadFiles.ts')
  const api = h.exports.useDownloadFiles()
  const file = new File(['Panduan kantor'], 'panduan.txt', { type: 'text/plain' })
  await api.saveFile({ name: 'Panduan', category: 'Panduan', file })
  const upload = h.calls.find(item => item.method === 'POST')
  assert.ok(upload.body instanceof FormData)
  assert.equal(await upload.body.get('file').text(), 'Panduan kantor')
  await api.saveFile({ id: '5', name: 'Panduan Kantor', category: 'General' })
  assert.equal(h.calls.find(item => item.method === 'PUT').url, '/api/v1/admin/download-files/5')
})

test('favorite updates persist through API and salary status uses canonical backend values', async () => {
  const h = harness('app/composables/useDownloadFiles.ts')
  await h.exports.useDownloadFiles().toggleFavorite({ id: '5', name: 'Panduan', category: 'Panduan', isFavorite: false })
  assert.equal(h.calls.find(item => item.method === 'PUT').body.isFavorite, true)
  const salaryHarness = harness('app/composables/useEmployeeSalaries.ts', [{ id: '1', status: 'Inactive' }])
  const salaryApi = salaryHarness.exports.useEmployeeSalaries()
  assert.equal(salaryApi.salaries.value[0].status, 'Disabled')
  await salaryApi.saveSalary({ employeeId: '9', status: 'Disabled' })
  assert.equal(salaryHarness.calls.find(item => item.method === 'POST').body.status, 'Inactive')
})

test('ticket creation maps customer fields and refreshes list plus server statistics', async () => {
  const h = harness('app/composables/useSupportTickets.ts')
  const api = h.exports.useSupportTickets()
  await api.createTicket({ customerName: 'Laras', email: 'laras@pelanggan.test', descriptions: 'Mohon bantuan mengubah profil.' })
  const call = h.calls.find(item => item.method === 'POST')
  assert.equal(call.body.requestedBy, 'Laras')
  assert.equal(call.body.customerEmail, 'laras@pelanggan.test')
  assert.equal(call.body.description, 'Mohon bantuan mengubah profil.')
  assert.equal(call.body.subject, 'Mohon bantuan mengubah profil.')
  assert.equal(h.refreshes(), 2)
})

test('blog status filters map UI status to published API status', () => {
  const h = harness('app/composables/useBlogs.ts')
  h.exports.useBlogs(Vue.ref({ status: 'Active' }))
  assert.equal(h.calls[0].options.query.value.status, 'Publish')
})


test('cash advance updates send editable fields and repayments use the installment endpoint', async () => {
  const h = harness('app/composables/useCashAdvances.ts')
  const api = h.exports.useCashAdvances()
  await api.save({ id: '1', employeeId: '9', bankAccountId: '', totalCash: 900000, installmentCount: 3, period: 'Monthly', date: '2026-10-23', outstanding: 1, totalPaid: 899999 })
  const edit = h.calls.find(item => item.method === 'PUT')
  assert.equal(edit.url, '/api/v1/admin/cash-advances/1')
  assert.equal(edit.body.installmentCount, 3)
  assert.equal(edit.body.bankAccountId, null)
  assert.equal('outstanding' in edit.body, false)
  assert.equal('totalPaid' in edit.body, false)
  await api.recordPayment('1', { amount: 300000, date: '2026-10-23' })
  const payment = h.calls.find(item => item.method === 'POST')
  assert.equal(payment.url, '/api/v1/admin/cash-advances/1/payments')
  assert.equal(payment.body.amount, 300000)
  assert.equal(h.refreshes(), 2)
})

test('expense edits preserve the cumulative paid input and omit derived due and status', async () => {
  const h = harness('app/composables/useExpenses.ts')
  await h.exports.useExpenses().saveExpense({ id: '2', noExpense: 'EXP-2', name: 'Perawatan AC', amount: 600000, paid: 350000, due: 1, status: 'Paid', bankAccountId: '' })
  const edit = h.calls.find(item => item.method === 'PUT')
  assert.equal(edit.url, '/api/v1/admin/expenses/2')
  assert.equal(edit.body.paid, 350000)
  assert.equal(edit.body.bankAccountId, null)
  assert.equal('status' in edit.body, false)
  assert.equal('due' in edit.body, false)
  assert.equal(h.refreshes(), 1)
})


test('paper master edit requests update the selected ID instead of creating duplicates', async () => {
  for (const [file, factory, save, route] of [
    ['usePaperGroupsSelf.ts', 'usePaperGroupsSelf', 'saveGroup', 'paper-groups'],
    ['usePaperSizesSelf.ts', 'usePaperSizesSelf', 'saveSize', 'paper-sizes'],
    ['usePaperItemsSelf.ts', 'usePaperItemsSelf', 'saveItem', 'paper-items'],
    ['usePaperPricesSelf.ts', 'usePaperPricesSelf', 'savePrice', 'paper-prices'],
  ]) {
    const h = harness(`app/composables/${file}`)
    await h.exports[factory]()[save]({ id: '17', name: 'Ukuran aktual' })
    const mutation = h.calls.find(item => item.method === 'PUT')
    assert.equal(mutation.url, `/api/v1/admin/${route}/17`)
    assert.equal(h.calls.some(item => item.method === 'POST'), false)
    assert.equal(h.refreshes(), 1)
  }
})


test('paper marketplace delete targets the canonical master and preserves the machine listing endpoint', async () => {
 for (const [category, resource] of [['paper_group','paper-groups'], ['paper_size','paper-sizes'], ['paper_type','paper-items'], ['paper_price','paper-prices'], ['offset','calculator/listings']]) {
  const h = harness('app/composables/useCalculatorMarketplace.ts')
  const api = h.exports.useCalculatorListings(category)
  await api.deleteListing('17')
  assert.equal(h.calls.find(call => call.method === 'DELETE').url, `/api/v1/admin/${resource}/17`)
  assert.equal(h.calls[0].options.query.category, category)
  assert.equal(h.refreshes(),1)
 }
})
