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

export async function getPosts() {
  const url = '/api/userInfo/findAll'

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  return response.json()
}

export async function createBlog(payload: {blogName: string, fullName: string}) {
  const url = '/api/userInfo'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  return response.json()
}
