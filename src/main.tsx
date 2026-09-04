// src/main.tsx — React 18 Vite Concurrent createRoot
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SecureShieldProvider } from './providers/SecureShieldProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SecureShieldProvider>
      <App />
    </SecureShieldProvider>
  </React.StrictMode>
);