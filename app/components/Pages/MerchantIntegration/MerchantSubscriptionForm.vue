<script setup lang="ts">
import type { MerchantIntegrationData, B2BSubscription } from '#server/types/merchant-integration'
import CurrencyInput from '~/components/Common/CurrencyInput.vue'
import { formControlClass, salesPrimaryButton, salesSecondaryButton } from '~/utils/salesUi'
const props = defineProps<{ data: MerchantIntegrationData; busy: boolean }>()
const emit = defineEmits<{ save: [body: unknown] }>()
const features = [{ id: 'merchant_profile', name: 'Profil Usaha' }, { id: 'paper_cutting', name: 'Potong Kertas' }, { id: 'paper_weight', name: 'Berat Kertas' }, { id: 'catalog_manage', name: 'Kelola Katalog Milik Usaha' }]
const blank = () => ({ id: undefined as number | undefined, userId: '' as string | number, plan: 'Paket Mitra Usaha', planTier: 'Basic', amount: 0, startDate: new Date().toISOString().slice(0, 10), expiresOn: '', status: 'Unpaid', features: features.map(row => row.id) })
const form = ref(blank())
function edit(row: B2BSubscription) { form.value = { id: row.id, userId: row.user_id, plan: row.plan, planTier: row.plan_tier, amount: row.amount, startDate: row.created_date?.slice(0, 10), expiresOn: row.expiring_on?.slice(0, 10), status: row.status, features: row.features ?? features.map(feature => feature.id) } }
</script>
<template>
 <section class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:bg-gray-900"><h2 class="text-base font-semibold">Langganan Usaha B2B</h2><p class="text-sm text-gray-500">Aktivasi manual. Penyimpanan ini tidak menagih pelanggan atau menjalankan payment gateway.</p>
 <form class="grid gap-4 md:grid-cols-2" @submit.prevent="emit('save', { ...form, userId: Number(form.userId) })">
  <div><label class="mb-1 block text-xs">Akun Pemilik</label><select v-model="form.userId" :class="formControlClass" required :disabled="busy || !!form.id"><option value="">Pilih pengguna storefront</option><option v-for="user in data.users" :key="user.id" :value="user.id">{{ user.name }} - {{ user.email }}</option></select></div>
  <div><label class="mb-1 block text-xs">Nama Paket</label><input v-model="form.plan" :class="formControlClass" required maxlength="255" /></div>
  <div><label class="mb-1 block text-xs">Tingkat Paket</label><select v-model="form.planTier" :class="formControlClass"><option>Basic</option><option>Advanced</option><option>Enterprise</option></select></div>
  <div><label class="mb-1 block text-xs">Nominal Paket</label><CurrencyInput v-model="form.amount" :min="0" prefix="Rp" /></div>
  <div><label class="mb-1 block text-xs">Tanggal Mulai</label><input v-model="form.startDate" type="date" :class="formControlClass" required /></div>
  <div><label class="mb-1 block text-xs">Berlaku Sampai</label><input v-model="form.expiresOn" type="date" :min="form.startDate" :class="formControlClass" required /></div>
  <div><label class="mb-1 block text-xs">Status Pembayaran</label><select v-model="form.status" :class="formControlClass"><option>Unpaid</option><option>Paid</option></select></div>
  <div><p class="mb-1 text-xs">Hak Fitur</p><label v-for="feature in features" :key="feature.id" class="me-3 inline-flex items-center gap-1 text-sm"><input v-model="form.features" type="checkbox" :value="feature.id" />{{ feature.name }}</label></div>
  <div class="flex justify-end gap-2 md:col-span-2"><button type="button" :class="salesSecondaryButton" @click="form = blank()">Langganan Baru</button><button type="submit" :class="salesPrimaryButton" :disabled="busy">{{ busy ? 'Menyimpan...' : form.id ? 'Simpan Perubahan' : 'Simpan Langganan' }}</button></div>
 </form>
 <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr><th class="p-2 text-left">Pengguna</th><th class="p-2 text-left">Paket</th><th class="p-2 text-left">Periode</th><th class="p-2 text-left">Pembayaran</th><th class="p-2 text-left">Akses Saat Ini</th><th class="p-2">Action</th></tr></thead><tbody><tr v-for="row in data.subscriptions" :key="row.id" class="border-t border-gray-100"><td class="p-2">{{ data.users.find(user => user.id === row.user_id)?.name || row.user_id }}</td><td class="p-2">{{ row.plan }}</td><td class="p-2">{{ row.created_date?.slice(0,10) }} - {{ row.expiring_on?.slice(0,10) }}</td><td class="p-2">{{ row.status }}</td><td class="p-2">{{ data.users.find(user => user.id === row.user_id)?.access.active ? 'Aktif' : 'Tidak aktif' }}</td><td class="p-2"><button type="button" class="text-primary" :disabled="busy" @click="edit(row)">Edit</button></td></tr><tr v-if="!data.subscriptions.length"><td colspan="6" class="p-4 text-center">Belum ada langganan B2B.</td></tr></tbody></table></div>
 </section>
</template>
