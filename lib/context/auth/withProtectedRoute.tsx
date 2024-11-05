import { useAuth } from '@/lib/context/auth/AuthContext'
import { useRouter } from 'next/router'
import React, { useEffect, ComponentType, Suspense } from 'react'

export const withProtectedRoute = (WrappedComponent: ComponentType) => {
  return function AuthWrapper(props: JSX.IntrinsicAttributes) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!user) {
        //toast.error('You need to be logged in to access this page')
        //TO-DO: add current page to redirect to after login
        router.push('/login')
      }
    }, [user, router])

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return user ? <WrappedComponent {...props} /> : null
  }
}
export const withProtectedRouteAndRoles = ({
  WrappedComponent,
  roles,
}: {
  WrappedComponent: ComponentType
  roles: string[]
}) => {
  return function AuthWrapper(props: JSX.IntrinsicAttributes) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!user) {
        //toast.error('You need to be logged in to access this page')
        //TO-DO: add current page to redirect to after login
        router.push('/login')
      } else if (!roles.includes(user.role)) {
        //TO-DO: redirect to previous page
      }
    }, [user, router])

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return user ? <WrappedComponent {...props} /> : null
  }
}

// // with react-router-dom
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// export default function withProtectedRoute({ component: Component, ...rest }) {
//   const location = useLocation();
//   const isAuthenticated = useAuth().user;
//   return (
//     <Route {...rest}>
//       {isAuthenticated ? <Component /> : <Navigate to="/login" state={{ from: location }}/>}
//     </Route>
//   );
// }

// import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const withProtectedRouteAndRoles = ({ component: Component, roles, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route {...rest} render={(props) => {
//       if (!user) {
//         return <Redirect to='/login' />;
//       }

//       if (roles && !roles.includes(user.role)) {
//         return <Redirect to='/' />;
//       }

//       return <Component {...props} />;
//     }} />
//   );
// };

// // include the route in your signIn
// const from = location.state?.from || '/';
// navigate(from);

// use ================================================================================
const ProtectedComponent = () => {
  // Your protected page content
  return <div>Protected Content</div>
}

export default withProtectedRoute(ProtectedComponent)

export async function Page() {
  return (
    <section>
      <h1>Public Page title</h1>
      <Suspense fallback='SKELETON'>
        <ProtectedComponent />
      </Suspense>
    </section>
  )
}
