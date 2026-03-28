export async function getAuthToken(payload: { login: string; password: string }) {
  const url = `/api/auth/login?username=${encodeURIComponent(payload.login)}&password=${encodeURIComponent(payload.password)}`

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}
