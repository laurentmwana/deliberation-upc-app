import { usePage } from '@inertiajs/react'


export const useMergeQuery = (basePath?: string) => {
  const { url } = usePage()
  const [pathname, queryString = ''] = url.split('?')

  return (newParams: Record<string, string | number | undefined>): string => {
    const currentParams = new URLSearchParams(queryString)

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        currentParams.delete(key)
      } else {
        currentParams.set(key, String(value))
      }
    })

    const finalPath = basePath ?? pathname
    const finalQuery = currentParams.toString()

    return finalQuery ? `${finalPath}?${finalQuery}` : finalPath
  }
}
