import type { EmployeeSalaryItem, EmployeeSalaryFormData, EmployeeSalaryFilterParams } from '#server/types/employeeSalary'

interface ResponseData {
  success: boolean
  data: (Omit<EmployeeSalaryItem, 'status'> & { status: 'Active' | 'Inactive' | 'Disabled' })[]
  message?: string
}

export function useEmployeeSalaries() {
  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/employee-salaries', {
    key: 'employee-salaries-list'
  })

  const salaries = computed<EmployeeSalaryItem[]>(() => (data.value?.data ?? []).map(item => ({ ...item, status: item.status === 'Inactive' ? 'Disabled' : item.status })))

  const saveSalary = async (payload: EmployeeSalaryFormData) => {
    const res = await apiFetch<{ success: boolean; data: EmployeeSalaryItem; message?: string }>('/api/v1/admin/employee-salaries', {
      method: 'POST',
      body: { ...payload, status: payload.status === 'Disabled' ? 'Inactive' : payload.status }
    })
    await refresh()
    return res
  }

  const deleteSalary = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(`/api/v1/admin/employee-salaries/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    await refresh()
    return res
  }

  return {
    salaries,
    pending,
    error,
    refresh,
    saveSalary,
    deleteSalary
  }
}
