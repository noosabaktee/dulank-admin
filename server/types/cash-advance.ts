export type CashAdvancePeriod = 'Daily' | 'Weekly' | 'Monthly'

export interface CashAdvanceHistoryEntry {
  id: string
  date: string
  amount: number
  installment: number
  period: CashAdvancePeriod
  tenorTotal: number
  note: string
  status: 'On' | 'Close'
}

export interface CashAdvancePayment {
  id?: string
  date: string
  amount: number
  referenceId?: string
  note?: string
}

export interface CashAdvance {
  id: string
  employeeId: string
  bankAccountId: string
  date: string
  totalCash: number
  installmentCount: number
  period: CashAdvancePeriod
  note: string
  createdAt: string
  updatedAt: string
  history: CashAdvanceHistoryEntry[]
  payments: CashAdvancePayment[]
}

export interface CashAdvanceView extends CashAdvance {
  employee: string
  installmentAmount: number
  totalPaid: number
  outstanding: number
  tenorRemain: number
  status: 'On' | 'Close'
}

export interface CashAdvanceFormData {
  id?: string
  employeeId: string
  employeeName?: string
  bankAccountId?: string | null
  installmentCount?: number
  date: string
  totalCash: number
  period: CashAdvancePeriod
  note?: string
}

