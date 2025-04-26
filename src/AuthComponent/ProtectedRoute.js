import { useAuthHooks } from './hooks'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { authContext : { isLoggedIn }} = useAuthHooks()
  if(!isLoggedIn) {
    return <Navigate to='/login' />
  }
  return children
}

export default ProtectedRoute