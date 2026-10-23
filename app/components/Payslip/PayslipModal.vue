<script setup lang="ts">
import type { PayslipItem, PayslipFormData } from '~/types/payslip'
import { formatRupiah } from '~/composables/useFormatters'

const props = defineProps<{
  isOpen: boolean
  editData: PayslipItem | null
  viewOnly?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: PayslipFormData): void
}>()

const form = ref<PayslipFormData>({
  name: '',
  period: '',
  salaryRate: 150000,
  dayWorked: 6,
  allowance: 0,
  overtime: 0,
  deduction: 0,
  total: 0,
  status: 'Unpaid',
  paidDate: '-'
})
const validationError = ref('')

const calculatedTotal = computed(() => {
  const rate = Number(form.value.salaryRate || 0)
  const days = Number(form.value.dayWorked || 0)
  const base = rate < 1000000 ? rate * days : Math.round((rate / 24) * days)
  return base + Number(form.value.allowance || 0) + Number(form.value.overtime || 0) - Number(form.value.deduction || 0)
})

watch(
  () => props.editData,
  (val) => {
    if (val) {
      form.value = {
        id: val.id,
        slipNo: val.slipNo,
        name: val.name,
        period: val.period,
        salaryRate: val.salaryRate,
        dayWorked: val.dayWorked,
        allowance: val.allowance,
        overtime: val.overtime,
        deduction: val.deduction,
        total: val.total,
        status: val.status,
        paidDate: val.paidDate ?? ''
      }
    } else {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString('id-ID')
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString('id-ID')
      form.value = {
        name: '',
        period: `${start} - ${end}`,
        salaryRate: 150000,
        dayWorked: 6,
        allowance: 250000,
        overtime: 0,
        deduction: 0,
        total: 0,
        status: 'Unpaid',
        paidDate: '-'
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  validationError.value = ''
  if (props.viewOnly) {
    emit('close')
    return
  }
  if (!form.value.name) {
    validationError.value = 'Nama karyawan harus diisi.'
    return
  }
  form.value.total = calculatedTotal.value
  emit('save', { ...form.value })
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop-custom" @click.self="emit('close')">
    <div class="modal-dialog-custom modal-lg">
      <div class="modal-content border-0 shadow-lg rounded-3">
        <div class="modal-header border-bottom px-4 py-3 bg-light">
          <h5 class="modal-title fs-5 fw-bold text-dark">
            <span v-if="viewOnly">Detail Slip Gaji (Payslip)</span>
            <span v-else-if="editData">Edit Slip Gaji</span>
            <span v-else>Buat Slip Gaji Baru</span>
          </h5>
          <button type="button" class="btn-close" @click="emit('close')" aria-label="Close dialog"></button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="modal-body p-4">
            <p v-if="validationError" role="alert" class="mb-3 text-sm text-danger">{{ validationError }}</p>
            <!-- View Only Mode -->
            <div v-if="viewOnly && editData" class="row g-3">
              <div class="col-md-6">
                <span class="text-muted d-block small">No. Slip</span>
                <span class="fw-bold text-primary">{{ editData.slipNo }}</span>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block small">Nama Karyawan</span>
                <span class="fw-bold">{{ editData.name }}</span>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block small">Periode Gaji</span>
                <span>{{ editData.period }}</span>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block small">Hari Masuk</span>
                <span>{{ editData.dayWorked }} Hari</span>
              </div>
              <div class="col-md-4">
                <span class="text-muted d-block small">Tunjangan</span>
                <span>{{ formatRupiah(editData.allowance) }}</span>
              </div>
              <div class="col-md-4">
                <span class="text-muted d-block small">Lembur (Overtime)</span>
                <span>{{ formatRupiah(editData.overtime) }}</span>
              </div>
              <div class="col-md-4">
                <span class="text-muted d-block small">Potongan (Deduction)</span>
                <span>{{ formatRupiah(editData.deduction) }}</span>
              </div>
              <div class="col-12 p-3 bg-light rounded d-flex justify-content-between align-items-center mt-3">
                <span class="fw-bold">Total Gaji Bersih (Take Home Pay)</span>
                <span class="fs-4 fw-bold text-success font-monospace">{{ formatRupiah(editData.total) }}</span>
              </div>
            </div>

            <!-- Form Mode -->
            <div v-else class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Nama Karyawan <span class="text-danger">*</span></label>
                <input v-model="form.name" type="text" class="form-control" required placeholder="e.g. Budi Setiadi" />
              </div>

              <div class="col-md-6">
                <label class="form-label fw-semibold">Periode Gaji <span class="text-danger">*</span></label>
                <input v-model="form.period" type="text" class="form-control" required placeholder="01/03/26 - 31/03/26" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Gaji Pokok / Rate Harian (Rp)</label>
                <input v-model.number="form.salaryRate" type="number" min="0" class="form-control" required />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Hari Kerja (Days)</label>
                <input v-model.number="form.dayWorked" type="number" min="1" max="31" class="form-control" required />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Tunjangan (Allowance Rp)</label>
                <input v-model.number="form.allowance" type="number" min="0" class="form-control" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Uang Lembur (Overtime Rp)</label>
                <input v-model.number="form.overtime" type="number" min="0" class="form-control" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Potongan (Deduction Rp)</label>
                <input v-model.number="form.deduction" type="number" min="0" class="form-control" />
              </div>

              <div class="col-md-4">
                <label class="form-label fw-semibold">Status Pembayaran</label>
                <select v-model="form.status" class="form-select">
                  <option value="Paid">Paid (Sudah Dibayar)</option>
                  <option value="Unpaid">Unpaid (Belum Dibayar)</option>
                </select>
              </div>

              <div class="col-12 p-3 bg-light rounded d-flex justify-content-between align-items-center mt-3">
                <span class="fw-bold">Estimasi Total Diterima (Rp):</span>
                <span class="fs-5 fw-bold text-success font-monospace">{{ formatRupiah(calculatedTotal) }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer border-top px-4 py-3 bg-light">
            <button type="button" class="btn btn-secondary px-4" @click="emit('close')">
              {{ viewOnly ? 'Tutup' : 'Batal' }}
            </button>
            <button v-if="!viewOnly" type="submit" class="btn btn-primary px-4">
              {{ editData ? 'Update Slip Gaji' : 'Simpan Slip Gaji' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.modal-dialog-custom {
  width: 100%;
  max-width: 680px;
  margin: 1rem;
}
</style>

