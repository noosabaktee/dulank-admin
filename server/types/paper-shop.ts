export interface PaperGroup {
  id: string
  partnerId?: string | null
  name: string
  merk: string
  priceType: 'Yes' | 'No'
  update: string
  status: 'Active' | 'Deactive'
}

export interface PaperGroupFilterParams {
  search?: string
  status?: string
}

export interface PaperGroupFormData {
  id?: string
  partnerId?: string | null
  name: string
  merk: string
  priceType: 'Yes' | 'No'
  status: 'Active' | 'Deactive'
}

export interface PaperSize {
  id: string
  name: string
  dimension: string
  length: number
  width: number
  unit: string
  update: string
  status: 'Active' | 'Deactive'
}

export interface PaperSizeFilterParams {
  search?: string
  status?: string
}

export interface PaperSizeFormData {
  id?: string
  name: string
  dimension?: string
  length: number
  width: number
  unit: string
  status: 'Active' | 'Deactive'
}

export interface PaperItem {
  id: string
  groupId: string
  sizeId?: string
  name: string
  merk: string
  price: number
  priceType: string
  unitPrice: string
  gsm: number
  paperSize: string
  stock: number
  unitStock: string
  update: string
  status: 'Active' | 'Deactive'
}

export interface PaperItemFilterParams {
  search?: string
  status?: string
  groupId?: string
}

export interface PaperItemFormData {
  id?: string
  groupId: string
  sizeId?: string
  name: string
  merk: string
  price: number
  priceType: string
  unitPrice: string
  gsm: number
  paperSize: string
  stock: number
  unitStock: string
  status: 'Active' | 'Deactive'
}

export interface PaperPrice {
  id: string
  sizeId?: string
  paperId?: string
  groupId?: string
  nama: string
  group: string
  merk: string
  ukuran: string
  satuan: string
  gramatur: number
  minOrder: string
  kelipatan: string
  harga: number
  update: string
  status: 'Active' | 'Deactive'
}

export interface PaperPriceFilterParams {
  search?: string
  status?: string
  group?: string
}

export interface PaperPriceFormData {
  id?: string
  sizeId?: string
  paperId?: string
  groupId?: string
  nama: string
  group: string
  merk: string
  ukuran: string
  satuan: string
  gramatur: number
  minOrder: string
  kelipatan: string
  harga: number
  status: 'Active' | 'Deactive'
}

