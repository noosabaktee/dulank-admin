<script setup lang="ts">
import type { CalculatorListingCategory, CalculatorListingRow, CalculatorModerationInput } from '#server/types/calculator-marketplace'
import { useCalculatorListings } from '~/composables/useCalculatorMarketplace'
import { useTablePrint } from '~/composables/useTablePrint'
import { calculatorListingConfigs, formatCalculatorDate } from '~/utils/calculatorMarketplace'
import { formatIDR } from '~/utils/currency'
import AppBadge from '~/components/Common/AppBadge.vue'
import EntityIdentity from '~/components/Common/EntityIdentity.vue'

const props = defineProps<{ category: CalculatorListingCategory }>()
const config = computed(() => calculatorListingConfigs[props.category])
useLegacyPage({ title: config.value.title, sweetAlert: false })

const { listings, pending, error, refresh, deleteListing, moderateSource } = useCalculatorListings(props.category)
const visibilityFilter = ref('')
const statusFilter = ref('')
const currentPageItems = ref<Record<string, any>[]>([])
const selected = ref<CalculatorListingRow | null>(null)
const manageTarget = ref<CalculatorListingRow | null>(null)
const deleteTarget = ref<CalculatorListingRow | null>(null)
const busy = ref(false)
const actionError = ref('')
const message = ref('')
const { isPrintModalOpen, defaultPrintAction, openPrintModal, closePrintModal } = useTablePrint()

const filteredListings = computed(() => listings.value.filter(listing => {
  if (visibilityFilter.value && listing.visibility !== visibilityFilter.value) return false
  if (statusFilter.value && listing.status !== statusFilter.value) return false
  return true
}))

const rows = computed(() => filteredListings.value.map((listing) => {
  const details = listing.details
  return {
    ...listing,
    ...details,
    source: `${listing.sourceName} - ${listing.sourceAddress}`,
    updatedLabel: formatCalculatorDate(listing.updatedAt),
    statusLabel: `${listing.visibility} / ${listing.status}`,
    priceSummary: `${formatIDR(details.minimumPrice || 0)} minimum; Druck ${details.druck ?? '-'}%`,
    standard: `${formatIDR(details.standardRate || 0)} / min ${formatIDR(details.standardMinimum || 0)}`,
    halfCut: `${formatIDR(details.halfCutRate || 0)} / min ${formatIDR(details.halfCutMinimum || 0)}`,
    minimumOrderLabel: `${details.minimumOrder ?? '-'} ${details.minimumOrderUnit || ''}`.trim(),
    orderMultipleLabel: `${details.orderMultiple ?? '-'} ${details.orderMultipleUnit || ''}`.trim(),
    _record: listing,
  }
}))

const stats = computed(() => [
  { label: `Total ${config.value.title.replace(' List', '')}`, value: listings.value.length, icon: props.category.startsWith('paper_') ? 'file' : 'tool' },
  { label: 'Total Percetakan', value: new Set(listings.value.map(item => item.sourcePartnerId).filter(Boolean)).size, icon: 'users', tone: 'bg-cyan-50 text-cyan-700' },
  { label: 'Total Publish', value: listings.value.filter(item => item.visibility === 'Publish').length, icon: 'eye', tone: 'bg-emerald-50 text-emerald-700' },
  { label: 'Total Private', value: listings.value.filter(item => item.visibility === 'Private').length, icon: 'lock', tone: 'bg-amber-50 text-amber-700' },
])
const printColumns = computed(() => config.value.columns.filter(column => column.key !== 'actions'))

const detailRows = computed(() => {
  if (!selected.value) return []
  const display = rows.value.find(row => row.id === selected.value?.id)
  if (!display) return []
  return config.value.columns
    .filter(column => !['source', 'actions'].includes(column.key))
    .map(column => ({ label: column.label, value: display[column.key as keyof typeof display] as string | number }))
})

function notify(value: string) {
  message.value = value
  window.setTimeout(() => { if (message.value === value) message.value = '' }, 3500)
}

async function submitModeration(input: CalculatorModerationInput) {
  if (!manageTarget.value) return
  busy.value = true
  actionError.value = ''
  try {
    const response = await moderateSource(manageTarget.value.sourcePartnerId, input)
    notify(response.message || 'Tindakan sumber berhasil disimpan')
    manageTarget.value = null
  } catch (cause: any) {
    actionError.value = cause?.data?.statusMessage || cause?.message || 'Tindakan gagal disimpan'
  } finally { busy.value = false }
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  busy.value = true
  actionError.value = ''
  try {
    const response = await deleteListing(deleteTarget.value.id)
    notify(response.message || 'Listing berhasil dihapus')
    deleteTarget.value = null
  } catch (cause: any) {
    actionError.value = cause?.data?.statusMessage || cause?.message || 'Listing gagal dihapus'
  } finally { busy.value = false }
}
</script>

<template>
  <div :class="['dulank-page space-y-6', `dulank-page-${category.replaceAll('_', '-')}`]">
    <SalesListHeader :title="config.title" :subtitle="config.subtitle" :refreshing="pending" @refresh="refresh()" @print="openPrintModal('print')" @pdf="openPrintModal('pdf')" />
    <SalesFeedback :pending="pending" :error="error ? 'Unable to load calculator listings.' : ''" :message="message" skeleton="table" @retry="refresh()" @dismiss="message = ''" />
    <template v-if="!pending && !error">
      <CalculatorStatsGrid :items="stats" />
      <SalesDataTable :columns="config.columns" :items="rows" search-placeholder="Search source, name, brand, or size..." @update:current-page-items="currentPageItems = $event">
        <template #filters>
          <TableFilterSelect v-model="visibilityFilter" :options="['Publish', 'Private']" placeholder="All Visibility" />
          <TableFilterSelect v-model="statusFilter" :options="['Active', 'Inactive']" placeholder="All Status" />
        </template>
        <template #cell(source)="{ item }"><EntityIdentity :name="item.sourceName" :subtitle="item.sourceAddress" kind="business" /></template>
        <template #cell(name)="{ item }"><div class="max-w-52 whitespace-normal"><p class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</p><p v-if="category === 'offset'" class="text-xs text-gray-500">{{ item.colors }} colors</p></div></template>
        <template #cell(priceSummary)="{ item }"><div class="text-right"><CurrencyDisplay :value="item.minimumPrice" /><p class="text-xs text-gray-500">Druck {{ item.druck }}%</p></div></template>
        <template #cell(pricePerCm)="{ item }"><CurrencyDisplay :value="item.pricePerCm" /></template>
        <template #cell(minimumPrice)="{ item }"><div class="text-right"><CurrencyDisplay :value="item.minimumPrice" /><p v-if="item.minimumCount" class="text-xs text-gray-500">{{ item.minimumCount }} count</p></div></template>
        <template #cell(standard)="{ item }"><div class="text-right"><CurrencyDisplay :value="item.standardRate" /><p class="text-xs text-gray-500">Min <CurrencyDisplay :value="item.standardMinimum" /></p></div></template>
        <template #cell(halfCut)="{ item }"><div class="text-right"><CurrencyDisplay :value="item.halfCutRate" /><p class="text-xs text-gray-500">Min <CurrencyDisplay :value="item.halfCutMinimum" /></p></div></template>
        <template #cell(paperPrice)="{ item }"><div class="text-right"><CurrencyDisplay :value="item.paperPrice" /><p class="text-xs text-gray-500">per {{ item.priceUnit }}</p></div></template>
        <template #cell(statusLabel)="{ item }"><div class="flex flex-col items-center gap-1"><AppBadge :label="item.visibility" :tone="item.visibility === 'Publish' ? 'info' : 'neutral'" /><AppBadge :label="item.status" /></div></template>
        <template #cell(actions)="{ item }"><div class="flex justify-center gap-1"><SalesActionButton icon="eye" label="View detail" @click="selected = item._record" /><SalesActionButton icon="settings" label="Manage source" :disabled="!item._record.sourcePartnerId" @click="manageTarget = item._record" /><SalesActionButton icon="trash-2" label="Delete listing" @click="deleteTarget = item._record" /></div></template>
      </SalesDataTable>
    </template>

    <CalculatorDetailDialog :open="!!selected" :title="selected?.name || 'Listing Detail'" :source-name="selected?.sourceName" :source-address="selected?.sourceAddress" :details="detailRows" @close="selected = null" />
    <CalculatorManageDialog :open="!!manageTarget" :partner="manageTarget ? { id: manageTarget.sourcePartnerId, name: manageTarget.sourceName } : null" :busy="busy" :error="actionError" @close="manageTarget = null" @submit="submitModeration" />
    <SalesConfirmDelete :open="!!deleteTarget" :busy="busy" :error="actionError" @close="deleteTarget = null" @confirm="confirmDelete" />
    <DocumentPrintModal :open="isPrintModalOpen" :title="config.reportTitle" :subtitle="config.subtitle" :columns="printColumns" :items="rows" :current-page-items="currentPageItems" date-field="updatedAt" :default-action="defaultPrintAction" @close="closePrintModal" />
  </div>
</template>
