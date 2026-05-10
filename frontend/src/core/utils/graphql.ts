export const fetchGraphql = async (query: string, variables?: any) => {
  const token = localStorage.getItem('token')

  const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}