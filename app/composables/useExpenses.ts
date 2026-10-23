import type { Expense, ExpenseFormData, ExpenseFilterParams } from '#server/types/expense'

interface ResponseData {
  success: boolean
  data: Expense[]
  meta?: { page: number; limit: number; total: number }
  message?: string
}

interface MutationResponse {
  success: boolean
  data?: Expense
  message?: string
}

/**
 * Pengeluaran — backend Laravel `/api/v1/admin/expenses`.
 */
export function useExpenses(filterParams?: Ref<ExpenseFilterParams> | ExpenseFilterParams) {
  const params = isRef(filterParams) ? filterParams : ref(filterParams || {})

  const query = computed(() => ({
    search: params.value.search || undefined,
    status: params.value.status || undefined,
    category: params.value.category || undefined,
    limit: 100
  }))

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/expenses', {
    key: 'expenses-list',
    query
  })

  const expenses = computed<Expense[]>(() => data.value?.data ?? [])

  const saveExpense = async (payload: ExpenseFormData) => {
    const { id, noExpense, status, due, ...fields } = payload
    void noExpense; void status; void due
    const body = { ...fields, bankAccountId: payload.bankAccountId || null }

    const res = await apiFetch<MutationResponse>(
      id ? `/api/v1/admin/expenses/${encodeURIComponent(id)}` : '/api/v1/admin/expenses',
      {
        method: id ? 'PUT' : 'POST',
        body
      }
    )

    await refresh()
    return res
  }

  const deleteExpense = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(
      `/api/v1/admin/expenses/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    )

    await refresh()
    return res
  }

  return {
    expenses,
    pending,
    error,
    refresh,
    saveExpense,
    deleteExpense
  }
}