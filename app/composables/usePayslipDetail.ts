import type { PayslipItem } from '#server/types/payslip'

export function usePayslipDetail() {
  const route = useRoute()
  const id = computed(() => String(route.query.id ?? ''))
  const { data, pending, error, refresh } = useApiFetch<{ success: boolean; data: PayslipItem }>(`/api/v1/admin/payslips/${encodeURIComponent(id.value || 'missing')}`, { key: `payslip-detail-${id.value}` })
  const record = computed(() => data.value?.data)
  return { record, pending, error, refresh }
}
