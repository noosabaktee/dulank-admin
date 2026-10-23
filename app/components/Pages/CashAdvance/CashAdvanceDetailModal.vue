<script setup lang="ts">
import type { CashAdvanceView, CashAdvancePayment } from '#server/types/cash-advance'
import CurrencyDisplay from '~/components/Common/CurrencyDisplay.vue'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import { formControlClass, salesPrimaryButton } from '~/utils/salesUi'
const props = defineProps<{ open: boolean; item: CashAdvanceView | null; busy?: boolean; error?: string }>()
const emit = defineEmits<{ close: []; payment: [payload: CashAdvancePayment] }>()
const payment = reactive({ date: new Date().toISOString().slice(0, 10), amount: 0, note: '' })
watch([() => props.open, () => props.item], () => { payment.amount = 0; payment.note = ''; payment.date = new Date().toISOString().slice(0, 10) })
</script>
<template>
  <SalesDialog :open="open" title="Cash Advance Details" wide :busy="busy" @close="emit('close')">
    <div v-if="item" class="space-y-4">
      <div class="flex flex-wrap justify-between gap-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800"><div><p class="font-semibold">{{ item.employee }}</p><p class="text-xs text-gray-500">{{ item.date }} | {{ item.note || '-' }}</p></div><div><CurrencyDisplay :value="item.outstanding" bold /><p class="text-xs text-gray-500">Outstanding (otomatis)</p></div></div>
      <div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-3 py-2 text-start">Tanggal Penyaluran</th><th class="px-3 py-2 text-end">Total Kasbon</th><th class="px-3 py-2 text-center">Jumlah Angsuran</th><th class="px-3 py-2 text-center">Periode</th></tr></thead><tbody><tr><td class="px-3 py-2">{{ item.date }}</td><td class="px-3 py-2 text-end"><CurrencyDisplay :value="item.totalCash" /></td><td class="px-3 py-2 text-center">{{ item.installmentCount }}</td><td class="px-3 py-2 text-center">{{ item.period }}</td></tr></tbody></table></div>
      <h3 class="text-base font-semibold">Riwayat Angsuran</h3>
      <div class="overflow-x-auto"><table class="w-full text-sm"><thead class="bg-gray-50 dark:bg-gray-800"><tr><th class="px-3 py-2 text-start">Tanggal</th><th class="px-3 py-2 text-start">Referensi</th><th class="px-3 py-2 text-end">Pembayaran</th></tr></thead><tbody class="divide-y divide-gray-100 dark:divide-gray-800"><tr v-for="entry in item.payments" :key="entry.id"><td class="px-3 py-2">{{ entry.date }}</td><td class="px-3 py-2">{{ entry.referenceId || '-' }}</td><td class="px-3 py-2 text-end"><CurrencyDisplay :value="entry.amount" /></td></tr><tr v-if="!item.payments.length"><td colspan="3" class="px-3 py-8 text-center text-gray-500">Belum ada angsuran</td></tr></tbody></table></div>
      <p v-if="error" role="alert" class="rounded-md bg-rose-50 p-3 text-sm text-rose-700">{{ error }}</p>
      <form v-if="item.outstanding > 0" class="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700" @submit.prevent="emit('payment', { ...payment })">
        <h3 class="text-base font-semibold">Catat Angsuran</h3>
        <div class="grid gap-3 sm:grid-cols-2"><div><label class="mb-1 block text-xs" for="advance-payment-date">Tanggal Pembayaran</label><input id="advance-payment-date" v-model="payment.date" type="date" :class="formControlClass" required :disabled="busy" /></div><div><label class="mb-1 block text-xs" for="advance-payment-amount">Nominal Angsuran</label><CurrencyInput id="advance-payment-amount" v-model="payment.amount" prefix="Rp" :min="1" :max="item.outstanding" required :disabled="busy" /></div></div>
        <div><label class="mb-1 block text-xs" for="advance-payment-note">Keterangan</label><input id="advance-payment-note" v-model="payment.note" :class="formControlClass" maxlength="1000" :disabled="busy" /></div>
        <p class="text-xs text-gray-500">Angsuran mengurangi outstanding dan masuk ke rekening/kas yang tercatat pada kasbon, bila tersedia.</p>
        <div class="flex justify-end"><button type="submit" :class="salesPrimaryButton" :disabled="busy || payment.amount <= 0 || payment.amount > item.outstanding">{{ busy ? 'Saving...' : 'Simpan Angsuran' }}</button></div>
      </form>
      <p v-else class="text-sm text-emerald-600">Kasbon sudah lunas.</p>
    </div>
  </SalesDialog>
</template>
