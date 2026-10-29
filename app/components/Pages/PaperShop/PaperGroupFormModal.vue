<script setup lang="ts">
import type { PaperGroup, PaperGroupFormData } from '#server/types/paper-shop'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import { formControlClass, modalFormRowClass, modalFormLabelClass, modalFormInputColClass } from '~/utils/salesUi'

const props = defineProps<{
  open: boolean
  group: PaperGroup | null
  busy?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: PaperGroupFormData): void
}>()

const merchants = usePaperMerchants()
const form = ref<PaperGroupFormData>({
  partnerId: '',
  name: '',
  merk: '',
  priceType: 'Yes',
  status: 'Active'
})

watch(
  () => props.group,
  (val) => {
    if (val) {
      form.value = {
        id: val.id,
        partnerId: val.partnerId ?? '',
        name: val.name,
        merk: val.merk,
        priceType: val.priceType,
        status: val.status
      }
    } else {
      form.value = {
        partnerId: '',
        name: '',
        merk: '',
        priceType: 'Yes',
        status: 'Active'
      }
    }
  },
  { immediate: true }
)

function handleSubmit() {
  if (!form.value.name.trim()) return
  emit('submit', { ...form.value })
}
</script>

<template>
  <SalesDialog
    :open="open"
    :title="group ? 'Edit Paper Group' : 'Add Paper Group'"
    size="md"
    @close="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4"><div :class="modalFormRowClass"><label :class="modalFormLabelClass">Pemilik Katalog</label><div :class="modalFormInputColClass"><select v-model="form.partnerId" :class="formControlClass"><option value="">Master Platform Dulank</option><option v-for="merchant in merchants" :key="merchant.id" :value="String(merchant.id)">{{ merchant.name }}</option></select><p class="mt-1 text-xs text-gray-500">Pemilik tidak dapat diganti setelah grup memiliki jenis/harga terkait.</p></div></div>
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Paper Group Name <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.name"
            type="text"
            :class="formControlClass"
            required
            placeholder="e.g. Art Paper"
          />
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Merk / Brand <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.merk"
            type="text"
            :class="formControlClass"
            required
            placeholder="e.g. Pindo Deli"
          />
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Price Type</label>
        <div :class="modalFormInputColClass">
          <select v-model="form.priceType" :class="formControlClass">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Status</label>
        <div :class="modalFormInputColClass">
          <select v-model="form.status" :class="formControlClass">
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          class="h-9 px-4 rounded-md border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="h-9 px-4 rounded-md bg-primary text-sm font-semibold text-white shadow hover:bg-primary/90 disabled:opacity-50"
          :disabled="busy"
        >
          {{ busy ? 'Saving...' : group ? 'Update Group' : 'Save Group' }}
        </button>
      </div>
    </form>
  </SalesDialog>
</template>

