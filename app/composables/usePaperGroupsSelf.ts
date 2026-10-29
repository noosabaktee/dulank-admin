import type { PaperGroup, PaperGroupFormData, PaperGroupFilterParams } from '#server/types/paper-shop'

interface ResponseData {
  success: boolean
  data: PaperGroup[]
  stats: {
    total: number
    active: number
    deactive: number
  }
}

export function usePaperGroupsSelf(filterParams?: Ref<PaperGroupFilterParams> | PaperGroupFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/paper-groups', {
    key: 'paper-groups-self-list',
    query: params
  })

  const groups = computed<PaperGroup[]>(() => data.value?.data ?? [])
  const stats = computed(() => ({ total: groups.value.length, active: groups.value.filter(row => row.status === 'Active').length, deactive: groups.value.filter(row => row.status !== 'Active').length }))

  const saveGroup = async (payload: PaperGroupFormData) => {
    const res = await apiFetch<{ success: boolean; data: PaperGroup; message?: string }>(payload.id ? `/api/v1/admin/paper-groups/${encodeURIComponent(payload.id)}` : '/api/v1/admin/paper-groups', {
      method: payload.id ? 'PUT' : 'POST',
      body: payload
    })
    await refresh()
    return res
  }

  const deleteGroup = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/paper-groups/${id}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    groups,
    stats,
    pending,
    error,
    refresh,
    saveGroup,
    deleteGroup
  }
}

