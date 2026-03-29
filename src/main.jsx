import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoProvider } from './contexts/TodoContext'
import App from './App.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
)