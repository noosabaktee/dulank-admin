import type { PaperPrice, PaperPriceFormData, PaperPriceFilterParams } from '#server/types/paper-shop'

interface ResponseData {
  success: boolean
  data: PaperPrice[]
  stats: {
    total: number
    totalGroups: number
    active: number
    deactive: number
  }
}

export function usePaperPricesSelf(filterParams?: Ref<PaperPriceFilterParams> | PaperPriceFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/paper-prices', {
    key: 'paper-prices-self-list',
    query: params
  })

  const prices = computed<PaperPrice[]>(() => data.value?.data ?? [])
  const stats = computed(() => ({ total: prices.value.length, totalGroups: new Set(prices.value.map(row => row.groupId)).size, active: prices.value.filter(row => row.status === 'Active').length, deactive: prices.value.filter(row => row.status !== 'Active').length }))

  const savePrice = async (payload: PaperPriceFormData) => {
    const res = await apiFetch<{ success: boolean; data: PaperPrice; message?: string }>(payload.id ? `/api/v1/admin/paper-prices/${encodeURIComponent(payload.id)}` : '/api/v1/admin/paper-prices', {
      method: payload.id ? 'PUT' : 'POST',
      body: payload
    })
    await refresh()
    return res
  }

  const deletePrice = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/paper-prices/${id}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    prices,
    stats,
    pending,
    error,
    refresh,
    savePrice,
    deletePrice
  }
}

