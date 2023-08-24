import { useAuthContext } from './useAuthContext'
import { useCart } from './useCart'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const {Clear}=useCart()

  const logout = () => {
    // remove user from storage
    Clear()
    localStorage.removeItem('user')
    
    
    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}