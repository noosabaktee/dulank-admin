import type { CashAdvanceFormData, CashAdvanceView, CashAdvancePayment } from '#server/types/cash-advance'
import type { EmployeeItem } from '#server/types/employee'
import { useBankAccounts } from './useBankAccounts'
import { useCashAdvances } from './useCashAdvances'
import { useEmployees } from './useEmployees'
import { salesErrorMessage } from '~/utils/salesDocuments'
export function useCashAdvanceManager() {
  const domain = useCashAdvances()
  const employeeDomain = useEmployees()
  const bankDomain = useBankAccounts()
  const search = ref('')
  const currentPageItems = ref<CashAdvanceView[]>([])
  const formTarget = ref<CashAdvanceView | null>(null)
  const detailTarget = ref<CashAdvanceView | null>(null)
  const deleteTarget = ref<CashAdvanceView | null>(null)
  const formOpen = ref(false)
  const busy = ref(false)
  const mutationError = ref('')
  const message = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined
  const employees = computed<EmployeeItem[]>(() => employeeDomain.employees.value.filter((item: EmployeeItem) => item.status === 'Active'))
  const items = computed<CashAdvanceView[]>(() => {
    const query = search.value.trim().toLowerCase()
    return domain.items.value.filter((item: CashAdvanceView) => !query || item.id.toLowerCase().includes(query) || item.employee.toLowerCase().includes(query) || (item.note ?? '').toLowerCase().includes(query))
  })
  const totalOutstanding = computed<number>(() => domain.items.value.reduce((sum: number, item: CashAdvanceView) => sum + item.outstanding, 0))
  const pending = computed(() => domain.pending.value || employeeDomain.pending.value)
  const error = computed(() => domain.error.value || employeeDomain.error.value)
  function notify(value: string) { message.value = value; if (timer) clearTimeout(timer); timer = setTimeout(() => { message.value = '' }, 3500) }
  function openForm(item: CashAdvanceView | null = null) { mutationError.value = ''; formTarget.value = item; formOpen.value = true }
  async function save(payload: CashAdvanceFormData) {
    busy.value = true; mutationError.value = ''
    try { const result = await domain.save(payload); await bankDomain.refresh(); formOpen.value = false; notify(result.message) }
    catch (error) { mutationError.value = salesErrorMessage(error) } finally { busy.value = false }
  }
  async function remove() {
    if (!deleteTarget.value) return
    busy.value = true; mutationError.value = ''
    try { const result = await domain.remove(deleteTarget.value.id); await bankDomain.refresh(); deleteTarget.value = null; notify(result.message) }
    catch (error) { mutationError.value = salesErrorMessage(error) } finally { busy.value = false }
  }
  async function recordPayment(payload: CashAdvancePayment) {
    if (!detailTarget.value) return
    const id = detailTarget.value.id
    busy.value = true; mutationError.value = ''
    try {
      const result = await domain.recordPayment(id, payload)
      detailTarget.value = domain.items.value.find(item => item.id === id) ?? null
      await bankDomain.refresh()
      notify(result.message)
    } catch (error) { mutationError.value = salesErrorMessage(error) } finally { busy.value = false }
  }
  function openDetail(item: CashAdvanceView) { mutationError.value = ''; detailTarget.value = item }
  async function refresh() { search.value = ''; await Promise.all([domain.refresh(), employeeDomain.refresh()]) }
  onScopeDispose(() => { if (timer) clearTimeout(timer) })
  return { search, currentPageItems, formTarget, detailTarget, deleteTarget, formOpen, busy, mutationError, message, employees, accounts: bankDomain.accounts, items, totalOutstanding, pending, error, openForm, openDetail, save, remove, recordPayment, refresh }
}

