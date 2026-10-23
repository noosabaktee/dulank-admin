<script setup lang="ts">
import type { PayslipItem } from '#server/types/payslip'
import TableFilterSelect from '~/components/Common/TableFilterSelect.vue'
import SalesDataTable from '~/components/Sales/SalesDataTable.vue'
import SalesActionButton from '~/components/Sales/SalesActionButton.vue'
import CurrencyDisplay from '~/components/Common/CurrencyDisplay.vue'
import SalesStatusBadge from '~/components/Sales/SalesStatusBadge.vue'

defineProps<{
  payslips: PayslipItem[]
  searchQuery: string
  filterStatus?: string
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:filterStatus': [value: string]
  'view': [item: PayslipItem]
  'edit': [item: PayslipItem]
  'pay': [item: PayslipItem]
  'delete': [item: PayslipItem]
}>()

const statusOptions = ['Paid', 'Unpaid']

const columns = [
  { key: 'slipNo', label: 'No. Slip', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'period', label: 'Periode', sortable: true },
  { key: 'salaryRate', label: 'Salary (Rate)', sortable: true, align: 'right' as const, class: 'text-right' },
  { key: 'dayWorked', label: 'Day Worked', sortable: true, align: 'center' as const, class: 'text-center' },
  { key: 'allowance', label: 'Allowance', sortable: true, align: 'right' as const, class: 'text-right' },
  { key: 'overtime', label: 'Overtime', sortable: true, align: 'right' as const, class: 'text-right' },
  { key: 'deduction', label: 'Deduction', sortable: true, align: 'right' as const, class: 'text-right' },
  { key: 'total', label: 'Total', sortable: true, align: 'right' as const, class: 'text-right' },
  { key: 'status', label: 'Status', sortable: true, align: 'center' as const, class: 'text-center' },
  { key: 'paidDate', label: 'Paid Date', sortable: true },
  { key: 'actions', label: 'Action', sortable: false, align: 'center' as const, class: 'text-center whitespace-nowrap' },
]

function getStatusBadgeClass(status: string) {
  if (status === 'Paid') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
  }
  return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
}
</script>

<template>
  <SalesDataTable
    :columns="columns"
    :items="payslips"
    :search="searchQuery"
    search-placeholder="Search Slip No or Employee Name..."
    @update:search="emit('update:searchQuery', $event)"
  >
    <template #filters>
      <!-- Status Filter -->
      <TableFilterSelect
        :model-value="filterStatus"
        label="Status"
        :options="statusOptions"
        @update:model-value="emit('update:filterStatus', $event)"
      />
    </template>

    <!-- Slip No -->
    <template #cell(slipNo)="{ item }">
      <NuxtLink
        :to="`/payslip-detail?id=${item.id}`"
        class="font-semibold text-primary hover:underline dark:text-primary-400"
      >
        {{ item.slipNo }}
      </NuxtLink>
    </template>

    <!-- Name -->
    <template #cell(name)="{ item }">
      <div class="flex items-center gap-2">
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary dark:bg-primary/20 dark:text-primary-300">
          {{ item.name.charAt(0).toUpperCase() }}
        </div>
        <span class="font-medium text-gray-900 dark:text-gray-100">
          {{ item.name }}
        </span>
      </div>
    </template>

    <!-- Period -->
    <template #cell(period)="{ item }">
      <span class="text-xs text-gray-600 dark:text-gray-400">{{ item.period }}</span>
    </template>

    <!-- Salary Rate -->
    <template #cell(salaryRate)="{ item }">
      <div class="text-right text-xs text-gray-700 dark:text-gray-300">
        <CurrencyDisplay :value="item.salaryRate" align="right" />
      </div>
    </template>

    <!-- Day Worked -->
    <template #cell(dayWorked)="{ item }">
      <span class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-100 px-2 text-xs font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        {{ item.dayWorked }} hari
      </span>
    </template>

    <!-- Allowance -->
    <template #cell(allowance)="{ item }">
      <div class="text-right text-xs text-gray-600 dark:text-gray-300">
        <CurrencyDisplay :value="item.allowance" align="right" />
      </div>
    </template>

    <!-- Overtime -->
    <template #cell(overtime)="{ item }">
      <div class="text-right text-xs text-gray-600 dark:text-gray-300">
        <CurrencyDisplay :value="item.overtime" align="right" />
      </div>
    </template>

    <!-- Deduction -->
    <template #cell(deduction)="{ item }">
      <div class="text-right text-xs text-rose-600 dark:text-rose-400">
        <CurrencyDisplay :value="item.deduction" align="right" />
      </div>
    </template>

    <!-- Total -->
    <template #cell(total)="{ item }">
      <div class="text-right text-xs font-bold text-emerald-600 dark:text-emerald-400">
        <CurrencyDisplay :value="item.total" align="right" />
      </div>
    </template>

    <!-- Status -->
    <template #cell(status)="{ item }">
      <SalesStatusBadge :status="item.status" />
    </template>

    <!-- Paid Date -->
    <template #cell(paidDate)="{ item }">
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ item.paidDate || '-' }}</span>
    </template>

    <!-- Action -->
    <template #cell(actions)="{ item }">
      <button v-if="item.status !== 'Paid'" type="button" class="mr-2 text-sm text-emerald-700" @click="emit('pay', item)">Bayar</button>
      <div class="flex items-center justify-center gap-1.5">
        <NuxtLink
          :to="`/payslip-detail?id=${item.id}`"
          class="flex h-8 w-8 items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          title="View Payslip Detail"
        >
          <FeatherIcon name="eye" size="14" />
        </NuxtLink>
        <SalesActionButton
          icon="edit"
          tooltip="Edit Payslip"
          :disabled="item.status === 'Paid' || (item.paid ?? 0) > 0"
          @click="emit('edit', item)"
        />
        <SalesActionButton
          icon="trash-2"
          tooltip="Delete Payslip"
          :disabled="item.status === 'Paid' || (item.paid ?? 0) > 0"
          danger
          @click="emit('delete', item)"
        />
      </div>
    </template>
  </SalesDataTable>
</template>
