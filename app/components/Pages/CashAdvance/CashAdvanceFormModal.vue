<script setup lang="ts">
import type { CashAdvanceFormData, CashAdvanceView } from '#server/types/cash-advance'
import type { EmployeeItem } from '#server/types/employee'
import type { BankAccountView } from '#server/types/bank-account'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import { formControlClass, modalFormInputColClass, modalFormLabelClass, modalFormRowClass, salesPrimaryButton, salesSecondaryButton } from '~/utils/salesUi'
const props = defineProps<{ open: boolean; item: CashAdvanceView | null; employees: EmployeeItem[]; accounts: BankAccountView[]; busy?: boolean; error?: string }>()
const emit = defineEmits<{ close: []; submit: [payload: CashAdvanceFormData] }>()
const empty = (): CashAdvanceFormData => ({ employeeId: '', bankAccountId: '', installmentCount: 1, date: new Date().toISOString().slice(0, 10), totalCash: 0, period: 'Monthly', note: '' })
const form = ref<CashAdvanceFormData>(empty())
const locked = computed(() => (props.item?.payments?.length ?? 0) > 0)
const paid = computed(() => props.item?.totalPaid ?? 0)
const outstanding = computed(() => Math.max(0, form.value.totalCash - paid.value))
const accounts = computed(() => props.accounts.filter(account => account.status === 'Active' || account.id === props.item?.bankAccountId))
watch([() => props.open, () => props.item], ([open, item]) => {
  if (!open) return
  form.value = item ? { id: item.id, employeeId: item.employeeId ?? '', employeeName: item.employee, bankAccountId: item.bankAccountId ?? '', installmentCount: item.installmentCount, date: item.date, totalCash: item.totalCash, period: item.period, note: item.note } : empty()
}, { immediate: true })
</script>
<template>
  <SalesDialog :open="open" :title="item ? 'Edit Cash Advance' : 'Add New Cash Advance'" size="lg" :busy="busy" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="emit('submit', { ...form })">
      <p v-if="error" role="alert" class="rounded-md bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Karyawan <span class="text-red-500">*</span></label><div :class="modalFormInputColClass"><select v-model="form.employeeId" :class="formControlClass" :required="!item" :disabled="!!item || busy"><option value="">{{ item && !item.employeeId ? item.employee : 'Pilih karyawan' }}</option><option v-if="item?.employeeId && !employees.some(employee => employee.id === item?.employeeId)" :value="item.employeeId">{{ item.employee }}</option><option v-for="employee in employees" :key="employee.id" :value="employee.id">{{ employee.name }} - {{ employee.department }}</option></select></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Tanggal Kasbon <span class="text-red-500">*</span></label><div :class="modalFormInputColClass"><input v-model="form.date" type="date" :class="formControlClass" required :disabled="busy" /></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Total Kasbon <span class="text-red-500">*</span></label><div :class="modalFormInputColClass"><CurrencyInput v-model="form.totalCash" prefix="Rp" :min="1" required :disabled="locked || busy" /><p v-if="locked" class="mt-1 text-xs text-gray-500">Total dan rekening tetap setelah ada angsuran.</p></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Rekening / Kas</label><div :class="modalFormInputColClass"><select v-model="form.bankAccountId" :class="formControlClass" :disabled="locked || busy"><option value="">Tanpa rekening (tidak masuk jurnal bank)</option><option v-for="account in accounts" :key="account.id" :value="account.id">{{ account.accountName }} - {{ account.accountNo }}</option><option v-if="item?.bankAccountId && !accounts.some(account => account.id === item?.bankAccountId)" :value="item.bankAccountId">Rekening tersimpan #{{ item.bankAccountId }}</option></select></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Jumlah Angsuran <span class="text-red-500">*</span></label><div :class="modalFormInputColClass"><input v-model.number="form.installmentCount" type="number" min="1" max="120" required :class="formControlClass" :disabled="busy" /></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Periode Angsuran</label><div :class="modalFormInputColClass"><select v-model="form.period" :class="formControlClass" :disabled="busy"><option value="Daily">Harian</option><option value="Weekly">Mingguan</option><option value="Monthly">Bulanan</option></select></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Sudah Diangsur</label><div :class="modalFormInputColClass"><CurrencyInput :model-value="paid" prefix="Rp" readonly /></div></div>
      <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Outstanding</label><div :class="modalFormInputColClass"><CurrencyInput :model-value="outstanding" prefix="Rp" readonly /><p class="mt-1 text-xs text-gray-500">Otomatis: total kasbon dikurangi angsuran tercatat. Tambahkan angsuran melalui Detail.</p></div></div>
      <div class="grid grid-cols-12 items-start gap-3 sm:gap-4"><label :class="modalFormLabelClass">Keterangan</label><div :class="modalFormInputColClass"><textarea v-model="form.note" rows="3" maxlength="1000" :class="formControlClass" :disabled="busy" /></div></div>
      <div class="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4"><button type="button" :class="salesSecondaryButton" :disabled="busy" @click="emit('close')">Cancel</button><button type="submit" :class="salesPrimaryButton" :disabled="busy">{{ busy ? 'Saving...' : 'Submit' }}</button></div>
    </form>
  </SalesDialog>
</template>
