import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";

export const privateRoutes = [
  {
    path: '/main',
    element: Main
  },
]

export const publicRoutes = [
  {
    path: '/register',
    element: Register 
  },
  {
    path: '/login',
    element: Login 
  },
]