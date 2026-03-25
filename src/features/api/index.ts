export async function getAuthToken(payload: { login: string; password: string }) {
  const url = `/api/auth/login?username=${encodeURIComponent(payload.login)}&password=${encodeURIComponent(payload.password)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Auth failed: ${response.status}`)
  }

  return response
}
