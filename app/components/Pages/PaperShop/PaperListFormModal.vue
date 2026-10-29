<script setup lang="ts">
import type { PaperItem, PaperItemFormData, PaperGroup, PaperSize } from '#server/types/paper-shop'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import { formControlClass, modalFormRowClass, modalFormLabelClass, modalFormInputColClass } from '~/utils/salesUi'

const props = defineProps<{
  open: boolean
  item: PaperItem | null
  groups: PaperGroup[]
  sizes?: PaperSize[]
  busy?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: PaperItemFormData): void
}>()

const form = ref<PaperItemFormData>({
  groupId: '',
  name: '',
  merk: '',
  price: 50000,
  priceType: 'Group',
  unitPrice: 'Kg',
  gsm: 150,
  sizeId: '', paperSize: '',
  stock: 1000,
  unitStock: 'Lembar',
  status: 'Active'
})

watch(
  () => props.item,
  (val) => {
    if (val) {
      form.value = {
        id: val.id,
        groupId: val.groupId,
        sizeId: val.sizeId,
        name: val.name,
        merk: val.merk,
        price: val.price,
        priceType: val.priceType,
        unitPrice: val.unitPrice,
        gsm: val.gsm,
        paperSize: val.paperSize,
        stock: val.stock,
        unitStock: val.unitStock,
        status: val.status
      }
    } else {
      form.value = {
        groupId: props.groups[0]?.id || '',
        name: '',
        merk: props.groups[0]?.merk || '',
        price: 50000,
        priceType: 'Group',
        unitPrice: 'Kg',
        gsm: 150,
        sizeId: '', paperSize: '',
        stock: 1000,
        unitStock: 'Lembar',
        status: 'Active'
      }
    }
  },
  { immediate: true }
)

function onGroupChange() {
  const g = props.groups.find((group) => String(group.id) === String(form.value.groupId))
  if (g) {
    form.value.merk = g.merk
  }
}

function handleSubmit() {
  if (!form.value.name.trim()) return
  emit('submit', { ...form.value })
}
</script>

<template>
  <SalesDialog
    :open="open"
    :title="item ? 'Edit Paper Item' : 'Add Paper Item'"
    size="lg"
    @close="emit('close')"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Paper Group <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <select v-model="form.groupId" :class="formControlClass" required @change="onGroupChange">
            <option v-for="g in groups" :key="g.id" :value="g.id">
              {{ g.name }} ({{ g.merk }})
            </option>
          </select>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Paper Name <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <input
            v-model="form.name"
            type="text"
            :class="formControlClass"
            required
            placeholder="e.g. Art Paper 150gr"
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
        <label :class="modalFormLabelClass">Gramatur (GSM) <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <input
            v-model.number="form.gsm"
            type="number"
            min="0"
            :class="formControlClass"
            required
            placeholder="e.g. 150"
          />
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Paper Size</label>
        <div :class="modalFormInputColClass">
          <select v-if="sizes && sizes.length > 0" v-model="form.sizeId" :class="formControlClass">
            <option v-for="s in sizes" :key="s.id" :value="s.id">
              {{ s.name }} ({{ s.dimension }} {{ s.unit }})
            </option>
          </select>
          <input
            v-else
            v-model="form.paperSize"
            type="text"
            :class="formControlClass"
            placeholder="e.g. Plano 65 x 100 cm"
          />
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Harga (Price) <span class="text-rose-500">*</span></label>
        <div :class="modalFormInputColClass">
          <CurrencyInput v-model="form.price" placeholder="50.000" />
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Price Type & Unit</label>
        <div :class="modalFormInputColClass">
          <div class="grid grid-cols-2 gap-2">
            <select v-model="form.priceType" :class="formControlClass">
              <option value="Group">Group</option>
              <option value="Item">Item</option>
              <option value="Plano">Plano</option>
            </select>
            <select v-model="form.unitPrice" :class="formControlClass">
              <option value="Kg">Kg</option>
              <option value="Plano">Plano</option>
              <option value="Rim">Rim</option>
              <option value="Lembar">Lembar</option>
            </select>
          </div>
        </div>
      </div>

      <div :class="modalFormRowClass">
        <label :class="modalFormLabelClass">Stock & Unit Stock</label>
        <div :class="modalFormInputColClass">
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model.number="form.stock"
              type="number"
              min="0"
              :class="formControlClass"
              placeholder="Qty Stock"
            />
            <select v-model="form.unitStock" :class="formControlClass">
              <option value="Lembar">Lembar</option>
              <option value="Plano">Plano</option>
              <option value="Rim">Rim</option>
              <option value="Kg">Kg</option>
            </select>
          </div>
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
          {{ busy ? 'Saving...' : item ? 'Update Item' : 'Save Item' }}
        </button>
      </div>
    </form>
  </SalesDialog>
</template>

