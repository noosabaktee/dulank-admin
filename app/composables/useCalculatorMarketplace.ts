import { normalizeCalculatorPartner } from '~/utils/calculatorPartner'
import type {
  CalculatorListingCategory,
  CalculatorListingRow,
  CalculatorModerationInput,
  CalculatorPartnerKind,
  CalculatorPartnerRow,
} from '#server/types/calculator-marketplace'

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: { total?: number }
}

export function useCalculatorPartners(kind: CalculatorPartnerKind) {
  const { data, pending, error, refresh } = useApiFetch<ApiResponse<CalculatorPartnerRow[]>>('/api/v1/admin/calculator/partners', {
    key: `calculator-partners-${kind}`,
    query: { type: kind === 'paper_shop' ? 'paper_store' : kind },
  })
  const partners = computed(() => (Array.isArray(data.value?.data) ? data.value.data : []).map(normalizeCalculatorPartner).filter((row): row is CalculatorPartnerRow => row !== null && row.kind === kind))

  async function moderatePartner(id: string, input: CalculatorModerationInput) {
    const response = await apiFetch<ApiResponse<CalculatorPartnerRow>>(`/api/v1/admin/calculator/partners/${encodeURIComponent(id)}/moderate`, { method: 'POST', body: input })
    await refresh()
    return response
  }

  async function deletePartner(id: string) {
    const response = await apiFetch<ApiResponse<CalculatorPartnerRow>>(`/api/v1/admin/calculator/partners/${encodeURIComponent(id)}`, { method: 'DELETE' })
    await refresh()
    return response
  }

  return { partners, pending, error, refresh, moderatePartner, deletePartner }
}

export function useCalculatorListings(category: CalculatorListingCategory) {
  const { data, pending, error, refresh } = useApiFetch<ApiResponse<CalculatorListingRow[]>>('/api/v1/admin/calculator/listings', {
    key: `calculator-listings-${category}`,
    query: { category },
  })
  const listings = computed(() => data.value?.data ?? [])

  async function deleteListing(id: string) {
    const paperResources: Partial<Record<CalculatorListingCategory, string>> = { paper_group: 'paper-groups', paper_size: 'paper-sizes', paper_type: 'paper-items', paper_price: 'paper-prices' }
    const resource = paperResources[category]
    const endpoint = resource ? `/api/v1/admin/${resource}/${encodeURIComponent(id)}` : `/api/v1/admin/calculator/listings/${encodeURIComponent(id)}`
    const response = await apiFetch<ApiResponse<CalculatorListingRow>>(endpoint, { method: 'DELETE' })
    await refresh()
    return response
  }

  async function moderateSource(sourcePartnerId: string, input: CalculatorModerationInput) {
    const response = await apiFetch<ApiResponse<CalculatorPartnerRow>>(`/api/v1/admin/calculator/partners/${encodeURIComponent(sourcePartnerId)}/moderate`, { method: 'POST', body: input })
    await refresh()
    return response
  }

  return { listings, pending, error, refresh, deleteListing, moderateSource }
}
