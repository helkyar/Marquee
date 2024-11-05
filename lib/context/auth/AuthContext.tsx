import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// nonexintend imports
type User = {
  user: string
  role: string
  email: string
  permissions: string[]
}

type AuthContextType = {
  user: User
  login: (formData: FormData) => Promise<void>
  logout: () => Promise<void>
}
const signIn = async (provider: string, formData: FormData) => {
  return { provider, formData }
}
const signOut = async ({
  redirectTo,
  redirect,
}: {
  redirectTo: string
  redirect: boolean
}) => {
  return { redirectTo, redirect }
}
const auth = async (): Promise<User> => {
  return { user: 'user', role: 'base', email: 'email', permissions: ['read'] }
}
// ============================================================================

const AuthContext = createContext(null as unknown as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null as unknown as User)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const session = await auth()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(user)
    })()
  }, [])

  const login = async (formData: FormData) => {
    await signIn('credentials', formData)
    // set user
    const { user, email, role, permissions } = await auth()
    setUser({ user, email, role, permissions })
    const destination = router.query.redirect || '/dashboard'
    if (Array.isArray(destination)) router.push(destination[0])
    else router.push(destination)
  }

  const logout = async () => {
    'use server'
    setUser(null as unknown as User)
    await signOut({ redirectTo: '/', redirect: true })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
