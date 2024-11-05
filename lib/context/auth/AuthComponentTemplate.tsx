import { Session } from 'inspector'
// import { SessionProvider, useSession } from 'next-auth/react'
import { adminDashboard } from './role-based-config.json'

const session = {
  user: { username: 'user', permissions: ['read', 'write'], role: 'admin' },
}

interface PageProps {
  session?: Session | null
  [key: string]: unknown
  auth?: boolean
}
interface AuthComponentType extends React.FC<PageProps> {
  auth?: boolean
}

interface AppProps {
  Component: AuthComponentType
  pageProps: PageProps
}
export default function App({
  Component,
  pageProps: { /* session, */ ...pageProps },
}: AppProps) {
  // These options have no effect on clients that are not signed in.
  /*
    <SessionProvider
      session={session}
      basePath='/'
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
 */
  // Every tab/window maintains its own copy of the local session state;
  // session is not stored in shared storage like local or sessionStorage.
  // Any update in one tab/window triggers a message to other tabs/windows
  // to update their own session state.

  // Using low values for refetchInterval will increase network traffic
  // and load on authenticated clients and may impact hosting costs and
  // performance.
  return (
    // <SessionProvider
    //   session={session}
    //   basePath='/'
    //   refetchInterval={5 * 60}
    //   refetchOnWindowFocus={true}
    // >
    <>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
  // </SessionProvider>
}

function Auth({ children }: { children: React.ReactNode }) {
  console.log('🚀 ~ Auth ~ children:', children)
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  //   const { status } = useSession()
  const status = 'authenticated'

  //   if (status === 'loading') {
  //     return <div>Loading...</div>
  //   }
  if (status === 'authenticated') {
    return children
  }
  return null
}

export const AdminLoadingSkeleton = () => 'AdminLoadingSkeleton'
export function AdminDashboard() {
  //   const { data: session } = useSession()
  //   const isAllowedToWrite = session?.user?.permissions?.includes(
  //     adminDashboard.permissions.write
  //   )

  const isAllowedToWrite = session.user.permissions?.includes(
    adminDashboard.permissions.write
  )
  // session is always non-null inside this page, all the way down the React tree.
  return (
    <section>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.username}</p>
      {isAllowedToWrite ? (
        <form>
          <input type='text' />
        </form>
      ) : null}
    </section>
  )
}

AdminDashboard.auth = {
  roles: adminDashboard.roles,
  loading: <AdminLoadingSkeleton />,
  unauthorized: '/login-with-different-user', // redirect to this url
}
