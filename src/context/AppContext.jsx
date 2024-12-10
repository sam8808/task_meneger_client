import { createContext, useEffect, useState } from "react";

const AppContext = createContext()

const AppContextProvider = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos"))?.todos || [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify({todos: todos}))
  }, [todos])

  return (
    <AppContext.Provider value={ {theme, setTheme, todos, setTodos} }>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppContextProvider}