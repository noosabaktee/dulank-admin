# PANDUAN PAGE BERSIH, PETA KOMPONEN & MASTER STATUS MATRIX


### Revisi terbatas Cash Advance / Expense - 23 Oktober 2026

`/cash-advance`: PUT, tenor/rekening, outstanding read-only, detail/angsuran aktual dan refresh manager. `/expenses`: total paid kumulatif -> tambahan payment/jurnal sebesar delta; penurunan/lebih bayar ditolak. UI form/detail berkomunikasi melalui props/emits -> manager/composable -> API Laravel; hitungan final/locking berada di backend. Status implemented/API-tested, partial BRVS, browser verification pending; tidak menaikkan seluruh menu menjadi approved baseline. Source legacy tidak tersedia, browser inventory kosong. Rincian validasi dan batas pada [DONE bagian 12](../../DONE.md) dan [changelog](obsidian-vault/09-CHANGELOG.md). Rama; NOT COMMITTED / NOT PUSHED.


## Pembaruan terbatas 23 Oktober 2026 - Operasional nonproduk

| Modul/halaman | Evidence sesi ini | Status |
| --- | --- | --- |
| Employee Salary / Payslip / Payslip Detail | Master gaji/status, employee ID, kalkulasi server dan snapshot periode/sistem, detail database, pembayaran parsial, guard edit/hapus; Pest + contract tests | Implemented/API-tested; browser verification pending |
| Income / Expense / Cash Advance | Transaksi/lock, batas due, proteksi hapus, koreksi jurnal income dan jurnal cash advance | API-tested; rekonsiliasi historis/browser pending |
| Blog/category/tag/comment / FAQ | Filter status, transaksi tag, proteksi kategori terpakai dan dataset konten umum | Targeted API/contract-tested; audit seluruh UI pending |
| Download Files | FormData byte aktual, PUT, favorite persisten, allowlist/limit upload; satu berkas per submit | Implemented/API-tested; browser/ownership/download counter pending |
| Support Ticket / Contact | Pemetaan form, deskripsi, balasan/actor/histori persisten; dataset kontak/tiket | API/contract-tested; browser/customer-side flow pending |
| Banner / Client | Dataset nonaktif untuk review, tanpa aset/endorsement palsu | Seed-tested; kelengkapan publikasi/UI pending |

Page tetap mendelegasikan ke komponen/composable -> apiFetch -> Laravel. Tidak mengklaim pemecahan seluruh workspace existing atau approved BRVS baseline. Typecheck/build/structure dan 12 Node tests PASS, backend 251 tes/2.747 assertions PASS; browser apps=[]/browsers=[]. Structure validator hashesChecked=false, sumber HTML/legacy tidak tersedia untuk perbandingan baru. Seeder/migration baru belum diterapkan pada DB kerja; partial tahap 11/12/14, bukan seluruh website selesai. Detail cakupan dan gate: [DONE](../../DONE.md) bagian 10, [TO-DO](../../TO-DO.md), [changelog](obsidian-vault/09-CHANGELOG.md). Rama; NOT COMMITTED / NOT PUSHED.

> **Update UI 2026-10-21:** notifikasi CRUD memakai ActionToastHost global + apiFetch response/bridge ActionToast (41 blok/37 komponen); PhotoField mengikuti Employee; MemberPicker satu input chip/live search; kedua halaman partner menormalkan metrics null/Count field dan filter jenis. 7 Node tests + 3 API tests/17 assertions, kompilasi 830 template, build/typecheck/structure PASS. Browser belum tersedia; partial BRVS, browser verification pending. Evidence [changelog](obsidian-vault/09-CHANGELOG.md); gate tetap di TO-DO.md root. Tidak ada migration/seeding/data produk berubah. Rama; NOT COMMITTED / NOT PUSHED.


> **Revisi 2026-10-21:** Store/Customer/Supplier photo -> useImageUpload/API -> persisted URL/table; Department/Designation memberIds -> OrganizationController transaction -> employees FK -> counts/names response; Customer/Supplier address -> owner PK; Role list -> deletion eligibility/reason; static icon fonts -> Feather; action labels/date fields konsisten. Shared form inputs EntityPhotoField/OrganizationMemberPicker terpisah dari request; route tetap composition layer. Backend regression/full suite, build/typecheck/structure PASS; browser inventory kosong sehingga status **implemented/API tested, browser verification pending; partial BRVS**. [TO-DO](../../TO-DO.md) dan [DONE](../../DONE.md) menjadi tracking tahap lintas repo, tidak menggantikan evidence audit modul historis. Rama; NOT COMMITTED / NOT PUSHED.


> **Verifikasi lanjutan 2026-10-21:** dropdown wilayah HR memakai read-only location-options; edit karyawan mengambil detail by ID; tanggal/modal dan currency dirapikan; kategori subkategori harus existing. Backend full 211 tes + target terbaru 26 tes PASS; typecheck, build, structure, diff check PASS. Browser inventory tetap kosong; MySQL lokal saat audit ulang menolak koneksi. Hasil DB 20 Oktober adalah evidence sebelumnya. Status **implemented/API tested, browser/runtime verification pending**, partial BRVS. Detail pada [changelog](obsidian-vault/09-CHANGELOG.md). **Rama / NOT COMMITTED / NOT PUSHED**.


> **Update tahap 3?5 (2026-10-20):** User Admin, Store, Bank Account, Customer/Address, Employee dan Profile/Security/auth memakai kontrak Laravel aktual untuk perubahan yang tercatat di [changelog](obsidian-vault/09-CHANGELOG.md). **Implemented/API tested; browser verification pending; partial BRVS.** Route -> komponen form/dialog -> domain composable -> apiFetch -> Laravel controller/service -> Eloquent/FK. Tidak mengklaim full Nitro BRVS atau seluruh legacy parity. EmployeePageForm satu shared editor add/edit; autentikasi legacy dan beberapa Workspace masih memerlukan review dekomposisi. Scope cabang transaksi/laporan belum menyeluruh. Data existing dipertahankan dan demo tidak diisi ulang. Branch Rama: **NOT COMMITTED / NOT PUSHED**.


## Dulank Admin Nuxt 4 (Percetakan & ERP System)

> **DOKUMEN KANONIK KUALITAS & STATUS REPOSITORI**
> Dokumen ini memuat:
>
> 1. **Aturan Baku "Page Bersih"** (Arsitektur Thin Composition Layer).
> 2. **Peta Lokasi Komponen, Composable, dan Backend API**.
> 3. **Master Status Matrix** seluruh menu/halaman (menandai mana yang sudah _Approved_, _Verified_, _Partial_, atau _Pending_).
> 4. **SOP Workflow Mengerjakan Menu Baru** (langkah pencatatan & standarisasi).
> 5. **Proses Checking / QA Checklist Otomatis** untuk memverifikasi apakah suatu halaman sudah benar atau belum.

> **Interpretation rule 2026-10-09:** jumlah baris page dan HTTP 200 hanya membuktikan page shell serta route availability. Status BRVS/UI yang sebenarnya wajib mengikuti `docs/BACKEND_READY_VERTICAL_SLICE.md`, `docs/UI_DECOMPOSITION_STANDARD.md`, dan `docs/AI_WORK_QUALITY_FRAMEWORK.md`. Baris lama yang masih menulis `Local Reactive Form`, `Static Persistence`, atau Workspace monolitik tidak otomatis `verified` dan harus diaudit ulang sebelum dipakai sebagai klaim selesai.
>
> **Latest audit override (2026-10-11):** hasil source audit terbaru berada di [CODEBASE_COMPLIANCE_AUDIT_2026-10-09.md](CODEBASE_COMPLIANCE_AUDIT_2026-10-09.md), sedangkan inventaris 186 HTML/route berada di [LEGACY_PARITY_AUDIT_2026-10-10.md](LEGACY_PARITY_AUDIT_2026-10-10.md). Audit ulang mencatat 114 page <=20 baris, 55 page 21-150, 2 page 151-200, 10 page 201-300, dan 7 page >300. TypeScript, direct-request UI, native browser dialog, direct print list/report, dan structure validator sudah hijau. Sebanyak 50 route—Sales/dokumen, Payment, Sales-adjacent, Webstore/Support Ticket, sembilan route Orders/Job Order, enam route master Workflow, Dashboard Admin, Analytics Dashboard, Subscriptions, Kalkulator Dashboard, Billing, serta Voucher—sudah melewati source review, API/persistence/data safeguards, dan browser desktop/390px. Sebanyak 136 route legacy lain belum diaudit manual/browser. Scorecard lama serta klaim 100% pada dokumen ini dipertahankan sebagai riwayat, bukan bukti status verified seluruh aplikasi.

---

## 1. ATURAN BAKU "PAGE BERSIH" (PAGE ARCHITECTURE GATE)

Arsitektur resmi repositori ini adalah **Backend-Ready Vertical Slice (BRVS)**. Di dalam BRVS, file halaman pada `app/pages/<route>.vue` memiliki aturan ketat:

### A. Peran Tunggal Page

- File `app/pages/*.vue` **HANYA BERPERAN SEBAGAI COMPOSITION & ROUTING LAYER TIPIS**.
- **Target Standar:** **12 – 19 baris kode**.
- **Batas Keras (Hard Limit):** Maksimal 150 baris (hanya jika mengoordinasikan sub-komponen kompleks). Di atas 200 baris wajib dipecah; di atas 300 baris = **Hard Fail / Structural Review Required**.

### B. Larangan Mutlak di dalam File Page

1. ❌ **DILARANG memakai `confirm()` atau `alert()` bawaan browser.**
   - Dialog hapus WAJIB memakai komponen modal `<SalesConfirmDelete>`.
2. ❌ **DILARANG memakai `$fetch()` atau `useFetch()` langsung di template page.**
   - Seluruh mutasi dan query domain WAJIB melalui composable `use<Menu>()` atau editor composable terkait.
3. ❌ **DILARANG menumpuk markup tabel panjang (`<table>`, `<thead>`, `<tbody>`).**
   - Markup tabel diletakkan di komponen domain `*RecordsTable.vue` menggunakan `<SalesDataTable>`. Workspace hanya boleh menyusun komponen, bukan menampung seluruh tabel, form, modal, dan mutation flow.
4. ❌ **DILARANG menumpuk modal form ratusan baris di dalam file page.**
   - Modal Add/Edit diletakkan di komponen domain `*FormModal.vue` atau `*DocumentForm.vue`.
5. ❌ **DILARANG memisahkan form Add dan Edit menjadi dua implementasi yang berbeda.**
   - Wajib _Single-Source Form_ (komponen form yang sama digunakan oleh Add dan Edit dengan prop `mode="add" | "edit"`).
6. ❌ **DILARANG menyimpan atau menampilkan format uang statis.**
   - Dataset wajib angka murni (`number`), pemformatan tampilan wajib via `<CurrencyDisplay>` atau `formatIDR()`.
7. ❌ **DILARANG membungkus `SalesDataTable.vue` di dalam `<div class="card">` ganda.**

### C. Struktur Template Wajib Page

```vue
<script setup lang="ts">
import ExampleFilters from "~/components/Pages/example/ExampleFilters.vue";
import ExampleFormModal from "~/components/Pages/example/ExampleFormModal.vue";
import ExampleHeader from "~/components/Pages/example/ExampleHeader.vue";
import ExampleRecordsTable from "~/components/Pages/example/ExampleRecordsTable.vue";

definePageMeta({ layout: "default" });
useLegacyPage({ title: "Nama Halaman", sweetAlert: false });

const page = useExamplePage();
</script>

<template>
  <div class="dulank-page dulank-page-example">
    <ExampleHeader :busy="page.busy.value" @add="page.openAdd" />
    <ExampleFilters v-model="page.filters.value" />
    <ExampleRecordsTable :items="page.items.value" @edit="page.openEdit" @delete="page.openDelete" />
    <ExampleFormModal :open="page.formOpen.value" :record="page.selected.value" @submit="page.save" @close="page.closeForm" />
  </div>
</template>
```

Jika page memakai satu `<ExampleScreen />`, komponen tersebut tetap wajib menjadi orchestrator tipis yang menyusun child components di atas. Ia tidak boleh menjadi salinan monolitik page lama.

---

## 2. PETA LOKASI KOMPONEN & ARSITEKTUR VERTICAL SLICE

Rantai arsitektur wajib dari hulu ke hilir adalah:
$$\text{Page Composer} \longrightarrow \text{Responsibility Components} \longrightarrow \text{Domain Composable} \longrightarrow \text{Nitro API} \longrightarrow \text{Domain Service / Data}$$

```
app/
├── pages/                                # Thin Routing Layer (12-19 baris)
├── components/
│   ├── pages/<domain>/                   # Header, Stats, Filters, Table, Form, Detail, Modal
│   ├── sales/                            # Komponen UI Bersama Standar (Approved Baseline)
│   │   ├── SalesDataTable.vue            # Tabel standar (text-sm, sorting, pagination)
│   │   ├── SalesListHeader.vue           # Toolbar header konsisten (Title, Pdf, Print, Refresh, Add)
│   │   ├── SalesActionButton.vue         # Tombol aksi baris (view, edit, delete)
│   │   ├── SalesConfirmDelete.vue        # Dialog konfirmasi hapus standar
│   │   ├── SalesFeedback.vue             # Skeleton loading & error retry
│   │   ├── SalesStatusBadge.vue          # Badge status seragam
│   │   └── SalesMoreMenu.vue             # Dropdown aksi aman overflow
│   ├── common/                           # Utilitas UI umum
│   │   ├── DateRangePicker.vue           # Filter tanggal standar toolbar (h-9)
│   │   ├── TableFilterSelect.vue         # Dropdown filter standar toolbar (h-9)
│   │   ├── CurrencyDisplay.vue           # Format angka uang dinamis (tabular-nums)
│   │   ├── CurrencyInput.vue             # Input rupiah realtime (h-9)
│   │   ├── DocumentPrintModal.vue        # Dialog cetak tabel terisolasi (Kop Resmi)
│   │   ├── PageHeader.vue                # Header form/dokumen (Common Header)
│   │   ├── QuantityStepper.vue           # Stepper kuantitas [+] [-]
│   │   └── TableSkeleton.vue             # Skeleton placeholder tabel
│   └── forms/                            # Form input reusable (AddressCascader, dll.)
├── composables/                          # State management, query, dan mutasi API
└── utils/                                # Helper frontend (currency.ts, actionIcons.ts, salesUi.ts)

server/
├── api/<domain>/                         # Endpoint Nitro tipis (index.get, index.post, [id].delete)
├── types/<domain>.ts                     # Kontrak data TypeScript domain
├── data/<domain>.json                    # Mock relational database (Primary Key, Foreign Keys, angka murni)
└── utils/<domain>Data.ts                 # Domain service, validasi, dan persistensi
```

---

## 3. MASTER STATUS MATRIX SELURUH HALAMAN & AUDIT ADOPSI UI RAMA

### 3.1. Audit Adopsi Pemecahan UI Rama (BRVS-UI) & Kesiapan Backend

> **PERTANYAAN AUDIT UTAMA:** _Apakah repositori Dulank Admin sudah menggunakan standar pemecahan UI Rama 100%?_
>
> **JAWABAN ARSITEKTURAL:** **BELUM 100%.** Persentase lama dipensiunkan karena tidak lagi dapat dibuktikan dari source aktual.
>
> Mengacu pada `docs/UI_DECOMPOSITION_STANDARD.md` (Branch `Rama` commit `76f6e79`), terdapat 4 pilar evaluasi:
>
> 1. **Pilar 1 - Thin Composition Layer:** dari 188 page, 167 berada pada batas maksimal 150 baris dan 21 melewati batas; 9 di antaranya di atas 300 baris.
> 2. **Pilar 2 - UI Responsibility Decomposition:** belum lulus menyeluruh; 58 component di atas 250 baris dan 36 di atas 300 baris masih perlu audit tanggung jawab.
> 3. **Pilar 3 - Anti-Monolithic Workspace:** dari 97 Workspace/Screen, 54 masih di atas 200 baris dan 15 di atas 300 baris.
> 4. **Pilar 4 - BRVS Backend:** request UI sudah melalui composable, tetapi 99 API mutation route masih menulis JSON langsung dan memerlukan service/repository audit.

### 3.1.1. Ringkasan Status Aktif

Ringkasan aktif tidak diduplikasi di sini. Gunakan tabel **Status Kanonik Singkat** dan audit per grup pada [CODEBASE_COMPLIANCE_AUDIT_2026-10-09.md](CODEBASE_COMPLIANCE_AUDIT_2026-10-09.md). Status utamanya:

- **Approved behavior baseline:** Sales, Payment, Orders/Workflow, Webstore, dan shared Print/PDF.
- **Implemented, static verification passed:** Finance & Account.
- **Implemented, verification pending:** Peoples, HRM, Content, User Management, Setting, Reports, Calculator, dan sebagian Products & Services.
- **Partial/non-compliant:** Promo tersisa, Purchases, Paper/Inventory gap, page/workspace besar, dan repository backend yang belum dipisah. Lima route Dashboard utama serta Voucher sudah lulus route-scope runtime.
- **Deferred:** POS.

Tabel detail route di bawah dipertahankan sebagai inventory implementasi historis. Kolom `VERIFIED`, persentase decomposition, dan jumlah baris di tabel lama **dipensiunkan sebagai status aktif** sampai baris tersebut diaudit ulang dan disinkronkan dengan audit kanonik.

---

### Keterangan Simbol & Kategori Kolom:

- **Adopsi UI Rama:**
  - 🟢 **100% Full Decomposed**: Page tipis + Terpecah menjadi Header, Stats, Filters, Table, Single-Source Form, Modals ($\le 250$ baris) + Composable domain aktif.
  - 🟡 **~50% Partial Workspace**: Page tipis, tetapi UI ditampung dalam satu file monolitik `*Workspace.vue` (>200–670 baris) tanpa pemecahan leaf components.
  - 🔴 **<30% Monolith / Gap**: Masih ada browser dialog (`confirm`/`alert`), script legacy, atau tabel/modal langsung di template page.
- **Status Relasi Backend:**
  - 🟢 **Relasional Penuh**: Memiliki PK `id`, FK relasional (`customerId`, `orderId`, `productId`, dll.), tipe data numerik murni (`number`).
  - 🟡 **Semi-Relasional / Flat**: Dataset list flat atau relasi 1 level sederhana tanpa foreign key mendalam.
  - ⚪ **Static / Key-Value**: Form setting tunggal atau config statis tanpa relasi tabel database.
- **Status BRVS:**
  - 🟢 **APPROVED BASELINE**: Rantai BRVS lengkap, BRVS-UI 100%, persistence terverifikasi, approved oleh pengguna.
  - 🔵 **VERIFIED**: Rantai fungsional lolos audit runtime dan composable/API terhubung.
  - 🟡 **PARTIAL BRVS**: Ada gap UI decomposition (monolithic workspace), backend non-relational, atau code standard gap.
  - ⚪ **PENDING**: Dalam antrean pengerjaan.

---

### A. Sales & Order Baseline (Approved Baseline)

| No  | Rute / Template Page                            | Pecahan Komponen (Rama UI Standard)                                                                                                                                                                                                                             | Composable Domain                           | Endpoint & Service Backend                                | Status Relasi Backend (DB-Ready)                                               |     Adopsi UI Rama      |     Status BRVS      |
| :-: | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ | :---------------------: | :------------------: |
|  1  | `app/pages/sales.vue`<br>(139 baris)            | `SalesListHeader`, `SalesDataTable`, `SalesOrderModal`, `SalesReceiptModal`, `SalesNotesModal`, `SalesConfirmCancelModal`, `SalesRefundModal`, `SalesDeliveryModal`, `SalesDocumentPrintModal`, `SalesPaymentsModal`, `SalesHistoryModal`, `SalesConfirmDelete` | `useSales()`<br>_(Aktif)_                   | `/api/sales`<br>(`salesData.ts`)                          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `orderId`, `branchId` | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  2  | `app/pages/invoice.vue`<br>(92 baris)           | `InvoiceStatsWidgets`, `InvoiceRecordsTable`, `InvoiceDocumentForm`, `InvoiceDetailModal`, `InvoicePaymentsModal`, `InvoicePrintModal`, `SalesListHeader`, `SalesConfirmDelete`                                                                                 | `useInvoices()`<br>_(Aktif)_                | `/api/invoices`<br>(`invoicesData.ts`)                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `saleId`, `customerId`              | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  3  | `app/pages/delivery-note.vue`<br>(93 baris)     | `DeliveryNoteStatsWidgets`, `DeliveryNoteRecordsTable`, `DeliveryNoteDocumentForm`, `DeliveryNoteDetailModal`, `DeliveryNoteTrackingModal`, `DeliveryNotePrintModal`, `SalesListHeader`, `SalesConfirmDelete`                                                   | `useDeliveryNotes()`<br>_(Aktif)_           | `/api/delivery-notes`<br>(`deliveryNotesData.ts`)         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `saleId`, `customerId`              | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  4  | `app/pages/sales-return.vue`<br>(97 baris)      | `SalesReturnStatsWidgets`, `SalesReturnRecordsTable`, `SalesReturnDocumentForm`, `SalesReturnDetailModal`, `SalesReturnPrintModal`, `SalesListHeader`, `SalesConfirmDelete`                                                                                     | `useSalesReturns()`<br>_(Aktif)_            | `/api/sales-returns`<br>(`salesReturnsData.ts`)           | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `saleId`, `customerId`              | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  5  | `app/pages/quotation.vue`<br>(83 baris)         | `QuotationStatsWidgets`, `QuotationRecordsTable`, `QuotationDocumentForm`, `QuotationDetailModal`, `QuotationPrintModal`, `SalesListHeader`, `SalesConfirmDelete`                                                                                               | `useQuotations()`<br>_(Aktif)_              | `/api/quotations`<br>(`quotationsData.ts`)                | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `branchId`            | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  6  | `app/pages/request-quotation.vue`<br>(68 baris) | `RequestQuotationStatsWidgets`, `RequestQuotationRecordsTable`, `RequestQuotationDocumentForm`, `RequestQuotationDetailModal`, `RequestQuotationPrintModal`, `SalesListHeader`, `SalesConfirmDelete`                                                            | `useRequestQuotations()`<br>_(Aktif)_       | `/api/request-quotations`<br>(`requestQuotationsData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `branchId`            | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |
|  7  | `app/pages/add-quotation.vue`<br>(12 baris)     | `QuotationDocumentForm` _(Single-Source Form shared Add/Edit)_, `PageHeader`                                                                                                                                                                                    | `useQuotationDocumentEditor()`<br>_(Aktif)_ | `/api/quotations`<br>(`quotationsData.ts`)                | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `branchId`            | 🟢 100% Full Decomposed | 🟢 APPROVED BASELINE |

---

### B. Payment Group (Approved Baseline)

| No  | Rute / Template Page                           | Pecahan Komponen (Rama UI Standard)                                                                                                                       | Composable Domain                        | Endpoint & Service Backend                    | Status Relasi Backend (DB-Ready)                                                  |     Adopsi UI Rama      |     Status BRVS      |
| :-: | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- | :---------------------: | :------------------: |
|  8  | `app/pages/payments.vue`<br>(81 baris)         | `PaymentRecordsTable`, `SalesListHeader`                                                                                                              | `usePayments()`<br>_(Aktif)_             | `/api/payments`<br>(`paymentData.ts`)          | 🟢 Typed payment record; numeric amount and source IDs retained                  | 🟢 Responsibility split | 🟢 ROUTE-SCOPE RUNTIME PASSED |
|  9  | `app/pages/payment-inflow.vue`<br>(134 baris)  | `PaymentBalanceSummary`, `PaymentFlowRecordsTable`, `PaymentFlowEditor`, `PaymentFlowDetails`, `PaymentMethodFields`, `PaymentSplitEditor`, `PaymentTransactionDetailsTable` | `usePaymentFlow('inflow')`<br>_(Aktif)_  | `/api/payment-inflow`<br>(`paymentFlow.ts`, `paymentFlowData.ts`) | 🟢 Typed detail/history/transfer/split; numeric amount and IDs retained | 🟢 Responsibility split | 🟢 ROUTE-SCOPE RUNTIME PASSED |
| 10  | `app/pages/payment-outflow.vue`<br>(134 baris) | `PaymentBalanceSummary`, `PaymentFlowRecordsTable`, `PaymentFlowEditor`, `PaymentFlowDetails`, `PaymentMethodFields`, `PaymentTransactionDetailsTable` | `usePaymentFlow('outflow')`<br>_(Aktif)_ | `/api/payment-outflow`<br>(`paymentFlow.ts`, `paymentFlowData.ts`) | 🟢 Typed detail/history/transfer; numeric amount and IDs retained | 🟢 Responsibility split | 🟢 ROUTE-SCOPE RUNTIME PASSED |

---

### B.1 Dashboard Billing

| Rute / Template Page | Pecahan Komponen | Composable Domain | Endpoint & Service Backend | Status Relasi Backend | Status BRVS |
| --- | --- | --- | --- | --- | --- |
| `app/pages/billing.vue` (9 baris) | `BillingWorkspace.vue`, `BillingStats.vue`, `BillingRecordsTable.vue` | `useBillings()` | `/api/billings` (`server/utils/billing.ts`) | PK `id`; FK `transactionId`, `userId`; nilai uang numeric; timestamps | 🔵 ROUTE-SCOPE RUNTIME PASSED |

### B.2 Promo Voucher

| Page | Komponen | Composable | API / Service | Data relasional | Status |
|---|---|---|---|---|---|
| `app/pages/voucher.vue` (9 baris) | `VoucherWorkspace.vue`, `VoucherRecordsTable.vue`, `VoucherFormDialog.vue` | `useVouchers()` | `/api/vouchers` (`server/utils/vouchers.ts`) | PK `id`; FK `storeId`, `createdByEmployeeId`, `productIds`; discount numeric; timestamps | 🔵 ROUTE-SCOPE RUNTIME PASSED |

---

### C. Webstore Group

| No  | Rute / Template Page                       | Pecahan Komponen (Rama UI Standard)                                                                                                                 | Composable Domain                | Endpoint & Service Backend                     | Status Relasi Backend (DB-Ready)                                             |     Adopsi UI Rama      | Status BRVS |
| :-: | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- | :---------------------: | :---------: |
| 11  | `app/pages/cart.vue`<br>(98 baris)         | `CartStatsWidgets`, `CartRecordsTable`, `CartItemModal`, `CartDetailModal`, `CartPrintModal`, `SalesListHeader`                                     | `useCarts()`<br>_(Aktif)_        | `/api/carts`<br>(`cartData.ts`)                | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `productId`         | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 12  | `app/pages/checkout.vue`<br>(98 baris)     | `CheckoutStatsWidgets`, `CheckoutRecordsTable`, `CheckoutItemModal`, `CheckoutDetailModal`, `CheckoutPrintModal`, `SalesListHeader`                 | `useCheckouts()`<br>_(Aktif)_    | `/api/checkouts`<br>(`checkoutData.ts`)        | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `cartId`, `orderId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 13  | `app/pages/wishlist.vue`<br>(97 baris)     | `WishlistStatsWidgets`, `WishlistRecordsTable`, `WishlistItemModal`, `WishlistDetailModal`, `WishlistPrintModal`, `SalesListHeader`                 | `useWishlists()`<br>_(Aktif)_    | `/api/wishlists`<br>(`wishlistData.ts`)        | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `productId`         | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 14  | `app/pages/reviews.vue`<br>(95 baris)      | `ReviewStatsWidgets`, `ReviewRecordsTable`, `ReviewItemModal`, `ReviewDetailModal`, `ReviewPrintModal`, `SalesListHeader`                           | `useReviews()`<br>_(Aktif)_      | `/api/reviews`<br>(`reviewData.ts`)            | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `productId`         | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 15  | `app/pages/contact-form.vue`<br>(89 baris) | `ContactFormStatsWidgets`, `ContactFormRecordsTable`, `ContactFormReplyModal`, `ContactFormDetailModal`, `ContactFormPrintModal`, `SalesListHeader` | `useContactForms()`<br>_(Aktif)_ | `/api/contact-forms`<br>(`contactFormData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId` (opsional)           | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 16  | `app/pages/orders.vue`<br>(130 baris)      | `OrderStatsWidgets`, `OrderRecordsTable`, `OrderDocumentForm`, `OrderDetailModal`, `OrderTrackingModal`, `OrderPrintModal`, `SalesListHeader`       | `useOrders()`<br>_(Aktif)_       | `/api/orders`<br>(`orderData.ts`)              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `productId`         | 🟢 100% Full Decomposed | 🔵 VERIFIED |

---

### D. Calculator Apps Group

| No  | Rute / Template Page                               | Pecahan Komponen (Rama UI Standard)                                                                                                        | Composable Domain                         | Endpoint & Service Backend                  | Status Relasi Backend (DB-Ready)                                                                |              Adopsi UI Rama               |   Status BRVS   |
| :-: | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- | :---------------------------------------: | :-------------: |
| 17  | `app/pages/kalkulator-dashboard.vue`<br>(11 baris) | `KalkulatorDashboardWorkspace.vue` (180 baris), `CalculatorDashboardTelemetry.vue`, `CalculatorDashboardTable.vue`, `CalculatorDashboardViewModal.vue`, `CalculatorDashboardEditModal.vue` | `useCalculatorDashboard()`<br>_(Aktif)_ | `/api/calculator/dashboard` | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`, `departmentId`, numeric metrics | 🟢 Responsibility split | 🔵 ROUTE-SCOPE RUNTIME PASSED |
| 18  | `app/pages/harga-jasa-lainya.vue`<br>(133 baris)   | `JasaLainRecordsTable.vue`, `JasaLainFormModal.vue`, `JasaLainViewModal.vue`, `SalesListHeader.vue`, `SalesConfirmDelete.vue`                              | `useJasaLain()`<br>_(Aktif)_              | `/api/calculator-components/jasa-lain`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `category`, `unit`, numeric `hargaDasar`           | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 19  | `app/pages/kertas-group.vue`<br>(11 baris)         | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 20  | `app/pages/kertas-group-self.vue`<br>(124 baris)   | `PaperGroupStatsWidgets.vue`, `PaperGroupRecordsTable.vue`, `PaperGroupFormModal.vue`, `PaperGroupViewModal.vue`, `SalesConfirmDelete.vue` | `usePaperGroupsSelf()`<br>_(Aktif)_       | `/api/paper-groups`<br>(`paperShopData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>name, merk, priceType, status                            | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 21  | `app/pages/kertas-harga.vue`<br>(11 baris)         | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 22  | `app/pages/kertas-harga-self.vue`<br>(119 baris)   | `PaperPriceStatsWidgets.vue`, `PaperPriceRecordsTable.vue`, `PaperPriceFormModal.vue`, `SalesConfirmDelete.vue`                            | `usePaperPricesSelf()`<br>_(Aktif)_       | `/api/paper-prices`<br>(`paperShopData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `paperId`, `groupId`, numeric `harga`                | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 23  | `app/pages/kertas-jenis.vue`<br>(11 baris)         | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 24  | `app/pages/kertas-jenis-self.vue`<br>(129 baris)   | `PaperListStatsWidgets.vue`, `PaperListRecordsTable.vue`, `PaperListFormModal.vue`, `PaperListViewModal.vue`, `SalesConfirmDelete.vue`     | `usePaperItemsSelf()`<br>_(Aktif)_        | `/api/paper-items`<br>(`paperShopData.ts`)  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `groupId`, `sizeId`, numeric `price`, `stock`, `gsm` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 25  | `app/pages/kertas-ukuran.vue`<br>(11 baris)        | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 26  | `app/pages/kertas-ukuran-self.vue`<br>(107 baris)  | `PaperSizeStatsWidgets.vue`, `PaperSizeRecordsTable.vue`, `PaperSizeFormModal.vue`, `SalesConfirmDelete.vue`                               | `usePaperSizesSelf()`<br>_(Aktif)_        | `/api/paper-sizes`<br>(`paperShopData.ts`)  | 🟢 **Relasional Penuh**<br>PK: `id`<br>dimension, numeric length/width                          | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 27  | `app/pages/komponen-fiks.vue`<br>(104 baris)       | `KomponenFiksRecordsTable.vue`, `KomponenFiksFormModal.vue`, `SalesListHeader.vue`, `SalesConfirmDelete.vue`                                | `useKomponenFiks()`<br>_(Aktif)_          | `/api/calculator-components/komponen-fiks`  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `category`, `unit`, numeric `hargaDasar`           | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 28  | `app/pages/komponen-minimum.vue`<br>(104 baris)    | `KomponenMinimumRecordsTable.vue`, `KomponenMinimumFormModal.vue`, `SalesListHeader.vue`, `SalesConfirmDelete.vue`                          | `useKomponenMinimum()`<br>_(Aktif)_       | `/api/calculator-components/komponen-minimum` | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `category`, `unit`, numeric `hargaDasar`        | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 29  | `app/pages/semua-toko-kertas.vue`<br>(10 baris)    | `CalculatorPartnersPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/partners`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerType`                                        | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 30  | `app/pages/semua-percetakan.vue`<br>(10 baris)     | `CalculatorPartnersPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/partners`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerType`                                        | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 31  | `app/pages/mesin-cetak.vue`<br>(11 baris)          | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 32  | `app/pages/mesin-laminasi.vue`<br>(11 baris)       | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 33  | `app/pages/mesin-pond.vue`<br>(11 baris)           | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 34  | `app/pages/mesin-poli.vue`<br>(11 baris)           | `CalculatorListingsPage.vue`, `CalculatorDetailDialog.vue`, `CalculatorManageDialog.vue`                                                   | `useCalculatorMarketplace()`<br>_(Aktif)_ | `/api/calculator/listings`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `partnerId`, `categoryId`                            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 35  | `app/pages/mesin-cetak-self.vue`<br>(12 baris)     | `WorkshopServicePage.vue`, `WorkshopServiceModal.vue`                                                                                      | `useWorkshopServices()`<br>_(Aktif)_      | `/api/workshop-services`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `storeId`, `category` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 36  | `app/pages/mesin-laminasi-self.vue`<br>(12 baris)  | `WorkshopServicePage.vue`, `WorkshopServiceModal.vue`                                                                                      | `useWorkshopServices()`<br>_(Aktif)_      | `/api/workshop-services`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `storeId`, `category` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 37  | `app/pages/mesin-pond-self.vue`<br>(12 baris)      | `WorkshopServicePage.vue`, `WorkshopServiceModal.vue`                                                                                      | `useWorkshopServices()`<br>_(Aktif)_      | `/api/workshop-services`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `storeId`, `category` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 38  | `app/pages/mesin-poli-self.vue`<br>(12 baris)      | `WorkshopServicePage.vue`, `WorkshopServiceModal.vue`                                                                                      | `useWorkshopServices()`<br>_(Aktif)_      | `/api/workshop-services`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `storeId`, `category` | 🟢 85-90% Decomposed | 🔵 VERIFIED |

---

### E. Products & Services Group

| No  | Rute / Template Page                              | Pecahan Komponen (Rama UI Standard)                                                                                                                                                       | Composable Domain                    | Endpoint & Service Backend            | Status Relasi Backend (DB-Ready)                                             |              Adopsi UI Rama               |   Status BRVS   |
| :-: | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------- | :---------------------------------------: | :-------------: |
| 39  | `app/pages/create-product.vue`<br>(13 baris)      | `ProductDocumentForm.vue`, `ProductInfoSection.vue`, `ProductPricingSection.vue`, `ProductAttributeModal.vue`, `ProductCategoryModal.vue`, `ProductVariationModal.vue`                    | `useProductEditor()`<br>_(Aktif)_    | `/api/products`<br>(`productData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `unitId`, `brandId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 40  | `app/pages/add-product-process.vue`<br>(112 baris)| `ProductProcessStatsWidgets.vue`, `ProductProcessRecordsTable.vue`, `ProductProcessFormModal.vue`, `SalesListHeader.vue`, `SalesConfirmDelete.vue`                                            | `useProductProcesses()`<br>_(Aktif)_ | `/api/product-processes`              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `productId` (products 1-5), `orderId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 41  | `app/pages/cetak-full-color.vue`<br>(80 baris)    | `CetakFullColorWorkspace.vue` (177 baris), section Product/Size/Paper/Workflow/Profit/Log, shared table/action/dialog/currency/feedback                                     | `useCetakFullColor()`<br>_(Aktif)_   | `/api/cetak-full-color` -> `server/utils/cetakFullColor.ts`               | 🟢 **Typed configuration v2**<br>PK stabil, workflow targets array, timestamps, numeric money, log output-only | 🟢 BRVS-UI verified; workspace orchestrator <200 | 🔵 VERIFIED (2026-10-11 API + browser desktop/390px) |
| 42  | `app/pages/calender.vue`<br>(77 baris)            | `CalendarWorkspace.vue` (211 baris), `CustomProductCardsGrid.vue`, `CalculationDetailModal.vue`, `CalculationLogTable.vue`, `SalesListHeader.vue`                                           | `useCalendarSettings()`<br>_(Aktif)_ | `/api/calendar-settings`              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `productId`, pricing config | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 43  | `app/pages/product-list.vue`<br>(100 baris)       | `ProductRecordsTable.vue`, `ProductImportModal.vue`, `CustomProductModal.vue`, `SalesListHeader.vue`                                                                                      | `useProducts()`<br>_(Aktif)_         | `/api/products`<br>(`productData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `unitId`, `brandId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 44  | `app/pages/product-details.vue`<br>(80 baris)     | `CalculationDetailModal.vue`, `CalculationLogTable.vue`                                                                                                                                   | `useProducts()`<br>_(Aktif)_         | `/api/products/[id]`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `unitId`            | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 45  | `app/pages/category.vue`<br>(14 baris)            | `CategoryWorkspace.vue` (45 baris), `CategoryTable.vue`, `CategoryModal.vue`                                                                                                              | `useCategories()`<br>_(Aktif)_       | `/api/categories`                     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId` / item relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 46  | `app/pages/sub-category.vue`<br>(14 baris)        | `SubCategoryWorkspace.vue` (45 baris), `SubCategoryTable.vue`, `SubCategoryModal.vue`                                                                                                     | `useSubCategories()`<br>_(Aktif)_    | `/api/sub-categories`                 | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`                      | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 47  | `app/pages/unit.vue`<br>(14 baris)                | `UnitWorkspace.vue` (45 baris), `UnitTable.vue`, `UnitModal.vue`                                                                                                                          | `useUnits()`<br>_(Aktif)_            | `/api/units`                          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId` / item relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 48  | `app/pages/variant.vue`<br>(14 baris)             | `VariantWorkspace.vue` (45 baris), `VariantTable.vue`, `VariantModal.vue`                                                                                                                 | `useVariants()`<br>_(Aktif)_         | `/api/variants`                       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId` / item relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |

---

### F. Setting Group (22 Rute - Monolithic Workspaces)

| No  | Rute / Template Page                                | Pecahan Komponen (Rama UI Standard)                                    | Composable Domain                   | Endpoint & Service Backend | Status Relasi Backend (DB-Ready)             |              Adopsi UI Rama               |   Status BRVS   |
| :-: | --------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------- | -------------------------- | -------------------------------------------- | :---------------------------------------: | :-------------: |
| 49  | `app/pages/company-setting.vue`<br>(19 baris)       | `CompanySettingWorkspace.vue` (231 baris), `CompanyLegalSection.vue`, `CompanyContactSection.vue`, `CompanyBrandingSection.vue`, `CompanyAddressSection.vue` | `useCompanySetting()`<br>_(Aktif)_  | `/api/company-setting`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 50  | `app/pages/email-setting.vue`<br>(19 baris)         | `EmailSettingWorkspace.vue` (200 baris), `EmailConfigForm.vue`, `EmailTestModal.vue`                                       | `useEmailSettings()`<br>_(Aktif)_   | `/api/email-settings/test` | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 51  | `app/pages/invoice-setting.vue`<br>(19 baris)       | `InvoiceSettingWorkspace.vue` (196 baris), `InvoicePreviewCard.vue`, `InvoiceSettingForm.vue`                             | `useInvoiceSettings()`<br>_(Aktif)_ | `/api/invoice-settings`    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 52  | `app/pages/prefixes.vue`<br>(19 baris)              | `PrefixesSettingWorkspace.vue` (196 baris)                                                                                 | `usePrefixes()`<br>_(Aktif)_        | `/api/prefixes`            | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 53  | `app/pages/tax-rates.vue`<br>(21 baris)             | `TaxRatesWorkspace.vue` (110 baris), `TaxRatesTable.vue`, `TaxRatesModal.vue`, `SalesConfirmDelete.vue`                   | `useTaxRates()`<br>_(Aktif)_         | `/api/tax-rates`           | 🟢 **Relasional Penuh**<br>PK: `id`<br>numeric rate, type, status           | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 54  | `app/pages/pos-settings.vue`<br>(19 baris)          | `PosSettingsWorkspace.vue` (224 baris), `PosReceiptPreview.vue`, `PosSettingForm.vue`                                     | `usePosSettings()`<br>_(Aktif)_     | `/api/pos-settings`        | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 55  | `app/pages/system-setting.vue`<br>(19 baris)        | `SystemSettingWorkspace.vue` (149 baris), `SystemIntegrationCard.vue`, `SystemIntegrationModal.vue`                      | `useSystemIntegrations()`<br>_(Aktif)_ | `/api/settings/system-integrations` | 🟢 **Relasional Penuh**<br>PK: `id`<br>provider, status, credentials | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 56  | `app/pages/custom-field.vue`<br>(19 baris)          | `CustomFieldWorkspace.vue` (110 baris), `CustomFieldTable.vue`, `CustomFieldModal.vue`, `SalesConfirmDelete.vue`           | `useCustomFields()`<br>_(Aktif)_ | `/api/custom-fields`       | 🟢 **Relasional Penuh**<br>PK: `id`<br>module, fieldType, validation        | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 57  | `app/pages/currency-settings.vue`<br>(19 baris)     | `CurrencySettingsWorkspace.vue` (219 baris), `SalesConfirmDelete.vue`                                                      | `useCurrencySettings()`<br>_(Aktif)_| `/api/currency-settings`   | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 58  | `app/pages/printer-settings.vue`<br>(19 baris)      | `PrinterSettingsWorkspace.vue` (214 baris), `SalesConfirmDelete.vue`                                                       | `usePrinterSettings()`<br>_(Aktif)_ | `/api/printer-settings`    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 59  | `app/pages/gdpr-settings.vue`<br>(19 baris)         | `GdprSettingsWorkspace.vue` (166 baris)                                                                                   | `useGdprSettings()`<br>_(Aktif)_    | `/api/gdpr-settings`       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 60  | `app/pages/security-settings.vue`<br>(19 baris)     | `SecuritySettingsWorkspace.vue` (215 baris), `SecurityItemsList.vue`, `SecurityPasswordModal.vue`, `SecurityContactModal.vue`, `SecurityDevicesModal.vue`, `SecurityActivityModal.vue`, `SalesConfirmDelete.vue` | `useSecuritySettings()`<br>_(Aktif)_ | `/api/settings/security` | 🟢 **Relasional Penuh**<br>PK: `id`<br>2FA, password, devices | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 61  | `app/pages/storage-settings.vue`<br>(19 baris)      | `StorageSettingsWorkspace.vue` (185 baris)                                                                                 | `useStorageSettings()`<br>_(Aktif)_ | `/api/storage-settings`    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 62  | `app/pages/bank-settings-grid.vue`<br>(19 baris)    | `BankSettingsGridWorkspace.vue` (207 baris), `SalesConfirmDelete.vue`                                                      | `useBankSettings()`<br>_(Aktif)_    | `/api/bank-settings`       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 63  | `app/pages/bank-settings-list.vue`<br>(19 baris)    | `BankSettingsListWorkspace.vue` (244 baris), `SalesConfirmDelete.vue`                                                      | `useBankSettings()`<br>_(Aktif)_    | `/api/bank-settings`       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 64  | `app/pages/ban-ip-address.vue`<br>(19 baris)        | `BanIpAddressWorkspace.vue` (110 baris), `BanIpTable.vue`, `BanIpModal.vue`, `SalesConfirmDelete.vue`                     | `useBanIp()`<br>_(Aktif)_          | `/api/settings/ban-ip`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>ipAddress, reason, status             | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 65  | `app/pages/sms-gateway.vue`<br>(19 baris)           | `SmsGatewayWorkspace.vue` (176 baris)                                                                                      | `useSmsGateway()`<br>_(Aktif)_      | `/api/sms-gateways`        | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 66  | `app/pages/payment-gateway.vue`<br>(19 baris)       | `PaymentGatewayWorkspace.vue` (193 baris)                                                                                  | `usePaymentGateways()`<br>_(Aktif)_ | `/api/payment-gateways`    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 67  | `app/pages/social-authentication.vue`<br>(19 baris) | `SocialAuthenticationWorkspace.vue` (156 baris), `SocialProviderCard.vue`, `SocialProviderModal.vue`                      | `useSocialAuth()`<br>_(Aktif)_ | `/api/settings/social-auth` | 🟢 **Relasional Penuh**<br>PK: `id`<br>provider, clientId, status | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 68  | `app/pages/appearance.vue`<br>(19 baris)            | `AppearanceWorkspace.vue` (175 baris)                                                                                      | `useAppearance()`<br>_(Aktif)_      | `/api/appearance`          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 69  | `app/pages/localization.vue`<br>(19 baris)          | `LocalizationWorkspace.vue` (139 baris), `LocalizationBasicSection.vue`, `LocalizationCurrencySection.vue`, `LocalizationFileSection.vue` | `useLocalizationSettings()`<br>_(Aktif)_ | `/api/settings/localization` | 🟢 **Relasional Penuh**<br>PK: `id`<br>language, currency, timezone | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 70  | `app/pages/preference.vue`<br>(19 baris)            | `PreferenceWorkspace.vue` (97 baris)                                                                                       | `usePreferences()`<br>_(Aktif)_     | `/api/preferences`         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 71  | `app/pages/profile.vue`<br>(19 baris)               | `ProfileWorkspace.vue` (234 baris), `ProfileAddressSection.vue`, `ProfileAvatarCard.vue`, `ProfilePasswordModal.vue`, `ProfilePersonalInfoSection.vue` | `useProfile()`<br>_(Aktif)_         | `/api/profile`             | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: setting module & system relation | 🟢 100% Full Decomposed | 🔵 VERIFIED |

---

### G. User Management Group

| No  | Rute / Template Page                           | Pecahan Komponen (Rama UI Standard)                                                         | Composable Domain                   | Endpoint & Service Backend                 | Status Relasi Backend (DB-Ready)                                    |      Adopsi UI Rama       | Status BRVS |
| :-: | ---------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- | :-----------------------: | :---------: |
| 72  | `app/pages/user.vue`<br>(19 baris)             | `MemberWorkspace.vue` (238 baris), `MemberRecordsTable.vue`, `MemberFormModal.vue`          | `useUsers()`<br>_(Aktif)_           | `/api/users`<br>(`userData.ts`)            | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `roleId`                 | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 73  | `app/pages/user-admin.vue`<br>(19 baris)       | `UserAdminWorkspace.vue` (211 baris), `UserAdminRecordsTable.vue`, `UserAdminFormModal.vue` | `useUserAdmins()`<br>_(Aktif)_      | `/api/user-admins`<br>(`userAdminData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `roleId`                 | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 74  | `app/pages/role.vue`<br>(19 baris)             | `RoleRecordsTable.vue`, `RoleFormModal.vue`                                                 | `useRoles()`<br>_(Aktif)_           | `/api/roles`<br>(`roleData.ts`)            | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `roleId`, `permissionId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 75  | `app/pages/role-permissions.vue`<br>(19 baris) | `RolePermissionsWorkspace.vue`<br>_(245 baris)_                                             | `useRolePermissions()`<br>_(Aktif)_ | `/api/roles/permissions`                   | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `roleId`, `permissionId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 76  | `app/pages/permissions.vue`<br>(19 baris)      | `PermissionsWorkspace.vue`, `PermissionMatrixWorkspace.vue`                                 | `usePermissions()`<br>_(Aktif)_     | `/api/permissions`                         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `roleId`, `permissionId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 77  | `app/pages/delete-account.vue`<br>(19 baris)   | `DeleteAccountWorkspace.vue`, `DeleteAccountRecordsTable.vue`                               | `useDeleteAccounts()`<br>_(Aktif)_  | `/api/delete-accounts`                     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `userId`                 | 🟢 85-90% Decomposed | 🔵 VERIFIED |

---

### H. Content Group

| No  | Rute / Template Page                         | Pecahan Komponen (Rama UI Standard)                                                                                                                                                              | Composable Domain                  | Endpoint & Service Backend          | Status Relasi Backend (DB-Ready)                                    |      Adopsi UI Rama       | Status BRVS |
| :-: | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------- | :-----------------------: | :---------: |
| 78  | `app/pages/all-blog.vue`<br>(19 baris)       | `AllBlogWorkspace.vue`, `BlogGrid.vue`, `BlogModal.vue`, `BlogFormModal.vue`                                                                                                                     | `useBlogs()`<br>_(Aktif)_          | `/api/blogs`<br>(`blogData.ts`)     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `authorId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 79  | `app/pages/blog-category.vue`<br>(19 baris)  | `BlogCategoryWorkspace.vue`, `BlogCategoryFormModal.vue`                                                                                                                                         | `useBlogCategories()`<br>_(Aktif)_ | `/api/blog-categories`              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 80  | `app/pages/blog-comment.vue`<br>(19 baris)   | `BlogCommentWorkspace.vue`, `BlogCommentModal.vue`                                                                                                                                               | `useBlogComments()`<br>_(Aktif)_   | `/api/blog-comments`                | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `blogId`, `userId`       | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 81  | `app/pages/blog-tag.vue`<br>(19 baris)       | `BlogTagWorkspace.vue`, `BlogTagFormModal.vue`                                                                                                                                                   | `useBlogTags()`<br>_(Aktif)_       | `/api/blog-tags`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 82  | `app/pages/faq.vue`<br>(19 baris)            | `FaqWorkspace.vue`, `FaqRecordsTable.vue`, `FaqFormModal.vue`, `FaqCategoryFormModal.vue`                                                                                                        | `useFaqs()`<br>_(Aktif)_           | `/api/faqs`<br>(`faqData.ts`)       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`             | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 83  | `app/pages/banner.vue`<br>(19 baris)         | `BannerWorkspace.vue`, `BannerRecordsTable.vue`, `BannerFormModal.vue`                                                                                                                           | `useBanners()`<br>_(Aktif)_        | `/api/banners`<br>(`bannerData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 84  | `app/pages/download-files.vue`<br>(19 baris) | `DownloadFilesWorkspace.vue`, `DownloadFileRecordsTable.vue`, `DownloadFileCardGrid.vue`, `DownloadFileFormModal.vue`, `CreateFolderModal.vue`, `UploadFileModal.vue`, `DownloadFileSidebar.vue` | `useDownloadFiles()`<br>_(Aktif)_  | `/api/download-files`               | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `folderId`, `userId`     | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 85  | `app/pages/our-client.vue`<br>(19 baris)     | `OurClientWorkspace.vue`, `ClientRecordsTable.vue`, `ClientFormModal.vue`                                                                                                                        | `useOurClients()`<br>_(Aktif)_     | `/api/our-clients`                  | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 86  | `app/pages/footer.vue`<br>(19 baris)         | `FooterWorkspace.vue`, `FooterRecordsTable.vue`, `FooterFormModal.vue`                                                                                                                           | `useFooters()`<br>_(Aktif)_        | `/api/footers`                      | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |
| 87  | `app/pages/language.vue`<br>(13 baris)       | `LanguageWorkspace.vue`, `LanguageRecordsTable.vue`, `LanguageFormModal.vue`                                                                                                                     | `useLanguages()`<br>_(Aktif)_      | `/api/languages`                    | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `categoryId`, `languageId`, `blogId` | 🟢 85-90% Decomposed | 🔵 VERIFIED |

---

### I. Report & Financial Group (17 Rute - Monolithic Workspaces)

| No  | Rute / Template Page                              | Pecahan Komponen (Rama UI Standard)                                       | Composable Domain                      | Endpoint & Service Backend      | Status Relasi Backend (DB-Ready)                      |              Adopsi UI Rama               |   Status BRVS   |
| :-: | ------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------- | ------------------------------- | ----------------------------------------------------- | :---------------------------------------: | :-------------: |
| 88  | `app/pages/profit-and-loss.vue`<br>(19 baris)     | `ProfitAndLossWorkspace.vue`<br>_(485 baris - Monolith Anti-Pattern)_     | `useProfitLossReports()`<br>_(Aktif)_  | `/api/reports/profit-loss`      | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |
| 89  | `app/pages/sales-report.vue`<br>(19 baris)        | `SalesReportWorkspace.vue`<br>_(380 baris - Monolith Anti-Pattern)_       | `useSalesReports()`<br>_(Aktif)_       | `/api/reports/sales`            | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |
| 90  | `app/pages/customer-report.vue`<br>(19 baris)     | `CustomerReportWorkspace.vue` (190 baris), `CustomerReportStatsWidgets.vue`, `CustomerReportDetailModal.vue`, `SalesDataTable.vue` | `useStakeholderReports()`<br>_(Aktif)_ | `/api/reports/customer`         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 91  | `app/pages/supplier-due-report.vue`<br>(19 baris) | `SupplierDueReportWorkspace.vue` (185 baris), `SupplierDueReportStatsWidgets.vue`, `SupplierDueReportDetailModal.vue`, `SalesDataTable.vue` | `useStakeholderReports()`<br>_(Aktif)_ | `/api/reports/supplier-due`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 92  | `app/pages/customer-due-report.vue`<br>(19 baris) | `CustomerDueReportWorkspace.vue` (185 baris), `CustomerDueReportStatsWidgets.vue`, `CustomerDueReportDetailModal.vue`, `SalesDataTable.vue` | `useStakeholderReports()`<br>_(Aktif)_ | `/api/reports/customer-due`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 93  | `app/pages/tax-report.vue`<br>(19 baris)          | `TaxReportWorkspace.vue` (195 baris), `TaxReportStatsWidgets.vue`, `SalesDataTable.vue` | `useFinancialReports()`<br>_(Aktif)_   | `/api/reports/tax`              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 94  | `app/pages/purchase-report.vue`<br>(19 baris)     | `PurchaseReportWorkspace.vue` (190 baris), `PurchaseReportStatsWidgets.vue`, `PurchaseReportDetailModal.vue`, `SalesDataTable.vue` | `usePurchaseReport()`<br>_(Aktif)_     | `/api/reports/purchase`         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 95  | `app/pages/annual-reports.vue`<br>(14 baris)      | `AnnualReportsWorkspace.vue` (150 baris), `AnnualReportsStatsWidgets.vue`, `AnnualReportsTable.vue`, `SalesDataTable.vue` | `useAnnualReports()`<br>_(Aktif)_      | `/api/reports/annual`           | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 96  | `app/pages/supplier-report.vue`<br>(12 baris)     | `SupplierReportWorkspace.vue` (195 baris), `SupplierReportStatsWidgets.vue`, `SupplierReportDetailModal.vue`, `SalesDataTable.vue` | `useSupplierReport()`<br>_(Aktif)_     | `/api/reports/supplier`         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 97  | `app/pages/expense-report.vue`<br>(14 baris)      | `ExpenseReportWorkspace.vue` (150 baris), `ExpenseReportStatsWidgets.vue`, `ExpenseReportTable.vue`, `SalesDataTable.vue` | `useExpenseReports()`<br>_(Aktif)_     | `/api/reports/expense`          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 98  | `app/pages/invoice-report.vue`<br>(14 baris)      | `InvoiceReportWorkspace.vue` (150 baris), `InvoiceReportStatsWidgets.vue`, `InvoiceReportTable.vue`, `SalesDataTable.vue` | `useInvoiceReport()`<br>_(Aktif)_      | `/api/reports/invoice`          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 99  | `app/pages/product-report.vue`<br>(14 baris)      | `ProductReportWorkspace.vue` (140 baris), `ProductReportStatsWidgets.vue`, `ProductReportTable.vue`, `SalesDataTable.vue` | `useProductReports()`<br>_(Aktif)_     | `/api/reports/product`          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 100 | `app/pages/income-report.vue`<br>(14 baris)       | `IncomeReportWorkspace.vue` (150 baris), `IncomeReportStatsWidgets.vue`, `IncomeReportTable.vue`, `SalesDataTable.vue` | `useIncomeReports()`<br>_(Aktif)_      | `/api/reports/income`           | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 101 | `app/pages/best-seller.vue`<br>(14 baris)         | `BestSellerWorkspace.vue`<br>_(320 baris - Monolith Anti-Pattern)_        | `useSalesReports()`<br>_(Aktif)_       | `/api/reports/best-seller`      | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |
| 102 | `app/pages/balance-sheet.vue`<br>(19 baris)       | `BalanceSheetWorkspace.vue`<br>_(340 baris - Monolith Anti-Pattern)_      | `useFinancialReports()`<br>_(Aktif)_   | `/api/accounting/balance-sheet` | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |
| 103 | `app/pages/account-statement.vue`<br>(19 baris)   | `AccountStatementWorkspace.vue`<br>_(310 baris - Monolith Anti-Pattern)_  | `useFinancialReports()`<br>_(Aktif)_   | `/api/accounting/statement`     | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |
| 104 | `app/pages/balance-account.vue`<br>(19 baris)     | `BalanceAccountWorkspace.vue`<br>_(310 baris - Monolith Anti-Pattern)_    | `useFinancialReports()`<br>_(Aktif)_   | `/api/accounting/balance`       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`, `categoryId` | 🟡 ~45% Monolithic Workspace (>250 baris) | 🟡 PARTIAL BRVS |

---

### J. HRM Group

| No  | Rute / Template Page                          | Pecahan Komponen (Rama UI Standard)                                                                                                                                                                                                       | Composable Domain                    | Endpoint & Service Backend                            | Status Relasi Backend (DB-Ready)                                           |     Adopsi UI Rama      | Status BRVS |
| :-: | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------- | :---------------------: | :---------: |
| 105 | `app/pages/employees.vue`<br>(12 baris)       | `EmployeeStatsWidgets.vue`, `EmployeeRecordsTable.vue`, `EmployeePageForm.vue` _(Single-Source)_, `EmployeeViewModal.vue`, `EmployeesWorkspace.vue` (105 baris)                                                                           | `useEmployees()`<br>_(Aktif)_        | `/api/employees`<br>(`employeeData.ts`)               | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `departmentId`, `designationId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 106 | `app/pages/employee-salary.vue`<br>(12 baris) | `EmployeeSalaryStatsWidgets.vue`, `EmployeeSalaryRecordsTable.vue`, `EmployeeSalaryViewModal.vue`, `EmployeeSalaryWorkspace.vue` (112 baris)                                                                                              | `useEmployeeSalaries()`<br>_(Aktif)_ | `/api/employee-salaries`<br>(`employeeSalaryData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`, numeric salary    | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 107 | `app/pages/payslip.vue`<br>(12 baris)         | `PayslipStatsWidgets.vue`, `PayslipRecordsTable.vue`, `PayslipFormModal.vue`, `PayslipWorkspace.vue` (118 baris)                                                                                                                          | `usePayslips()`<br>_(Aktif)_         | `/api/payslips`<br>(`payslipData.ts`)                 | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`, `payrollId`       | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 108 | `app/pages/department.vue`<br>(12 baris)      | `DepartmentStatsWidgets.vue`, `DepartmentRecordsTable.vue`, `DepartmentFormModal.vue`, `DepartmentWorkspace.vue` (98 baris)                                                                                                               | `useDepartments()`<br>_(Aktif)_      | `/api/departments`<br>(`departmentData.ts`)           | 🟢 **Relasional Penuh**<br>PK: `id`<br>name, code, departmentHead | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 109 | `app/pages/add-employee.vue`<br>(14 baris)    | `EmployeePageForm.vue` _(Single-Source Form dipakai bersama oleh Add & Edit)_                                                                                                                                                             | `useEmployees()`<br>_(Aktif)_        | `/api/employees`                                      | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `departmentId`, `designationId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 110 | `app/pages/edit-employee.vue`<br>(14 baris)   | `EmployeePageForm.vue` _(Single-Source Form dipakai bersama oleh Add & Edit)_                                                                                                                                                             | `useEmployees()`<br>_(Aktif)_        | `/api/employees`                                      | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `departmentId`, `designationId` | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 111 | `app/pages/add-payroll.vue`<br>(14 baris)     | `PayrollPageForm.vue` _(Single-Source Form dipakai bersama oleh Add & Edit)_                                                                                                                                                              | `useEmployeeSalaries()`<br>_(Aktif)_ | `/api/employee-salaries`                              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`                    | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 112 | `app/pages/edit-payroll.vue`<br>(14 baris)    | `PayrollPageForm.vue` _(Single-Source Form dipakai bersama oleh Add & Edit)_                                                                                                                                                              | `useEmployeeSalaries()`<br>_(Aktif)_ | `/api/employee-salaries`                              | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`                    | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 113 | `app/pages/payslip-detail.vue`<br>(14 baris)  | `PayslipDetailWorkspace.vue` (140 baris)                                                                                                                                                                                                  | `usePayslips()`<br>_(Aktif)_         | `/api/payslips`                                       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`                    | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 114 | `app/pages/designation.vue`<br>(14 baris)     | `DesignationTable.vue`, `DesignationModal.vue`, `DesignationWorkspace.vue` (88 baris)                                                                                                                                                     | `useDesignations()`<br>_(Aktif)_     | `/api/designations`<br>(`designationData.ts`)         | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `departmentId`                  | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 115 | `app/pages/my-incentive.vue`<br>(97 baris)    | `MyIncentiveStatsWidgets.vue`, `MyIncentiveRecordsTable.vue`, `MyIncentiveModal.vue`                                                                                                                                                      | `useMyIncentives()`<br>_(Aktif)_     | `/api/my-incentives`<br>(`incentiveData.ts`)          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`, numeric amount    | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 116 | `app/pages/incentive.vue`<br>(153 baris)      | `IncentiveTable.vue` _(Tailwind, `SalesActionButton`, `CurrencyDisplay`, `SalesStatusBadge`)_, `IncentiveModal.vue` _(`SalesDialog`, 12-col grid, `CurrencyInput`)_, `SalesListHeader.vue`, `SalesConfirmDelete.vue`, `SalesFeedback.vue` | `useIncentives()`<br>_(Aktif)_       | `/api/incentives`<br>(`incentiveData.ts`)             | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `employeeId`, numeric amount    | 🟢 100% Full Decomposed | 🔵 VERIFIED |

---

### K. Peoples Group

| No  | Rute / Template Page                        | Pecahan Komponen (Rama UI Standard)                                                                                                               | Composable Domain                 | Endpoint & Service Backend                       | Status Relasi Backend (DB-Ready)                                             |     Adopsi UI Rama      | Status BRVS |
| :-: | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- | :---------------------: | :---------: |
| 117 | `app/pages/supplier.vue`<br>(12 baris)      | `SupplierRecordsTable.vue`, `SupplierFormModal.vue`, `SupplierAddAddressModal.vue`, `SupplierWorkspace.vue` (115 baris)                           | `useSuppliers()`<br>_(Aktif)_     | `/api/suppliers`<br>(`supplierData.ts`)          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `addressId`, numeric limit        | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 118 | `app/pages/customers.vue`<br>(12 baris)     | `CustomerRecordsTable.vue`, `CustomerFormModal.vue`, `CustomerAddAddressModal.vue`, `CustomerViewModal.vue`, `CustomersWorkspace.vue` (125 baris) | `useCustomers()`<br>_(Aktif)_     | `/api/customers`<br>(`customerData.ts`)          | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerTypeId`, numeric balance | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 119 | `app/pages/address.vue`<br>(12 baris)       | `AddressStatsWidgets.vue`, `AddressRecordsTable.vue`, `AddressFormModal.vue`, `AddressViewModal.vue`, `AddressWorkspace.vue` (118 baris)          | `useAddresses()`<br>_(Aktif)_     | `/api/addresses`<br>(`addressData.ts`)           | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `customerId`, `supplierId`        | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 120 | `app/pages/store-list.vue`<br>(12 baris)    | `StoreListRecordsTable.vue`, `StoreListFormModal.vue`, `StoreListWorkspace.vue` (105 baris)                                                       | `useStoreLists()`<br>_(Aktif)_    | `/api/store-lists`<br>(`storeListData.ts`)       | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `branchId`                        | 🟢 100% Full Decomposed | 🔵 VERIFIED |
| 121 | `app/pages/customer-type.vue`<br>(12 baris) | `CustomerTypeRecordsTable.vue`, `CustomerTypeFormModal.vue`, `CustomerTypeWorkspace.vue` (98 baris)                                               | `useCustomerTypes()`<br>_(Aktif)_ | `/api/customer-types`<br>(`customerTypeData.ts`) | 🟢 **Relasional Penuh**<br>PK: `id`<br>FK: `discountPercent`                 | 🟢 100% Full Decomposed | 🔵 VERIFIED |

---

### L. Menu Belum Dikerjakan / Ditunda (Pending Scope)

| Grup Menu               | Daftar Halaman                                                                             |    Status Saat Ini    | Rencana Kerja                                              |
| ----------------------- | ------------------------------------------------------------------------------------------ | :-------------------: | ---------------------------------------------------------- |
| **Inventory & Stock**   | `expired-products`, `low-stocks`, `category-list`, `sub-categories`, `brand-list`, `units` |      ⚪ PENDING       | Dekomposisi ke `components/Pages/inventory/`               |
| **Finance & Cash**      | `bank-account`, `money-transfer`, `cash-advance`, `balance-account`, `account-statement`, `cash-flow`, `balance-sheet`, `input-tax`, `output-tax`, serta ledger `income`/`expenses` | Implemented, static verification passed | Browser CRUD/reload, rekonsiliasi, print/PDF, dan persistence verification |
| **Purchases**           | `purchase`, `purchase-order`, `purchase-return`, `purchase-item`, `purchase-category`      | ⚪ PENDING (Imported) | Audit validasi server, ID generation, legacy fidelity      |
| **Promo & Marketing**   | `discount`, `discount-plan`, `coupon`, `voucher`                                           |      🟡 PARTIAL       | Voucher passed; Discount Plan, Discount, dan Coupon pending |
| **POS (Point of Sale)** | `pos.vue`, `pos-order.vue`                                                                 |      ⚪ DITUNDA       | Sesuai instruksi pengguna, POS ditunda sampai diminta lagi |

---

## 4. WORKFLOW MENGERJAKAN MENU BARU (SOP STANDAR)

Jika pengguna memberikan instruksi:

> _"kerjakan menu <nama-menu>"_ atau _"lanjut ke menu <nama-menu>"_

Wajib ikuti alur kerja 6 langkah ini:

### Langkah 1: Analisis Acuan Asli

1. Buka file acuan di `legacy/static-source/<nama-menu>.html`.
2. Bandingkan dengan versi live di `https://dulank-admin.netlify.app/<nama-menu>.html`.
3. Catat persis: Judul, Subtitle, nama dan urutan kolom tabel, tombol aksi baris, filter toolbar, dan seluruh isian form modal tambah/edit.

### Langkah 2: Buat Lapisan Data Backend (Database-Ready)

1. Definisikan tipe TypeScript di `server/types/<nama-menu>.ts`.
2. Buat mock relational dataset di `server/data/<nama-menu>.json` (Primary Key `id`, Foreign Keys, nilai uang angka murni `number`).
3. Daftarkan dataset di `server/utils/bundledData.ts` untuk kompatibilitas serverless.
4. Buat endpoint tipis di `server/api/<nama-menu>/index.get.ts`, `index.post.ts`, dan `[id].delete.ts`.

### Langkah 3: Buat Composable Frontend

1. Buat `app/composables/use<NamaMenu>.ts`.
2. Kelola request melalui `useApiFetch()`/`apiFetch()` di composable, state `pending`, `error`, `refresh`, serta mutasi `save<Menu>()` dan `delete<Menu>()`. Page/component tetap tidak boleh memakai boundary request secara langsung.

### Langkah 4: Buat UI Responsibility Map dan Komponen Domain

1. Buat folder `app/components/Pages/<nama-menu>/`.
2. Petakan Header/Actions, Stats, Filters, Table/Grid/List, Form/Editor, Detail/History/Modal, dan Feedback sebagai tanggung jawab terpisah.
3. Buat komponen tabel: gunakan `<SalesDataTable>` (teks 14px `text-sm`, tinggi kontrol `h-9`).
4. Buat komponen form modal: form Add dan Edit **wajib disatukan** dalam satu file komponen (`mode="add" | "edit"`).
5. Pasang `<SalesConfirmDelete>` untuk dialog hapus, dan `<DocumentPrintModal>` untuk cetak/PDF.
6. Audit `*Workspace.vue`: target maksimal 150 baris; di atas 200 baris wajib decomposition audit dan di atas 300 baris structural review.

### Langkah 5: Buat Halaman Tipis (Thin Page Shell)

1. Tulis `app/pages/<nama-menu>.vue` dengan batas $\le 19$ baris kode murni wrapper.
2. Gunakan pembungkus `<div class="dulank-page dulank-page-<nama-menu>">`.

### Langkah 6: Catat ke Dokumentasi Matrix Ini

1. Tambahkan baris menu tersebut pada tabel di atas.
2. Update baris kode, nama komponen, composable, API/service/data, dan status sesuai evidence. Jangan otomatis memakai `VERIFIED`.
3. Catat ringkasan perubahannya di `AI_HANDOVER_GUIDE.md` dan `docs/obsidian-vault/09-CHANGELOG.md`.
4. Catat branch, commit status, push status, dan remote verification. Default perubahan baru adalah `NOT COMMITTED` / `NOT PUSHED`.

---

## 5. PROSES CHECKING OTOMATIS (QA CHECKLIST & TEST SCRIPT)

Sebelum menyebut suatu halaman "selesai", jalankan **5-Step Quality Check** berikut:

### Checklist Verifikasi Kualitas

- [ ] **Check 1 (Page Line Budget):** Apakah `app/pages/<menu>.vue` di bawah 150 baris (target 12–19 baris)?
- [ ] **Check 2 (Zero Browser Dialogs):** Apakah file bebas dari `confirm()` dan `alert()` native?
- [ ] **Check 3 (Single-Source Form):** Apakah modal Add dan Edit memakai komponen form yang sama?
- [ ] **Check 4 (Monetary Standard):** Apakah semua nilai uang berformat angka murni dan ditampilkan via `<CurrencyDisplay>` / `formatIDR()`?
- [ ] **Check 5 (Live HTTP 200):** Apakah halaman merender status HTTP 200 OK di browser / server?
- [ ] **Check 6 (UI Responsibility Split):** Apakah page dan Workspace hanya orchestrator, sementara Header/Filters/Table/Form/Modal dipisah sesuai tanggung jawab?
- [ ] **Check 7 (BRVS Chain):** Apakah composable, API, domain service/repository, type, dan data benar-benar terhubung?
- [ ] **Check 8 (Delivery Record):** Apakah changelog mencatat commit dan push status berdasarkan bukti?

### Skrip Uji Otomatis (Node.js)

Jalankan skrip berikut di terminal untuk menguji seluruh rute secara objektif:

```powershell
node -e "
import http from 'http';
import fs from 'fs';

const targetRoutes = ['cart', 'employees', 'company-setting', 'sales', 'quotation'];

async function runAudit() {
  console.log('--- 1. AUDIT JUMLAH BARIS PAGE ---');
  for (const r of targetRoutes) {
    const file = 'app/pages/' + r + '.vue';
    if (fs.existsSync(file)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n').length;
      const status = lines <= 19 ? 'EXCELLENT' : lines <= 150 ? 'PASS' : 'VIOLATION (>150)';
      console.log(r + ': ' + lines + ' baris [' + status + ']');
    } else {
      console.log(r + ': FILE NOT FOUND');
    }
  }

  console.log('\n--- 2. AUDIT STATUS LIVE HTTP 200 ---');
  for (const r of targetRoutes) {
    await new Promise(res => {
      http.get('http://localhost:3000/' + r, response => {
        console.log('/' + r + ' -> HTTP ' + response.statusCode);
        res();
      }).on('error', err => {
        console.error('/' + r + ' -> ERROR: ' + err.message);
        res();
      });
    });
  }
}
runAudit();
"
```

---

## 5. DAFTAR PRIORITAS TO-DO NEXT (ROADMAP PENYELESAIAN RIIL KODE AKTUAL)

Berdasarkan hasil audit kode riil dan perbaikan build tanggal **2026-10-09**, berikut adalah urutan prioritas pengerjaan berikutnya:

### Prioritas 1: Verifikasi dan Penyelesaian Finance & Cash
Rantai Finance utama sudah diimplementasikan: type, relational JSON/bundled source, API tipis, domain service, composable, leaf component, dan page shell untuk Bank Account/Type, Money Transfer, Cash Advance, Balance Account, Account Statement, Cash Flow, Balance Sheet, Input Tax, dan Output Tax.
1. **Runtime Finance:** uji Add/Edit/View/Delete, insufficient balance, paired transfer ledger, Cash Advance payment guard, source transaction Tax, reload persistence, empty state, print/PDF, desktop, dan 390px.
2. **`expenses.vue`** (Saat ini: 200 baris) & **`expense-category.vue`** (Saat ini: 178 baris)
   - Acuan: `legacy/static-source/expenses.html`, `legacy/static-source/expense-category.html`
   - Dekomposisi tabel dan modal form ke leaf components terpisah di `app/components/Pages/expenses/` dan `app/components/Pages/expense-category/`
   - Hubungkan ke backend API `/api/expenses` dan `/api/expense-categories`
3. **`income.vue`** (199 baris)
   - Ledger/account relation sudah aktif; ekstrak koordinasi page tersisa agar kembali di bawah 150 baris.

### Prioritas 2: Perbaikan Halaman Over-limit (Hard Fail > 300 Baris)
1. **`edit-job-order.vue`** selesai: 32 baris, dengan UI dan state dipisah berdasarkan tanggung jawab.
   - Acuan: `legacy/static-source/edit-job-order.html`
   - Ekstrak form rincian spesifikasi cetak, finishing, dan mutasi job order ke komponen domain `JobOrderForm.vue` / sub-sections terpisah.
   - Bersihkan dari page shell agar lolos Architecture Gate BRVS ($\le 150$ baris).

### Prioritas 3: Calculator Apps (Penyelesaian Komponen Leaf Tersisa)
1. **`harga-jasa-lainya.vue`**, **`komponen-minimum.vue`**, **`komponen-fiks.vue`**
   - Memastikan integrasi penuh menggunakan leaf components di `app/components/Pages/Calculator/Components/` dan composable API terkait.
   - Evaluasi penghapusan aman untuk 7 workspace monolitik usang di `app/components/Pages/Calculator/`.

### Prioritas 4: Inventory & Products Sisa
1. **`category-list.vue`**, **`sub-categories.vue`**, **`brand-list.vue`**, **`units.vue`**, **`variant.vue`**
2. **`expired-products.vue`**, **`low-stocks.vue`**

---



## Fondasi data Laravel ? 20 Oktober 2026

- Scope: tahap 1 audit database aktif + backup yang diuji restore; tahap 2 kontrak data + kompatibilitas klasifikasi produk; seeder master contoh. Tidak menyelesaikan seluruh transaksi/BRVS aplikasi.
- Backend: `dulank:audit-data`, `config/data_contracts.php`, PRD bagian 14, migration nullable `product_type`, enum `ProductType`, helper `ProductPricingContract`, validasi kode produk dan kategori/subkategori. Master ID dan nomor dokumen tetap dibedakan; respons API existing dipertahankan dengan tambahan productType.
- Frontend: product editor mengirim productType dan priceType terpisah, tidak memulai dengan stok/harga/varian warna contoh, subkategori sesuai induk; Variable Product/Large Format memfilter jenis yang benar. Normalisasi status bahasa mengatasi error typecheck existing di useLanguages.
- Seeder: `DemoMasterDataSeeder` terpisah dari DatabaseSeeder; hanya local/testing; transaction, provenance source=demo, tidak menimpa record existing/hasil edit, menolak benturan kode demo tanpa provenance. Dataset menambah 175 record master terkait, termasuk 2 cabang, 8 pelanggan, 4 supplier, 6 karyawan, 8 produk; tanpa transaksi, saldo atau stok awal. Promo dan akun contoh nonaktif.
- Audit MySQL: 133 tabel, backup berhasil dipulihkan dan jumlah seluruh tabel cocok. Hash record awal diverifikasi pada 127 tabel bisnis tanpa perubahan; pengulangan seed tidak mengubah jumlah record. Audit akhir 0 error dan 14 kategori warning (relasi data lama, user_admins kosong, FK barang pembelian/varian belum tersedia).
- Architecture evidence: route/komponen katalog existing -> useProductEditor/useProducts -> Laravel ProductController -> validasi/enum/helper -> products/relasi. Nuxt proxy dipakai, bukan Nitro JSON lama. Kontrak domain lain ditetapkan dalam PRD; migrasi seluruh flow belum dilakukan.
- UI responsibility evidence: tidak mengubah markup/layout atau memindahkan tanggung jawab ke page/Workspace; perubahan di composable dan tipe API. Belum ada verifikasi browser desktop/mobile.
- Check 1: uji FK induk, tipe harga/jenis produk, kode duplikat, API master terisi. Check 2: seed ulang, preserve edit pengguna, rollback provenance rusak/benturan kode, production guard, audit read-only dan tanpa PII.
- Validation: suite Pest backend penuh, Pint, Nuxt build, typecheck, structure validator dan diff check; rincian akhir pada changelog. `test:sales` tidak tersedia dalam package.json. Status fondasi implemented/API-tested; browser verification pending, bukan approved baseline.
- Git: branch Rama; NOT COMMITTED; NOT PUSHED; remote verification tidak dijalankan.


### Validasi akhir fondasi 20 Oktober 2026

Pest backend penuh PASS: 189 tes / 2.014 assertion. Pint PASS, Nuxt production build PASS, typecheck PASS, structure validator PASS (1.220 file / 0 failure), diff check kedua repo PASS. Audit database lokal setelah seed ulang: 133 tabel / 36 migration, 0 error / 14 kategori warning; jumlah record tetap. Browser belum diuji karena inventory apps/browsers kosong. Tidak ada klaim seluruh flow siap produksi. `test:sales` tidak tersedia. Tahap 1 audit/cadangan selesai; tahap 2 aturan kontrak dan fondasi katalog selesai pada cakupan tercatat, penerapan seluruh domain masih bertahap. Branch Rama; NOT COMMITTED / NOT PUSHED.


### Penghapusan data contoh atas permintaan pengguna ? 20 Oktober 2026

175 record yang dibuat DemoMasterDataSeeder dan 175 pemetaan source=demo telah dihapus dari database lokal dalam satu transaksi. Snapshot sebelum penghapusan disimpan di storage/app/private/backups/before-remove-demo-20261020-203138.snapshot. Perbandingan hash seluruh 133 tabel membuktikan record selain target demo tidak berubah; sisa pemetaan demo nol. Master yang sudah ada sebelum seeder tetap dipertahankan. File seeder, migration product_type, dan implementasi kontrak tetap tersedia. Catatan seed sebelumnya adalah riwayat, bukan keadaan database saat ini. Tidak menjalankan ulang seeder. Branch Rama; NOT COMMITTED / NOT PUSHED. Validasi: integritas row sebelum/sesudah penghapusan, bukan perubahan kode; build/tes tidak diulang.
