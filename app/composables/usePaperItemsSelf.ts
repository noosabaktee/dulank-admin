import type { PaperItem, PaperItemFormData, PaperItemFilterParams } from '#server/types/paper-shop'

interface ResponseData {
  success: boolean
  data: PaperItem[]
  stats: {
    total: number
    totalGroups: number
    active: number
    deactive: number
  }
}

export function usePaperItemsSelf(filterParams?: Ref<PaperItemFilterParams> | PaperItemFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/paper-items', {
    key: 'paper-items-self-list',
    query: params
  })

  const items = computed<PaperItem[]>(() => data.value?.data ?? [])
  const stats = computed(() => ({ total: items.value.length, totalGroups: new Set(items.value.map(row => row.groupId)).size, active: items.value.filter(row => row.status === 'Active').length, deactive: items.value.filter(row => row.status !== 'Active').length }))

  const saveItem = async (payload: PaperItemFormData) => {
    const res = await apiFetch<{ success: boolean; data: PaperItem; message?: string }>(payload.id ? `/api/v1/admin/paper-items/${encodeURIComponent(payload.id)}` : '/api/v1/admin/paper-items', {
      method: payload.id ? 'PUT' : 'POST',
      body: payload
    })
    await refresh()
    return res
  }

  const deleteItem = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/paper-items/${id}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    items,
    stats,
    pending,
    error,
    refresh,
    saveItem,
    deleteItem
  }
}

