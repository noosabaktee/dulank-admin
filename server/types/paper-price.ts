export interface PaperPrice {
  id: string
  sizeId?: string
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
  status: 'Active' | 'Inactive'
}

export interface PaperPriceFilterParams {
  search?: string
  status?: string
  group?: string
}

export interface PaperPriceFormData {
  id?: string
  sizeId?: string
  nama: string
  group: string
  merk: string
  ukuran: string
  satuan: string
  gramatur: number
  minOrder: string
  kelipatan: string
  harga: number
  update?: string
  status: 'Active' | 'Inactive'
}

