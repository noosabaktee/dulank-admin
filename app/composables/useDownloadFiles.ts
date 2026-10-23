import type { DownloadFileItem, DownloadFileFormData } from '#server/types/download-file'

interface ResponseData {
  success: boolean
  data: DownloadFileItem[]
  message?: string
}

interface MutationResponse {
  success: boolean
  data?: DownloadFileItem
  message?: string
}

/**
 * File unduhan — backend Laravel `/api/v1/admin/download-files`.
 * Penanda favorit/pinned bersifat lokal (kolom tidak ada di backend).
 */
export function useDownloadFiles() {
  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/download-files', {
    key: 'download-files-list'
  })

  const files = computed<DownloadFileItem[]>(() => data.value?.data ?? [])

  const saveFile = async (payload: DownloadFileFormData & { isFavorite?: boolean; isPinned?: boolean }) => {
    const { id, file, ...values } = payload
    let body: FormData | typeof values = values
    if (file) {
      const multipart = new FormData()
      for (const [key, value] of Object.entries(values)) {
        if (value !== undefined && value !== null && value !== '') multipart.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value))
      }
      multipart.append('file', file)
      body = multipart
    }
    const res = await apiFetch<MutationResponse>(id ? `/api/v1/admin/download-files/${encodeURIComponent(id)}` : '/api/v1/admin/download-files', {
      method: id ? 'PUT' : 'POST', body
    })

    await refresh()
    return res
  }

  const deleteFile = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(
      `/api/v1/admin/download-files/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    )

    await refresh()
    return res
  }

  const toggleFavorite = async (item: DownloadFileItem) => {
    await saveFile({ id: item.id, name: item.name, category: item.category, isFavorite: !item.isFavorite })
  }

  return {
    files,
    pending,
    error,
    refresh,
    saveFile,
    deleteFile,
    toggleFavorite
  }
}