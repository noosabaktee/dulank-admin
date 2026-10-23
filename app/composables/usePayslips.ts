import type { PayslipItem, PayslipFormData, PayslipFilterParams } from '#server/types/payslip'

interface ResponseData {
  success: boolean
  data: PayslipItem[]
  message?: string
}

export function usePayslips() {
  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/payslips', {
    key: 'payslips-list', query: { limit: 100 }
  })

  const payslips = computed<PayslipItem[]>(() => data.value?.data ?? [])

  const savePayslip = async (payload: PayslipFormData) => {
    const res = await apiFetch<{ success: boolean; data: PayslipItem; message?: string }>(payload.id ? `/api/v1/admin/payslips/${encodeURIComponent(payload.id)}` : '/api/v1/admin/payslips/generate', {
      method: payload.id ? 'PUT' : 'POST',
      body: { employeeId: payload.employeeId, period: payload.period, dayWorked: payload.dayWorked, overtime: payload.overtime, deduction: payload.deduction }
    })
    await refresh()
    return res
  }

  const deletePayslip = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/payslips/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  const payPayslip = async (slipNo: string, body: { amount?: number; method: string; bankAccountId?: string }) => {
    const result = await apiFetch(`/api/v1/admin/payslips/${encodeURIComponent(slipNo)}/pay`, { method: 'POST', body })
    await refresh()
    return result
  }

  return {
    payslips,
    pending,
    error,
    refresh,
    savePayslip,
    payPayslip,
    deletePayslip
  }
}
