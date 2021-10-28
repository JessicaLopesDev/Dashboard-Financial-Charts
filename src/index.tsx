import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme';
import App from './App';
import { AuthProvider } from './hooks/auth';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

