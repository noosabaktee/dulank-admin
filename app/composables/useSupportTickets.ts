import type {
  SupportTicket,
  SupportTicketCommand,
  SupportTicketStats,
  SupportTicketFilterQuery,
  SupportTicketUpdateCommand,
} from '#server/types/support-ticket'

interface ResponseData {
  success: boolean
  data: SupportTicket[]
  stats?: SupportTicketStats
  message?: string
}

export function useSupportTickets(filterParams?: Ref<SupportTicketFilterQuery> | SupportTicketFilterQuery) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/webstore/support-tickets', {
    key: 'webstore-support-tickets-list',
    query: params
  })

  const tickets = computed<SupportTicket[]>(() => data.value?.data ?? [])

  const { data: statsData, refresh: refreshStats } = useApiFetch<{ success: boolean; data: SupportTicketStats }>(
    '/api/v1/admin/webstore/support-tickets/stats',
    { key: 'webstore-support-tickets-stats' },
  )

  const stats = computed<SupportTicketStats>(() => statsData.value?.data ?? {
    totalTickets: 0,
    totalPendingTickets: 0,
    totalClosedTickets: 0,
    totalDeleteTickets: 0
  })

  const createTicket = async (payload: SupportTicketCommand) => {
    const res = await apiFetch<{ success: boolean; data: SupportTicket; message?: string }>('/api/v1/admin/webstore/support-tickets', {
      method: 'POST',
      body: { subject: payload.descriptions.trim().slice(0, 120), requestedBy: payload.customerName, customerEmail: payload.email, customerPhone: payload.phone, description: payload.descriptions }
    })
    await Promise.all([refresh(), refreshStats()])
    return res
  }

  const updateTicket = async (id: string, payload: SupportTicketUpdateCommand) => {
    const res = await apiFetch<{ success: boolean; data: SupportTicket; message?: string }>(`/api/v1/admin/webstore/support-tickets/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: payload
    })
    await Promise.all([refresh(), refreshStats()])
    return res
  }

  const deleteTicket = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/webstore/support-tickets/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    await Promise.all([refresh(), refreshStats()])
    return res
  }

  return {
    tickets,
    stats,
    pending,
    error,
    refresh,
    createTicket,
    updateTicket,
    deleteTicket
  }
}
