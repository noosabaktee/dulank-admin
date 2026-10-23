<script setup lang="ts">
import { formatRupiah } from "~/composables/useFormatters";

const printPayslip = () => {
  if (process.client) {
    window.print();
  }
};

const { record, pending, error, refresh } = usePayslipDetail()
const payslip = computed(() => ({
  slipNo: record.value?.slipNo ?? '', period: record.value?.period ?? '',
  employee: { name: record.value?.name ?? '', department: record.value?.department ?? '', salary: record.value?.salaryRate ?? 0, system: record.value?.salarySystem ?? '?', workedDays: record.value?.dayWorked ?? 0, absentDays: '?' },
  earnings: (record.value?.items ?? []).filter(item => item.amount >= 0 && item.label !== 'Basic Salary'),
  deductions: (record.value?.items ?? []).filter(item => item.amount < 0).map(item => ({ ...item, amount: -item.amount })),
}))
const basePay = computed(() => record.value?.items?.find(item => item.label === 'Basic Salary')?.amount ?? 0)
const totalEarnings = computed(() => payslip.value.earnings.reduce((total, item) => total + item.amount, 0))
const totalDeductions = computed(() => payslip.value.deductions.reduce((total, item) => total + item.amount, 0))
const netSalary = computed(() => record.value?.total ?? 0)
</script>

<template>
  <div class="space-y-6">
    <SalesFeedback :pending="pending" :error="error?.message || ''" @retry="refresh" />
    <!-- Non-print Page Actions Bar -->
    <div class="flex items-center justify-between print:hidden">
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/payslip"
          class="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          <FeatherIcon name="arrow-left" size="14" />
          <span>Back to Payslip List</span>
        </NuxtLink>
        <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100">Payslip {{ payslip.slipNo }}</h4>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          :disabled="!record || pending || !!error"
          @click="printPayslip"
        >
          <FeatherIcon name="download" size="14" />
          <span>Download</span>
        </button>
        <button
          type="button"
          class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-600"
          :disabled="!record || pending || !!error"
          @click="printPayslip"
        >
          <FeatherIcon name="printer" size="14" />
          <span>Print</span>
        </button>
      </div>
    </div>

    <!-- Printable Payslip A4 Sheet -->
    <div
      v-if="record && !pending && !error"
      id="pay-slip"
      class="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm print:m-0 print:max-w-none print:border-none print:p-0 print:shadow-none dark:border-gray-800 dark:bg-gray-900"
    >
      <!-- Company Header Section -->
      <div class="mb-6 flex items-start justify-between border-b border-gray-200 pb-6 dark:border-gray-800">
        <div class="flex items-center gap-4">
          <div
            class="flex h-16 w-24 items-center justify-center rounded border border-gray-400 bg-gray-50 text-xs font-semibold text-gray-500 dark:bg-gray-800"
          >
            Logo
          </div>
          <div>
            <h5 class="text-base font-bold text-gray-900 dark:text-gray-100">PT. Dulank Semesta Cida</h5>
            <p class="text-xs text-gray-600 dark:text-gray-400"></p>
            <p class="text-xs text-gray-600 dark:text-gray-400"></p>
          </div>
        </div>

        <div class="text-end">
          <p class="text-xs text-gray-500">Payslip Periode</p>
          <p class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ payslip.period }}</p>
          <p class="mt-1 text-xs font-mono text-gray-400">Slip No: {{ payslip.slipNo }}</p>
        </div>
      </div>

      <!-- Employee Information Banner -->
      <div class="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-32 font-bold text-gray-700 dark:text-gray-300">Employee Name</span>
            <span class="font-bold text-gray-900 dark:text-gray-100">: {{ payslip.employee.name }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-28 font-bold text-gray-700 dark:text-gray-300">Department</span>
            <span class="font-bold text-gray-900 dark:text-gray-100">: {{ payslip.employee.department }}</span>
          </div>
        </div>
      </div>

      <!-- Salary Rate & Attendance Info -->
      <div class="mb-6 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-4 text-xs dark:border-gray-800 sm:grid-cols-2">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="w-28 text-gray-500">Salary (Rate)</span>
            <span class="font-mono font-semibold text-gray-900 dark:text-gray-100"
              >: {{ formatRupiah(payslip.employee.salary) }}</span
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="w-28 text-gray-500">System</span>
            <span class="font-semibold text-gray-900 dark:text-gray-100">: {{ payslip.employee.system }}</span>
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="w-28 text-gray-500">Worked Day</span>
            <span class="font-semibold text-gray-900 dark:text-gray-100">: {{ payslip.employee.workedDays }} Day(s)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-28 text-gray-500">Absent Day</span>
            <span class="font-semibold text-gray-900 dark:text-gray-100">: {{ payslip.employee.absentDays }} Day(s)</span>
          </div>
        </div>
      </div>

      <!-- Earnings and Deduction Table -->
      <div class="mb-6 overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-300 text-left font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
              <th class="pb-2">Earnings</th>
              <th class="pb-2 text-end">Amount</th>
              <th class="ps-6 pb-2">Deduction</th>
              <th class="pb-2 text-end">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="(item, index) in record?.items ?? []" :key="index">
              <td class="py-2">{{ item.amount >= 0 ? item.label : '' }}</td>
              <td class="py-2 text-right">{{ item.amount >= 0 ? formatRupiah(item.amount) : '' }}</td>
              <td class="py-2 pl-6">{{ item.amount < 0 ? item.label : '' }}</td>
              <td class="py-2 text-right">{{ item.amount < 0 ? formatRupiah(-item.amount) : '' }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-b-2 border-gray-300 font-bold dark:border-gray-700">
              <th class="py-2.5 text-gray-900 dark:text-gray-100">Total Earning</th>
              <th class="py-2.5 text-end font-mono text-gray-900 dark:text-gray-100">
                {{ formatRupiah(basePay + totalEarnings) }}
              </th>
              <th class="ps-6 py-2.5 text-gray-900 dark:text-gray-100">Total Deduction</th>
              <th class="py-2.5 text-end font-mono text-gray-900 dark:text-gray-100">{{ formatRupiah(totalDeductions) }}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Nett Salary Banner -->
      <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <div class="flex items-center justify-between text-base font-bold">
          <span class="text-gray-900 dark:text-gray-100">Nett Salary</span>
          <span class="font-mono text-primary text-lg">{{ formatRupiah(netSalary) }}</span>
        </div>
      </div>

      <!-- Signatures for payslip receipt -->
      <div class="mt-12 hidden grid-cols-2 gap-8 text-center text-xs print:grid">
        <div>
          <p class="mb-14 font-medium text-gray-600">Diserahkan Oleh,</p>
          <div class="mx-auto w-44 border-b border-gray-800"></div>
          <p class="mt-1 font-bold text-gray-900">Finance Dept</p>
        </div>
        <div>
          <p class="mb-14 font-medium text-gray-600">Diterima Oleh,</p>
          <div class="mx-auto w-44 border-b border-gray-800"></div>
          <p class="mt-1 font-bold text-gray-900">{{ payslip.employee.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 0.3in !important;
  }

  body {
    background: #fff !important;
    padding: 0 !important;
  }
}
</style>
