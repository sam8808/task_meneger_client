import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./utils/navigation"
import PrivateRoute from "./utils/PrivateRoute"
import PublilcRoute from "./utils/PublilcRoute"

function App() {
  return (
    <BrowserRouter basename="/Todo-test-task-react">
      <Routes>

        {privateRoutes.map((route) => (
          <Route 
            path={route.path} 
            element={<PrivateRoute element={<route.element />} />} 
            key={route.path}
          />
        ))}

        {publicRoutes.map((route) => (
          <Route 
            path={route.path} 
            element={<PublilcRoute element={<route.element />} />} 
            key={route.path}
          />
        ))}

        <Route 
          path="*"
          element={<Navigate to='/main' />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App