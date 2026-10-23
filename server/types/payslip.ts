export interface PayslipItem {
  id: string
  employeeId: string
  slipNo: string
  name: string
  period: string
  salarySystem?: 'Monthly' | 'Weekly' | 'Daily' | null
  department?: string | null
  salaryRate: number
  dayWorked: number
  allowance: number
  overtime: number
  deduction: number
  total: number
  status: 'Paid' | 'Unpaid'
  paidDate: string | null
  paid?: number
  due?: number
  items?: { label: string; qty: number; rate: number; amount: number }[]
}

export interface PayslipFilterParams {
  search?: string
  status?: string
}

export interface PayslipFormData {
  employeeId?: string
  id?: string
  slipNo?: string
  name: string
  period: string
  salaryRate: number
  dayWorked: number
  allowance: number
  overtime: number
  deduction: number
  total?: number
  status: 'Paid' | 'Unpaid'
  paidDate?: string
}

