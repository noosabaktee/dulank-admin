import type { Blog, BlogFormData } from '#server/types/blog'

interface ResponseData {
  success: boolean
  data: Blog[]
  meta?: { page: number; limit: number; total: number }
  message?: string
}

interface MutationResponse {
  success: boolean
  data?: Blog
  message?: string
}

/** Backend memakai Publish/Unpublish/Draft; admin memakai Active/Inactive. */
const normalizeStatus = (status?: string): string | undefined => {
  if (status === 'Active') return 'Publish'
  if (status === 'Inactive') return 'Unpublish'
  return status
}

const denormalizeStatus = (status?: string): string | undefined => {
  if (status === 'Publish') return 'Active'
  if (status === 'Unpublish') return 'Inactive'
  return status
}

/**
 * Blog — backend Laravel `/api/v1/admin/blogs`.
 */
export function useBlogs(filterParams?: Ref<{ search?: string; status?: string }>) {
  const params = ref<{ search?: string; status?: string }>(isRef(filterParams) ? filterParams.value : filterParams ?? {})

  const query = computed(() => ({
    search: params.value.search || undefined,
    status: normalizeStatus(params.value.status) || undefined,
    limit: 100
  }))

  const { data, pending, error, refresh } = useApiFetch<ResponseData>('/api/v1/admin/blogs', {
    key: 'blogs-list',
    query
  })

  const blogs = computed<Blog[]>(() =>
    (data.value?.data ?? []).map(blog => ({ ...blog, status: denormalizeStatus(blog.status) as Blog['status'] })),
  )

  const saveBlog = async (payload: BlogFormData, id?: string) => {
    const { id: _id, ...body } = payload
    void _id

    const res = await apiFetch<MutationResponse>(
      id ? `/api/v1/admin/blogs/${encodeURIComponent(id)}` : '/api/v1/admin/blogs',
      {
        method: id ? 'PUT' : 'POST',
        body: { ...body, status: normalizeStatus(body.status) }
      }
    )

    await refresh()
    return res
  }

  const deleteBlog = async (id: string) => {
    const res = await apiFetch<{ success: boolean; message?: string }>(
      `/api/v1/admin/blogs/${encodeURIComponent(id)}`,
      { method: 'DELETE' }
    )

    await refresh()
    return res
  }

  return {
    blogs,
    pending,
    error,
    refresh,
    saveBlog,
    deleteBlog
  }
}