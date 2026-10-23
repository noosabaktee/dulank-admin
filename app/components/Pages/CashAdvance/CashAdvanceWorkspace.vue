<script setup lang="ts">
import CurrencyDisplay from '~/components/Common/CurrencyDisplay.vue'
import DocumentPrintModal from '~/components/Common/DocumentPrintModal.vue'
import SalesConfirmDelete from '~/components/Sales/SalesConfirmDelete.vue'
import SalesFeedback from '~/components/Sales/SalesFeedback.vue'
import SalesListHeader from '~/components/Sales/SalesListHeader.vue'
import { useCashAdvanceManager } from '~/composables/useCashAdvanceManager'
import { useTablePrint } from '~/composables/useTablePrint'
import CashAdvanceDetailModal from './CashAdvanceDetailModal.vue'
import CashAdvanceFormModal from './CashAdvanceFormModal.vue'
import CashAdvanceRecordsTable from './CashAdvanceRecordsTable.vue'
const manager = useCashAdvanceManager()
const print = useTablePrint()
const columns = [
  { key: 'employee', label: 'Employee' }, { key: 'date', label: 'Date' }, { key: 'installmentCount', label: 'Tenor' },
  { key: 'totalCash', label: 'Total Cash', align: 'right' as const }, { key: 'outstanding', label: 'Outstanding', align: 'right' as const },
  { key: 'status', label: 'Status', align: 'center' as const },
]
</script>
<template>
  <div class="space-y-6">
    <SalesListHeader title="Cash Advance List" subtitle="Manage your Cash Advance" add-label="Add New Cash Advance" :refreshing="manager.pending.value" @add="manager.openForm()" @refresh="manager.refresh" @print="print.openPrintModal('print')" @pdf="print.openPrintModal('pdf')" />
    <div v-if="!manager.pending.value" class="max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"><p class="app-supporting-text">Total Outstanding Cash Advance</p><CurrencyDisplay :value="manager.totalOutstanding.value" align="left" bold custom-class="mt-1 text-2xl text-gray-900 dark:text-white" /></div>
    <SalesFeedback :pending="manager.pending.value" :error="manager.error.value ? 'Unable to load cash advances.' : ''" :message="manager.message.value" skeleton="table" :skeleton-cols="7" @retry="manager.refresh" @dismiss="manager.message.value = ''" />
    <CashAdvanceRecordsTable v-if="!manager.pending.value && !manager.error.value" :items="manager.items.value" :search="manager.search.value" @update:search="manager.search.value = $event" @update:current-page-items="manager.currentPageItems.value = $event" @view="manager.openDetail" @edit="manager.openForm" @delete="manager.deleteTarget.value = $event" />
    <CashAdvanceFormModal :open="manager.formOpen.value" :item="manager.formTarget.value" :employees="manager.employees.value" :accounts="manager.accounts.value" :busy="manager.busy.value" :error="manager.mutationError.value" @close="manager.formOpen.value = false" @submit="manager.save" />
    <CashAdvanceDetailModal :open="!!manager.detailTarget.value" :item="manager.detailTarget.value" :busy="manager.busy.value" :error="manager.mutationError.value" @payment="manager.recordPayment" @close="manager.detailTarget.value = null" />
    <SalesConfirmDelete :open="!!manager.deleteTarget.value" title="Delete Cash Advance" message="Cash Advance can only be deleted before any installment payment is recorded." :busy="manager.busy.value" :error="manager.mutationError.value" @close="manager.deleteTarget.value = null" @confirm="manager.remove" />
    <DocumentPrintModal :open="print.isPrintModalOpen.value" title="Cash Advance Report" :columns="columns" :items="manager.items.value" :current-page-items="manager.currentPageItems.value" :default-action="print.defaultPrintAction.value" date-field="date" @close="print.closePrintModal" />
  </div>
</template>

