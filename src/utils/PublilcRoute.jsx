import { Navigate } from 'react-router-dom'
import { useAppContext } from '../hooks/context'

const PublilcRoute = ({element}) => {
  const {token} = useAppContext()

  return !token ? element : <Navigate to='/Todo-test-task-react/main' />
}

export default PublilcRoute