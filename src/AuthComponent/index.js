
import { useNavigate } from 'react-router-dom'
import './auth.css'
import Login from './Login'

const AuthComponent = () => {
  const naviagation = useNavigate()

  return (
    <Login naviagation={naviagation} />
  )
}

export default AuthComponent