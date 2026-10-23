import type { CashAdvanceFormData, CashAdvanceView, CashAdvancePayment } from '#server/types/cash-advance'

interface ResponseData {
  success: boolean
  data: CashAdvanceView[]
}

interface MutationResponse {
  success: boolean
  data?: CashAdvanceView
  message: string
}

/**
 * Kas bon (cash advance) — backend Laravel `/api/v1/admin/cash-advances`.
 * Route mutasi memakai binding id; pembayaran via `/payments`.
 */
export function useCashAdvances() {
  const request = useApiFetch<ResponseData>('/api/v1/admin/cash-advances', {
    key: 'cash-advance-list',
    query: { limit: 100 },
  })
  const items = computed<CashAdvanceView[]>(() => request.data.value?.data ?? [])

  async function save(payload: CashAdvanceFormData) {
    const { id } = payload
    const body = {
      employeeId: payload.employeeId || null,
      employeeName: payload.employeeName || undefined,
      bankAccountId: payload.bankAccountId || null,
      date: payload.date, totalCash: payload.totalCash,
      installmentCount: payload.installmentCount, period: payload.period, note: payload.note,
    }

    const result = await apiFetch<MutationResponse>(
      id ? `/api/v1/admin/cash-advances/${encodeURIComponent(id)}` : '/api/v1/admin/cash-advances',
      { method: id ? 'PUT' : 'POST', body },
    )
    await request.refresh()
    return result
  }
  async function remove(id: string) {
    const result = await apiFetch<{ success: boolean; message: string }>(
      `/api/v1/admin/cash-advances/${encodeURIComponent(id)}`,
      { method: 'DELETE' },
    )
    await request.refresh()
    return result
  }
  async function recordPayment(id: string, payload: CashAdvancePayment) {
    const result = await apiFetch<MutationResponse>(
      `/api/v1/admin/cash-advances/${encodeURIComponent(id)}/payments`,
      { method: 'POST', body: payload },
    )
    await request.refresh()
    return result
  }
  return { items, pending: request.pending, error: request.error, refresh: request.refresh, save, remove, recordPayment }
}