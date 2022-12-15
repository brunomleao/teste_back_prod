import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './main/routes/router'
import 'antd/dist/antd.css';
import './presentation/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Router />
  // </React.StrictMode>
)
