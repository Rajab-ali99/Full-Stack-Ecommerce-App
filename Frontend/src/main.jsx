import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/index.jsx'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
  <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
