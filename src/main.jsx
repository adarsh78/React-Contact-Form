import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
let bgColor = "hsl(148, 38%, 91%)"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App bgColor={bgColor}/>
  </React.StrictMode>,
)
