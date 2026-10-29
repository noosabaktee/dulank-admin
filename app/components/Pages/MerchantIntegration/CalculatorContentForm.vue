<script setup lang="ts">
import { formControlClass, salesPrimaryButton } from '~/utils/salesUi'
const props = defineProps<{ content: { title: string; introduction: string; published: boolean }; busy: boolean }>()
const emit = defineEmits<{ save: [body: unknown] }>()
const form = reactive({ ...props.content })
watch(() => props.content, value => Object.assign(form, value))
</script>
<template><section id="calculator-content" class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:bg-gray-900"><h2 class="text-base font-semibold">Konten Website ? Kalkulator Potong Kertas</h2><p class="text-sm text-gray-500">Konten platform untuk semua merchant. Logo dan nama usaha berasal dari profil masing-masing.</p><form class="space-y-4" @submit.prevent="emit('save', { ...form })"><div><label class="mb-1 block text-xs">Judul Halaman</label><input v-model="form.title" :class="formControlClass" required maxlength="255" /></div><div><label class="mb-1 block text-xs">Teks di Bawah Judul</label><textarea v-model="form.introduction" :class="formControlClass" rows="6" required maxlength="10000" /></div><label class="flex items-center gap-2 text-sm"><input v-model="form.published" type="checkbox" />Publikasikan</label><div class="flex justify-end"><button type="submit" :class="salesPrimaryButton" :disabled="busy">Simpan Konten</button></div></form></section></template>
