import type { PaperSize, PaperSizeFormData, PaperSizeFilterParams } from '#server/types/paper-shop'

interface ResponseData {
  success: boolean
  data: PaperSize[]
  stats: {
    total: number
    active: number
    deactive: number
  }
}

export function usePaperSizesSelf(filterParams?: Ref<PaperSizeFilterParams> | PaperSizeFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/paper-sizes', {
    key: 'paper-sizes-self-list',
    query: params
  })

  const sizes = computed<PaperSize[]>(() => data.value?.data ?? [])
  const stats = computed(() => ({ total: sizes.value.length, active: sizes.value.filter(row => row.status === 'Active').length, deactive: sizes.value.filter(row => row.status !== 'Active').length }))

  const saveSize = async (payload: PaperSizeFormData) => {
    const res = await apiFetch<{ success: boolean; data: PaperSize; message?: string }>(payload.id ? `/api/v1/admin/paper-sizes/${encodeURIComponent(payload.id)}` : '/api/v1/admin/paper-sizes', {
      method: payload.id ? 'PUT' : 'POST',
      body: payload
    })
    await refresh()
    return res
  }

  const deleteSize = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/paper-sizes/${id}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    sizes,
    stats,
    pending,
    error,
    refresh,
    saveSize,
    deleteSize
  }
}

