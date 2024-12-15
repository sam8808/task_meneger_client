import { useAppContext } from '../hooks/context'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({element}) => {
  const {token} = useAppContext()

  return token ? element : <Navigate to='/register' />
}

export default PrivateRoute