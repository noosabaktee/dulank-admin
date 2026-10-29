import type { PaperPrice, PaperPriceFormData, PaperPriceFilterParams } from '#server/types/paper-price'

interface ResponseData {
  success: boolean
  data: PaperPrice[]
  message?: string
}

export function usePaperPrices(filterParams?: Ref<PaperPriceFilterParams> | PaperPriceFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/paper-prices', {
    key: 'paper-prices-list',
    query: params
  })

  const paperPrices = computed<PaperPrice[]>(() => data.value?.data ?? [])

  const savePaperPrice = async (payload: PaperPriceFormData) => {
    const res = await apiFetch<{ success: boolean; data: PaperPrice; message?: string }>(payload.id ? `/api/v1/admin/paper-prices/${encodeURIComponent(payload.id)}` : '/api/v1/admin/paper-prices', {
      method: payload.id ? 'PUT' : 'POST',
      body: payload
    })
    await refresh()
    return res
  }

  const deletePaperPrice = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/paper-prices/${id}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    paperPrices,
    pending,
    error,
    refresh,
    savePaperPrice,
    deletePaperPrice
  }
}
