import { useContext } from 'react'
import { AuthContext } from '../AuthContext'

export const useAuthHooks = () => {
  const authContext = useContext(AuthContext)
  
  const destroySession = () => {
    const { setContextState } = authContext
    setContextState({...authContext, isLoggedIn: false, isSideBar: false})
  }
  
  return {authContext, destroySession}
}