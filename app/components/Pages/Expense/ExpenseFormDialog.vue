<script setup lang="ts">
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import type { Expense, ExpenseFormData } from '#server/types/expense'
import { formControlClass, modalFormInputColClass, modalFormLabelClass, modalFormRowClass, salesPrimaryButton, salesSecondaryButton } from '~/utils/salesUi'

const props = defineProps<{
  open: boolean
  item: Expense | null
  categories: { label: string; value: string }[]
  bankAccounts: { label: string; value: string }[]
  busy?: boolean
}>()

const emit = defineEmits<{ close: []; submit: [payload: ExpenseFormData] }>()

const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Debit Card', 'E-Wallet', 'QRIS']

const form = reactive<ExpenseFormData>({
  date: new Date().toISOString().slice(0, 10),
  category: '',
  name: '',
  amount: 0,
  paid: 0,
  description: '',
  paymentMethod: 'Cash',
  bankAccountId: '',
  status: 'Unpaid',
})

const errorMessage = ref('')

watch(
  () => [props.open, props.item] as const,
  ([open, item]) => {
    if (!open) return
    Object.assign(form, item
      ? {
          id: item.id,
          date: item.date,
          category: item.category,
          name: item.name,
          amount: item.amount,
          paid: item.paid,
          description: item.description,
          paymentMethod: item.paymentMethod ?? 'Cash',
          bankAccountId: item.bankAccountId ?? '',
          status: item.status,
        }
      : {
          id: undefined,
          date: new Date().toISOString().slice(0, 10),
          category: '',
          name: '',
          amount: 0,
          paid: 0,
          description: '',
          paymentMethod: 'Cash',
          bankAccountId: '',
        })
    errorMessage.value = ''
  },
  { immediate: true },
)

function submit() {
  if (!form.name.trim()) return void (errorMessage.value = 'Nama pengeluaran wajib diisi')
  if (!form.amount || form.amount <= 0) return void (errorMessage.value = 'Nominal wajib lebih dari 0')
  if (form.paid < (props.item?.paid ?? 0)) return void (errorMessage.value = 'Total sudah dibayar tidak boleh dikurangi dari pembayaran tercatat.')
  if (form.paid > form.amount) return void (errorMessage.value = 'Total sudah dibayar tidak boleh melebihi nominal pengeluaran.')
  errorMessage.value = ''
  emit('submit', {
    ...form,
    id: props.item?.id,
    name: form.name.trim(),
    category: form.category || 'Tanpa Kategori',
  })
}
</script>

<template>
  <SalesDialog :open="open" :title="item ? 'Edit Expense' : 'Add Expense'" :busy="busy" @close="emit('close')">
    <form class="space-y-4" @submit.prevent="submit">
      <p v-if="errorMessage" role="alert" class="rounded-md bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{{ errorMessage }}</p>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Tanggal</label>
        <div :class="modalFormInputColClass"><input v-model="form.date" :class="formControlClass" type="date" /></div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Nama Pengeluaran<span class="ml-1 text-rose-600">*</span></label>
        <div :class="modalFormInputColClass"><input v-model="form.name" :class="formControlClass" placeholder="mis. Bayar Listrik" required /></div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Kategori</label>
        <div :class="modalFormInputColClass">
          <select v-model="form.category" :class="formControlClass">
            <option value="">Tanpa Kategori</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">{{ category.label }}</option>
          </select>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Nominal (Rp)<span class="ml-1 text-rose-600">*</span></label>
        <div :class="modalFormInputColClass"><CurrencyInput v-model="form.amount" prefix="Rp" :min="1" required :disabled="busy" /></div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Sudah Dibayar (Rp)</label>
        <div :class="modalFormInputColClass"><CurrencyInput v-model="form.paid" prefix="Rp" :min="item?.paid ?? 0" :max="form.amount" :disabled="busy" /><p class="mt-1 text-xs text-gray-500">Total kumulatif. Kenaikan dicatat sebagai pembayaran tambahan; pembayaran lama tidak dapat dikurangi di sini.</p></div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Metode Pembayaran</label>
        <div :class="modalFormInputColClass">
          <select v-model="form.paymentMethod" :class="formControlClass">
            <option v-for="method in PAYMENT_METHODS" :key="method" :value="method">{{ method }}</option>
          </select>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Rekening Bank</label>
        <div :class="modalFormInputColClass">
          <select v-model="form.bankAccountId" :class="formControlClass" :disabled="busy || (item?.paid ?? 0) > 0">
            <option value="">Tanpa Rekening</option>
            <option v-if="item?.bankAccountId && !bankAccounts.some(account => account.value === item?.bankAccountId)" :value="item.bankAccountId">{{ item.bankAccount || `Rekening #${item.bankAccountId}` }}</option>
            <option v-for="account in bankAccounts" :key="account.value" :value="account.value">{{ account.label }}</option>
          </select>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Keterangan</label>
        <div :class="modalFormInputColClass"><textarea v-model="form.description" :class="formControlClass" rows="3" placeholder="Keterangan pengeluaran" /></div>
      </div>

      <div class="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
        <button type="button" :class="salesSecondaryButton" :disabled="busy" @click="emit('close')">Cancel</button>
        <button type="submit" :class="salesPrimaryButton" :disabled="busy">{{ busy ? 'Saving...' : 'Submit' }}</button>
      </div>
    </form>
  </SalesDialog>
</template>