<script setup lang="ts">
import type { PayslipItem, PayslipFormData } from '#server/types/payslip'
import type { EmployeeSalaryItem } from '#server/types/employeeSalary'
import type { EmployeeItem } from '#server/types/employee'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import CurrencyDisplay from '~/components/Common/CurrencyDisplay.vue'
import {
  formControlClass,
  modalFormInputColClass,
  modalFormLabelClass,
  modalFormRowClass,
} from '~/utils/salesUi'

const props = defineProps<{
  open: boolean
  isEdit: boolean
  payslipData: PayslipItem | null
  employees: EmployeeItem[]
  salaries?: EmployeeSalaryItem[]
  busy?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [formData: PayslipFormData]
}>()

const statusOptions = ['Unpaid']
const blankForm = (): PayslipFormData => ({ employeeId: '', name: '', period: new Date().toISOString().slice(0, 7), salaryRate: 0, dayWorked: 26, allowance: 0, overtime: 0, deduction: 0, status: 'Unpaid', paidDate: '' })
const form = ref<PayslipFormData>(blankForm())
const errorMessage = ref('')
watch(() => [props.open, props.payslipData] as const, () => {
  if (!props.open) return
  form.value = props.isEdit && props.payslipData ? { ...props.payslipData, paidDate: props.payslipData.paidDate ?? '' } : blankForm()
  errorMessage.value = ''
}, { immediate: true })
const selectedSalary = computed(() => props.salaries?.find(item => item.employeeId === form.value.employeeId && item.status === 'Active'))
const calculatedTotal = computed(() => {
  const salary = selectedSalary.value
  const base = salary?.system === 'Daily' ? Number(salary.salary) * Number(form.value.dayWorked) : Number(salary?.salary ?? form.value.salaryRate)
  return Math.max(0, Math.round(base) + Number(salary?.allowanceTotal ?? form.value.allowance) + Number(form.value.overtime) - Number(form.value.deduction))
})
function onEmployeeChange(event: Event) {
  const id = (event.target as HTMLSelectElement).value
  form.value.employeeId = id
  form.value.name = props.employees.find(item => item.id === id)?.name ?? ''
  const salary = props.salaries?.find(item => item.employeeId === id && item.status === 'Active')
  form.value.period = salary?.system === 'Weekly' ? '' : new Date().toISOString().slice(0, 7)
  form.value.dayWorked = salary?.system === 'Weekly' ? 6 : 26
  form.value.salaryRate = salary?.salary ?? 0
  form.value.allowance = salary?.allowanceTotal ?? 0
}

function handleSubmit() {
  if (!form.value.employeeId || !selectedSalary.value) {
    errorMessage.value = 'Pilih karyawan dengan pengaturan gaji aktif.'
    return
  }
  if (!form.value.period) {
    errorMessage.value = 'Period is required'
    return
  }

  errorMessage.value = ''
  emit('submit', {
    ...form.value,
    total: calculatedTotal.value,
  })
}
</script>

<template>
  <SalesDialog
    :open="open"
    :title="isEdit ? 'Edit Payslip' : 'Add New Payslip'"
    medium
    @close="emit('close')"
  >
    <form class="space-y-4 p-5 sm:p-6" @submit.prevent="handleSubmit">
      <div v-if="errorMessage" class="rounded-lg bg-rose-50 p-3 text-xs text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
        {{ errorMessage }}
      </div>

      <!-- No. Slip -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          No. Slip <span class="text-rose-500">*</span>
        </label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.slipNo"
            disabled
            type="text"
            placeholder="Auto Generated"
            :class="formControlClass"
          >
        </div>
      </div>

      <!-- Employee Name -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Employee Name <span class="text-rose-500">*</span>
        </label>
        <div :class="modalFormInputColClass">
          <select
            :value="form.employeeId"
            :class="formControlClass"
            @change="onEmployeeChange"
          >
            <option value="" disabled>Choose Employee</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
              {{ emp.id }} - {{ emp.name }} ({{ emp.department }})
            </option>
          </select>
        </div>
      </div>

      <!-- Period -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Period (Periode) <span class="text-rose-500">*</span>
        </label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.period"
            :type="selectedSalary?.system === 'Weekly' ? 'week' : 'month'"
            placeholder="dd/mm/yy - dd/mm/yy"
            :class="formControlClass"
          >
        </div>
      </div>

      <!-- Salary Rate -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Salary / Rate (IDR) <span class="text-rose-500">*</span>
        </label>
        <div :class="modalFormInputColClass">
          <CurrencyInput
            v-model="form.salaryRate"
            :disabled="true"
            align="right"
            :class="formControlClass"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Days Worked -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Days Worked (Hari) <span class="text-rose-500">*</span>
        </label>
        <div :class="modalFormInputColClass">
          <input
            v-model.number="form.dayWorked"
            type="number"
            min="0"
            :max="selectedSalary?.system === 'Weekly' ? 7 : 31"
            :class="formControlClass"
          >
        </div>
      </div>

      <!-- Allowance -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Allowance (Tunjangan)
        </label>
        <div :class="modalFormInputColClass">
          <CurrencyInput
            v-model="form.allowance"
            :disabled="true"
            align="right"
            :class="formControlClass"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Overtime -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Overtime (Lembur)
        </label>
        <div :class="modalFormInputColClass">
          <CurrencyInput
            v-model="form.overtime"
            align="right"
            :class="formControlClass"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Deduction -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Deduction (Potongan)
        </label>
        <div :class="modalFormInputColClass">
          <CurrencyInput
            v-model="form.deduction"
            align="right"
            :class="formControlClass"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Status -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Status
        </label>
        <div :class="modalFormInputColClass">
          <select v-model="form.status" disabled :class="formControlClass">
            <option v-for="st in statusOptions" :key="st" :value="st">
              {{ st }}
            </option>
          </select>
        </div>
      </div>

      <!-- Paid Date -->
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">
          Paid Date
        </label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.paidDate" disabled
            type="text"
            placeholder="dd/mm/yyyy or -"
            :class="formControlClass"
          >
        </div>
      </div>

      <!-- Calculation Summary Box -->
      <div class="rounded-lg border border-primary/20 bg-primary/5 p-4 dark:border-primary/30 dark:bg-primary/10">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Total Net Salary (Gaji Bersih)
            </span>
            <p class="text-xs text-gray-500">
              (Rate × Hari Kerja) + Tunjangan + Lembur - Potongan
            </p>
          </div>
          <div class="text-right">
            <h4 class="text-xl font-bold text-primary dark:text-primary-400">
              <CurrencyDisplay :value="calculatedTotal" />
            </h4>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="flex flex-wrap items-center justify-end gap-3 w-full">
        <button
          type="button"
          class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          :disabled="busy"
          @click="handleSubmit"
        >
          <span v-if="busy" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>{{ isEdit ? 'Update Payslip' : 'Save Payslip' }}</span>
        </button>
      </div>
    </template>
  </SalesDialog>
</template>
