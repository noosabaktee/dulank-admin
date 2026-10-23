<script setup lang="ts">
import type { DownloadFileFormData } from '#server/types/download-file'
import FeatherIcon from '~/components/Common/FeatherIcon.vue'

const props = defineProps<{
  open: boolean
  busy?: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [formData: DownloadFileFormData]
}>()

interface QueueItem {
  file: File
  id: string
  name: string
  size: string
  fileType: DownloadFileFormData['fileType']
  icon: string
  progress: number
  isUploading: boolean
  completed: boolean
}

const queue = ref<QueueItem[]>([])
const isDraggingOver = ref(false)
const errorMessage = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

// Computed reactive stats
const completedCount = computed(() => {
  return queue.value.filter(item => item.completed || item.progress >= 100).length
})

const totalCount = computed(() => queue.value.length)

const overallProgress = computed(() => {
  if (queue.value.length === 0) return 0
  const sum = queue.value.reduce((acc, cur) => acc + cur.progress, 0)
  return Math.round(sum / queue.value.length)
})

const counterText = computed(() => {
  if (totalCount.value === 0) return '0 files Uploaded'
  return `${completedCount.value} of ${totalCount.value} files Uploaded`
})

function removeItem(id: string) {
  queue.value = queue.value.filter(item => item.id !== id)
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    addFiles(input.files)
  }
}

function handleDrop(e: DragEvent) {
  isDraggingOver.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    addFiles(e.dataTransfer.files)
  }
}

function addFiles(fileList: FileList | File[]) {
  Array.from(fileList).slice(0, 1).forEach(file => {
    if (file.size > 10 * 1024 * 1024) { errorMessage.value = 'Ukuran maksimal 10 MB.'; return }
    errorMessage.value = ''
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    let fType: DownloadFileFormData['fileType'] = 'file'
    let icon = '/assets/img/icons/pdf-02.svg'

    if (ext === 'pdf') {
      fType = 'pdf'
      icon = '/assets/img/icons/pdf-02.svg'
    } else if (['xls', 'xlsx', 'csv'].includes(ext)) {
      fType = 'excel'
      icon = '/assets/img/icons/xls.svg'
    } else if (['mp4', 'mkv', 'avi'].includes(ext)) {
      fType = 'video'
      icon = '/assets/img/icons/video.svg'
    } else if (['mp3', 'wav'].includes(ext)) {
      fType = 'audio'
      icon = '/assets/img/icons/audio.svg'
    } else if (['zip', 'rar', '7z'].includes(ext)) {
      fType = 'archive'
      icon = '/assets/img/icons/folder.svg'
    }

    const mbSize = (file.size / (1024 * 1024)).toFixed(1)
    const sizeStr = file.size >= 1024 * 1024 ? `${mbSize} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`

    const newItem: QueueItem = {
      file,
      id: `q-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: sizeStr,
      fileType: fType,
      icon,
      progress: 0,
      isUploading: false,
      completed: false,
    }

    queue.value = [newItem]
  })
}

function handleSubmit() {
  if (queue.value.length === 0) {
    errorMessage.value = 'Tidak ada berkas dalam antrean untuk diunggah'
    return
  }
  errorMessage.value = ''
  // Ambil file pertama atau file terbaru dalam antrean
  const itemToSubmit = queue.value[queue.value.length - 1]
  if (!itemToSubmit) return
  emit('submit', {
    file: itemToSubmit.file,
    name: itemToSubmit.name,
    category: itemToSubmit.fileType === 'excel' ? 'Excel' : (itemToSubmit.fileType === 'pdf' ? 'PDF' : (itemToSubmit.fileType === 'video' ? 'Videos' : (itemToSubmit.fileType === 'audio' ? 'Audios' : 'General'))),
    size: itemToSubmit.size,
    fileType: itemToSubmit.fileType,
    uploadedBy: 'Me',
    ownedBy: 'Me',
  })
}

watch(() => props.open, (open) => {
  if (open) { queue.value = []; errorMessage.value = '' }
})
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    />

    <!-- Dialog Box -->
    <div class="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <h5 class="text-base font-bold text-gray-900 dark:text-gray-100">Upload File</h5>
        <button
          type="button"
          class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
          @click="$emit('close')"
        >
          <FeatherIcon name="x" :size="18" />
        </button>
      </div>

      <div class="space-y-4 pt-4">
        <!-- Error Alert -->
        <div v-if="errorMessage" class="rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
          {{ errorMessage }}
        </div>

        <!-- Drag & Drop Zone -->
        <label
          class="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition cursor-pointer"
          :class="isDraggingOver ? 'border-[#F97316] bg-orange-50/20' : 'border-gray-200 hover:border-[#F97316] dark:border-gray-700'"
          @dragover.prevent="isDraggingOver = true"
          @dragleave.prevent="isDraggingOver = false"
          @drop.prevent="handleDrop"
        >
          <img src="/assets/img/icons/drag-drop.svg" alt="Upload" class="size-10 mb-2 object-contain" />
          <p class="text-xs text-gray-600 dark:text-gray-400">
            Drag and drop a <span class="font-semibold text-[#F97316] underline">file to upload</span>
          </p>
          <input
            ref="fileInputRef"
            type="file"

            class="hidden"
            @change="handleFileSelect"
          />
        </label>

        <!-- Dynamic Upload Status Bar -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-medium">
            <span>{{ busy ? 'Mengunggah berkas...' : 'Pilih satu berkas, maksimal 10 MB' }}</span>
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ overallProgress }}%</span>
          </div>
          <!-- Main Progress Bar -->
          <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              class="h-full rounded-full bg-emerald-500 transition-all duration-300"
              :style="{ width: `${overallProgress}%` }"
            ></div>
          </div>
        </div>

        <!-- Empty Queue State -->
        <div
          v-if="queue.length === 0"
          class="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-100 dark:border-gray-800 rounded-xl"
        >
          Belum ada berkas dalam antrean upload. Seret file atau klik area di atas.
        </div>

        <!-- Uploaded files queue list -->
        <ul v-else class="divide-y divide-gray-100 text-xs dark:divide-gray-800 max-h-56 overflow-y-auto pr-1">
          <li
            v-for="item in queue"
            :key="item.id"
            class="flex items-center justify-between py-2.5 gap-3"
          >
            <!-- Left Info -->
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <img :src="item.icon" alt="icon" class="size-6 object-contain shrink-0" />
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <span class="truncate font-semibold text-gray-800 dark:text-gray-200" :title="item.name">
                    {{ item.name }}
                  </span>
                  <FeatherIcon
                    v-if="item.completed || item.progress >= 100"
                    name="check-circle"
                    :size="13"
                    class="text-emerald-500 shrink-0"
                  />
                </div>
                <span class="text-xs text-gray-400">{{ item.size }}</span>

                <!-- Mini Progress Bar on in-progress file (Matches template) -->
                <div
                  v-if="!item.completed && item.progress < 100"
                  class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 mt-1"
                >
                  <div
                    class="h-full bg-rose-500 rounded-full transition-all duration-300"
                    :class="busy ? 'w-full animate-pulse' : 'w-0'"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Right Actions (Trash + Pause/Play) -->
            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                class="text-rose-500 hover:text-rose-700 p-1 rounded transition"
                title="Hapus dari antrean"
                @click="removeItem(item.id)"
              >
                <FeatherIcon name="trash-2" :size="14" />
              </button>

              <FeatherIcon v-if="busy" name="loader" :size="16" class="animate-spin" />
            </div>
          </li>
        </ul>
      </div>

      <!-- Footer Buttons -->
      <div class="mt-6 flex items-center justify-end gap-2.5 border-t border-gray-100 pt-4 dark:border-gray-800">
        <button
          type="button"
          class="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          :disabled="busy"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="rounded-xl bg-[#F97316] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#EA580C] disabled:opacity-50 transition"
          :disabled="busy"
          @click="handleSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
