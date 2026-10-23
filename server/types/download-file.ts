export interface DownloadFileItem {
  id: string
  name: string
  category: string
  size: string
  downloadCount: number
  uploadedDate: string
  fileType: 'pdf' | 'excel' | 'image' | 'video' | 'audio' | 'folder' | 'word' | 'archive' | 'file'
  fileUrl?: string
  uploadedBy?: string
  lastModified?: string
  ownedBy?: string
  ownedAvatar?: string
  membersCount?: number
  isFavorite?: boolean
  isPinned?: boolean
}

export interface DownloadFileFormData {
  file?: File
  isFavorite?: boolean
  isPinned?: boolean
  id?: string
  name: string
  category: string
  size?: string
  fileType?: 'pdf' | 'excel' | 'image' | 'video' | 'audio' | 'folder' | 'word' | 'archive' | 'file'
  fileUrl?: string
  uploadedBy?: string
  ownedBy?: string
  membersCount?: number
}
