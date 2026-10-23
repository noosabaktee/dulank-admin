<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DownloadFileItem, DownloadFileFormData } from '#server/types/download-file'
import { useDownloadFiles } from '~/composables/useDownloadFiles'
import { useTablePrint } from '~/composables/useTablePrint'
import DownloadFilesContent from '~/components/Pages/DownloadFiles/DownloadFilesContent.vue'
import DownloadFilesModals from '~/components/Pages/DownloadFiles/DownloadFilesModals.vue'
import SalesListHeader from '~/components/Sales/SalesListHeader.vue'
import FeatherIcon from '~/components/Common/FeatherIcon.vue'

const { files, pending, error, refresh, saveFile, deleteFile, toggleFavorite } = useDownloadFiles()

// Controls & Filters
const ownedFilter = ref('Owned By Me')
const sortBy = ref('Sort by Date')
const recentFilter = ref('Recent')
const fileTypeFilter = ref('All File types')
const searchQuery = ref('')
const isSidebarOpen = ref(true)
const isBusy = ref(false)
const toastMessage = ref('')
const currentPageFiles = ref<DownloadFileItem[]>([])

const { isPrintModalOpen, defaultPrintAction, openPrintModal, closePrintModal } = useTablePrint()
const printColumns = [
  { key: 'name', label: 'Name' },
  { key: 'lastModified', label: 'Last Modified', align: 'center' as const },
  { key: 'size', label: 'Size', align: 'right' as const },
  { key: 'ownedBy', label: 'Owned Member' },
  { key: 'category', label: 'Category' },
  { key: 'fileType', label: 'File Type', align: 'center' as const },
  { key: 'downloadCount', label: 'Downloads', align: 'right' as const },
]

function showToast(msg: string) {
  toastMessage.value = msg
  setTimeout(() => {
    toastMessage.value = ''
  }, 3500)
}

// Separate files into Pinned (Top Section "Files") and All Files (Bottom Section)
const pinnedFiles = computed(() => files.value.filter(f => f.isPinned))

const tableFiles = computed(() => {
  let list = files.value.filter(f => !f.isPinned)
  if (list.length === 0) list = files.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.ownedBy && item.ownedBy.toLowerCase().includes(q))
    )
  }

  if (fileTypeFilter.value !== 'All File types') {
    const ft = fileTypeFilter.value.toLowerCase()
    list = list.filter(item => {
      if (ft === 'folders') return item.fileType === 'folder'
      if (ft === 'pdf') return item.fileType === 'pdf'
      if (ft === 'images') return item.fileType === 'image'
      if (ft === 'videos') return item.fileType === 'video'
      if (ft === 'audios') return item.fileType === 'audio'
      if (ft === 'excel') return item.fileType === 'excel'
      return true
    })
  }

  if (sortBy.value === 'Sort By Size') {
    list = [...list].sort((a, b) => (parseFloat(b.size) || 0) - (parseFloat(a.size) || 0))
  } else if (sortBy.value === 'Order Ascending') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'Order Descending') {
    list = [...list].sort((a, b) => b.name.localeCompare(a.name))
  }

  return list
})

// Modals state
const isUploadModalOpen = ref(false)
const isCreateFolderModalOpen = ref(false)
const isEditModalOpen = ref(false)
const activeFileForEdit = ref<DownloadFileItem | null>(null)
const fileToDelete = ref<DownloadFileItem | null>(null)

async function handleUploadSubmit(formData: DownloadFileFormData) {
  isBusy.value = true
  try {
    const res = await saveFile(formData)
    isUploadModalOpen.value = false
    showToast(res?.message || 'File berhasil diunggah')
  } catch (err: any) {
    showToast(err?.data?.message || err?.message || 'Gagal mengunggah file')
  } finally {
    isBusy.value = false
  }
}

async function handleCreateFolderSubmit(folderName: string) {
  isBusy.value = true
  try {
    const res = await saveFile({
      name: folderName,
      category: 'Folders',
      fileType: 'folder',
      size: '0 KB',
      uploadedBy: 'Me',
      ownedBy: 'Me',
    })
    isCreateFolderModalOpen.value = false
    showToast(res?.message || `Folder '${folderName}' berhasil dibuat`)
  } catch (err: any) {
    showToast(err?.data?.message || err?.message || 'Gagal membuat folder')
  } finally {
    isBusy.value = false
  }
}

async function handleEditSubmit(formData: DownloadFileFormData) {
  isBusy.value = true
  try {
    const res = await saveFile(formData)
    isEditModalOpen.value = false
    showToast(res?.message || 'File berhasil diperbarui')
  } catch (err: any) {
    showToast(err?.data?.message || err?.message || 'Gagal memperbarui file')
  } finally {
    isBusy.value = false
  }
}

async function confirmDelete() {
  if (!fileToDelete.value) return
  isBusy.value = true
  try {
    await deleteFile(fileToDelete.value.id)
    showToast(`File '${fileToDelete.value.name}' berhasil dihapus`)
    fileToDelete.value = null
  } catch (err: any) {
    showToast(err?.data?.message || err?.message || 'Gagal menghapus file')
  } finally {
    isBusy.value = false
  }
}

async function handleToggleFavorite(item: DownloadFileItem) {
  try {
    await toggleFavorite(item)
    showToast(item.isFavorite ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit')
  } catch (err: any) {
    showToast('Gagal mengubah status favorit')
  }
}

function handleDownload(item: DownloadFileItem) {
  if (item.fileUrl) {
    window.open(item.fileUrl, '_blank', 'noopener,noreferrer')
  } else {
    showToast('Gagal mengunduh: berkas belum tersedia. Unggah berkas terlebih dahulu.')
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Success Toast Notification -->
    <ActionToast :message="toastMessage" @dismiss="toastMessage = ''" />

    <SalesListHeader
      title="Download Files"
      subtitle="Manage your files"
      :refreshing="pending"
      @refresh="refresh()"
      @print="openPrintModal('print')"
      @pdf="openPrintModal('pdf')"
    >
      <template #actions>
        <div class="relative inline-flex items-center">
          <select
            v-model="ownedFilter"
            class="h-9 rounded-md border border-gray-200 bg-white pl-8 pr-7 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option>Owned By Me</option>
            <option>Owned by Anyone</option>
            <option>Not Owned by Me</option>
          </select>
          <FeatherIcon
            name="sliders"
            :size="14"
            class="pointer-events-none absolute left-2.5 text-gray-400"
          />
        </div>
        <button
          type="button"
          class="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          @click="isUploadModalOpen = true"
        >
          <FeatherIcon name="upload" :size="15" />
          <span>Upload Files</span>
        </button>
      </template>
    </SalesListHeader>

    <!-- Divider line with collapse toggle circle button -->
    <div class="relative border-t border-gray-200 dark:border-gray-800 my-2">
      <button
        type="button"
        class="absolute -top-3.5 left-4 flex size-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 transition"
        :title="isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        @click="isSidebarOpen = !isSidebarOpen"
      >
        <FeatherIcon
          :name="isSidebarOpen ? 'chevron-left' : 'chevron-right'"
          :size="14"
        />
      </button>
    </div>

    <!-- Main Content Area: 2 Columns using DownloadFilesContent -->
    <DownloadFilesContent
      :files="files"
      :pinned-files="pinnedFiles"
      :table-files="tableFiles"
      :pending="pending"
      :is-sidebar-open="isSidebarOpen"
      :search-query="searchQuery"
      :sort-by="sortBy"
      :recent-filter="recentFilter"
      :file-type-filter="fileTypeFilter"
      @update:search-query="searchQuery = $event"
      @update:sort-by="sortBy = $event"
      @update:recent-filter="recentFilter = $event"
      @update:file-type-filter="fileTypeFilter = $event"
      @upload-file="isUploadModalOpen = true"
      @upload-folder="isUploadModalOpen = true"
      @create-folder="isCreateFolderModalOpen = true"
      @toggle-favorite="handleToggleFavorite"
      @download="handleDownload"
      @delete="fileToDelete = $event"
      @edit="activeFileForEdit = $event; isEditModalOpen = true"
      @current-page-items="currentPageFiles = $event"
    />

    <!-- Modals Container -->
    <DownloadFilesModals
      :is-upload-modal-open="isUploadModalOpen"
      :is-create-folder-modal-open="isCreateFolderModalOpen"
      :is-edit-modal-open="isEditModalOpen"
      :file-to-delete="fileToDelete"
      :active-file-for-edit="activeFileForEdit"
      :is-busy="isBusy"
      :is-print-modal-open="isPrintModalOpen"
      :print-columns="printColumns"
      :table-files="tableFiles"
      :current-page-files="currentPageFiles"
      :default-print-action="defaultPrintAction"
      @close-upload="isUploadModalOpen = false"
      @close-create-folder="isCreateFolderModalOpen = false"
      @close-edit="isEditModalOpen = false"
      @close-delete="fileToDelete = null"
      @close-print="closePrintModal"
      @submit-upload="handleUploadSubmit"
      @submit-create-folder="handleCreateFolderSubmit"
      @submit-edit="handleEditSubmit"
      @confirm-delete="confirmDelete"
    />
  </div>
</template>
