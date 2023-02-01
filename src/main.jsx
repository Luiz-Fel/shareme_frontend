import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
      <Router>
          <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_GOOGLE_API_CLIENT_ID}
          >
          <App />
        </GoogleOAuthProvider>
      </Router>
    </React.StrictMode>,
  )