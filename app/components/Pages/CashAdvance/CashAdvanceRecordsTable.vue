<script setup lang="ts">
import type { CashAdvanceView } from '#server/types/cash-advance'
import CurrencyDisplay from '~/components/Common/CurrencyDisplay.vue'
import SalesActionButton from '~/components/Sales/SalesActionButton.vue'
import SalesDataTable from '~/components/Sales/SalesDataTable.vue'
import SalesStatusBadge from '~/components/Sales/SalesStatusBadge.vue'
defineProps<{ items: CashAdvanceView[]; search: string }>()
const emit = defineEmits<{ 'update:search': [value: string]; 'update:currentPageItems': [value: CashAdvanceView[]]; view: [item: CashAdvanceView]; edit: [item: CashAdvanceView]; delete: [item: CashAdvanceView] }>()
const columns = [
  { key: 'employee', label: 'Employee', sortable: true }, { key: 'date', label: 'Date', sortable: true },
  { key: 'tenor', label: 'Tenor' }, { key: 'totalCash', label: 'Total Cash', sortable: true, align: 'end' as const },
  { key: 'outstanding', label: 'Outstanding', sortable: true, align: 'end' as const }, { key: 'status', label: 'Status', align: 'center' as const },
  { key: 'actions', label: 'Action', align: 'center' as const },
]
</script>
<template>
  <SalesDataTable :items="items" :columns="columns" :search="search" search-placeholder="Search employee..." @update:search="emit('update:search', $event)" @update:current-page-items="emit('update:currentPageItems', $event)">
    <template #cell-employee="{ item }"><div class="font-semibold text-gray-900 dark:text-white">{{ item.employee }}</div><div class="text-xs text-gray-500">{{ item.note || '-' }}</div></template>
    <template #cell-tenor="{ item }"><span>Tenor({{ item.installmentCount }}) / remain({{ item.tenorRemain }})</span></template>
    <template #cell-totalCash="{ item }"><CurrencyDisplay :value="item.totalCash" bold /></template>
    <template #cell-outstanding="{ item }"><CurrencyDisplay :value="item.outstanding" bold /></template>
    <template #cell-status="{ item }"><SalesStatusBadge :status="item.status === 'On' ? 'Active' : 'Closed'" /></template>
    <template #cell-actions="{ item }"><div class="inline-flex gap-1.5"><SalesActionButton action="view" label="View Cash Advance" @click="emit('view', item)" /><SalesActionButton action="edit" label="Edit Cash Advance" @click="emit('edit', item)" /><SalesActionButton action="delete" label="Delete Cash Advance" :disabled="item.payments.length > 0 || !!item.bankAccountId" @click="emit('delete', item)" /></div></template>
  </SalesDataTable>
</template>

