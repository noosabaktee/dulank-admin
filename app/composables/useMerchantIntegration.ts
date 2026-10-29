import type { MerchantIntegrationData } from '#server/types/merchant-integration'
export function useMerchantIntegration() {
 const request = useApiFetch<{ data: MerchantIntegrationData }>('/api/v1/admin/merchant-integration', { key: 'merchant-integration' })
 const data = computed(() => request.data.value?.data)
 const busy = ref(false); const error = ref(''); const message = ref('')
 async function mutate(path: string, body: unknown, method: 'PUT' | 'POST' = 'PUT') {
   busy.value = true; error.value = ''; message.value = ''
   try { await apiFetch(`/api/v1/admin/merchant-integration/${path}`, { method, body: body as Record<string, unknown> }); await request.refresh(); message.value = 'Pengaturan berhasil disimpan.' }
   catch (cause: any) { error.value = cause?.data?.message || 'Pengaturan gagal disimpan.' }
   finally { busy.value = false }
 }
 return { data, pending: request.pending, loadError: request.error, refresh: request.refresh, busy, error, message,
   saveSubscription: (body: unknown) => mutate('subscriptions', body, 'POST'),
   saveContent: (body: unknown) => mutate('content', body),
   moderate: (id: number, status: string) => mutate(`merchants/${id}`, { status }) }
}
