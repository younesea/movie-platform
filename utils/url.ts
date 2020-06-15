/**
 * Updates the query params in the URL
 *
 * @param search
 */
export const updateQueryParams = (search: string): void => {
  const params = new URLSearchParams()

  params.set('search', search)

  if (typeof window !== 'undefined')
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${params.toString()}`
    )
}
