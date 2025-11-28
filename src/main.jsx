// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/index.css';  // ✅ Import dengan alias
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);