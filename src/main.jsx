import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProviderWrapper } from './context/auth.context.jsx';
import { ToastContainer } from 'react-toastify';
import ThemeProviderWrapper from './context/theme.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <CssBaseline />
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </ThemeProviderWrapper>
      <ToastContainer />
    </Router>
  </React.StrictMode>
);
