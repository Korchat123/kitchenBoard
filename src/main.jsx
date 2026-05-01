import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {OrdersProvider} from './context/ordersContext/OrdersProvider'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <OrdersProvider> 
    <App />
 </OrdersProvider>   
  </StrictMode>,
)
