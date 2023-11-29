import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './header.jsx'
import Body from './Body.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Body />
    </BrowserRouter>
  </React.StrictMode>,
)
