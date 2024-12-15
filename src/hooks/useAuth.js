import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  const { user, token, loading } = useSelector(state => state.auth)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return {
    ...context,
    isAuthenticated: !!token,
    user,
    isLoading: loading
  }
}