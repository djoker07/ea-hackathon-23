import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './styles/index.css'
import Layout from './Layout'
import { MyContext } from './store/AppContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContext>

    <Layout />
    </MyContext>
  </React.StrictMode>,
)
