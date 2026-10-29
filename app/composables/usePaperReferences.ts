import type { PaperItem, PaperSize } from '#server/types/paper-shop'
export function usePaperReferences() {
 const types = useApiFetch<{ data: PaperItem[] }>('/api/v1/admin/paper-items', { key: 'paper-reference-types' })
 const sizes = useApiFetch<{ data: PaperSize[] }>('/api/v1/admin/paper-sizes', { key: 'paper-reference-sizes' })
 return { types: computed(() => types.data.value?.data ?? []), sizes: computed(() => sizes.data.value?.data ?? []) }
}

export function usePaperMerchants() {
 const request = useApiFetch<{ data: { id: number; name: string }[] }>('/api/v1/admin/paper-merchants', { key: 'paper-merchant-options' })
 return computed(() => request.data.value?.data ?? [])
}
