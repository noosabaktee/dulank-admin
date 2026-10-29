<script setup lang="ts">
import type { PaperPrice, PaperPriceFormData, PaperGroup } from '#server/types/paper-shop'
import SalesDialog from '~/components/Sales/SalesDialog.vue'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import { formControlClass, modalFormRowClass, modalFormLabelClass, modalFormInputColClass, salesPrimaryButton, salesSecondaryButton } from '~/utils/salesUi'
const props = defineProps<{ open: boolean; price: PaperPrice | null; groups?: PaperGroup[]; busy?: boolean }>()
const emit = defineEmits<{ close: []; submit: [payload: PaperPriceFormData] }>()
const refs = usePaperReferences()
const blank = (): PaperPriceFormData => ({ nama: '', groupId: '', paperId: '', sizeId: '', group: '', merk: '', ukuran: '', satuan: 'lembar', gramatur: 0, minOrder: '1', kelipatan: '1', harga: 0, status: 'Active' })
const form = ref(blank())
const types = computed(() => refs.types.value.filter(type => type.groupId === form.value.groupId))
const selectedType = computed(() => refs.types.value.find(type => type.id === form.value.paperId))
watch([() => props.open, () => props.price], ([open, price]) => { if (open) form.value = price ? { ...price, groupId: price.groupId ?? '', paperId: price.paperId ?? '', sizeId: price.sizeId ?? '' } : blank() }, { immediate: true })
function changeGroup() { form.value.paperId = ''; form.value.group = props.groups?.find(group => group.id === form.value.groupId)?.name ?? '' }
function submit() { emit('submit', { ...form.value, gramatur: selectedType.value?.gsm ?? 0, merk: selectedType.value?.merk ?? '', group: props.groups?.find(group => group.id === form.value.groupId)?.name ?? form.value.group }) }
</script>
<template>
 <SalesDialog :open="open" :title="price ? 'Edit Paper Price' : 'Add Paper Price'" :busy="busy" @close="emit('close')"><form class="space-y-4" @submit.prevent="submit">
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Group Kertas</label><div :class="modalFormInputColClass"><select v-model="form.groupId" :class="formControlClass" required @change="changeGroup"><option value="">Pilih grup</option><option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option></select></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Jenis Kertas</label><div :class="modalFormInputColClass"><select v-model="form.paperId" :class="formControlClass" required><option value="">Pilih jenis kertas</option><option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }} - {{ type.gsm }} gsm</option></select></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Ukuran Kertas</label><div :class="modalFormInputColClass"><select v-model="form.sizeId" :class="formControlClass" required><option value="">Pilih ukuran</option><option v-for="size in refs.sizes.value" :key="size.id" :value="size.id">{{ size.name }} - {{ size.width }} x {{ size.length }} {{ size.unit }}</option></select></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Nama Penawaran Harga</label><div :class="modalFormInputColClass"><input v-model="form.nama" :class="formControlClass" required maxlength="255" /></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Satuan Harga</label><div :class="modalFormInputColClass"><select v-model="form.satuan" :class="formControlClass"><option value="lembar">lembar</option><option value="rim">rim</option><option value="kg">kg</option></select></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Minimum Order</label><div :class="modalFormInputColClass"><input v-model="form.minOrder" :class="formControlClass" type="number" min="0" step="0.01" required /></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Kelipatan Order</label><div :class="modalFormInputColClass"><input v-model="form.kelipatan" :class="formControlClass" type="number" min="0" step="0.01" required /></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Harga</label><div :class="modalFormInputColClass"><CurrencyInput v-model="form.harga" prefix="Rp" :min="0" required /></div></div>
 <div :class="modalFormRowClass"><label :class="modalFormLabelClass">Status</label><div :class="modalFormInputColClass"><select v-model="form.status" :class="formControlClass"><option value="Active">Active</option><option value="Deactive">Deactive</option></select></div></div>
 <p v-if="!groups?.length || !refs.types.value.length || !refs.sizes.value.length" class="text-sm text-amber-600">Lengkapi master grup, jenis dan ukuran sebelum menambah harga.</p>
 <div class="flex justify-end gap-2 border-t pt-4"><button type="button" :class="salesSecondaryButton" @click="emit('close')">Cancel</button><button type="submit" :class="salesPrimaryButton" :disabled="busy">{{ busy ? 'Saving...' : 'Simpan Harga' }}</button></div>
 </form></SalesDialog>
</template>
