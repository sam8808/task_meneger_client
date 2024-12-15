import { Navigate } from 'react-router-dom'
import { useAppContext } from '../hooks/context'

const PublilcRoute = ({element}) => {
  const {token} = useAppContext()

  return !token ? element : <Navigate to='/main' />
}

export default PublilcRoute