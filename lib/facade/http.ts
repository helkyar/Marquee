export const http = {
  get: (url: string, params = {}) => {
    const queryString = Object.entries(params)
      .map((param) => {
        return `${param[0]}=${param[1]}`
      })
      .join('&')
    return fetch(`${url}?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
  },
}

// Demonstration purposes should be in a separate file
type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const getPosts = async (): Promise<Post[]> => {
  const data = http.get('https://jsonplaceholder.typicode.com/posts')
  //transform data if needed
  return data
}
