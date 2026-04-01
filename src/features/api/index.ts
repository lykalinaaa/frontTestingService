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

export async function deleteBlog(id: number) {
  const url = `/api/userInfo/${id}`

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}

export async function createPost(payload, id) {
  const url = `/api/post?userInfoId=${id}`

  const request = {
    briefDescription: payload.briefDescription,
    fullDescription: payload.fullDescription,
    title: payload.title
  }

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    credentials: 'include',
  })
}

export async function editPost(payload) {
  const url = `/api/post`

  const request = {
    briefDescription: payload.briefDescription,
    fullDescription: payload.fullDescription,
    id: +payload.id,
    title: payload.title
  }

  return await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    credentials: 'include',
  })
}

export async function deletePost(id: number) {
  const url = `/api/post/${id}`

  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}
