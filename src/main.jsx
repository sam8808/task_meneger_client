import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { ConfigProvider } from 'antd'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ConfigProvider>
)
