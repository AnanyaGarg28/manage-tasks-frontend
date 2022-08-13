import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter,
  Routes,
  Route
  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { Dashboard } from './pages/Dashboard';
import { PrivateRoute } from "./features/auth/PrivateRoute";
import { LoginPage } from './features/auth/LoginPage';
import { SignupPage } from './features/auth/SignupPage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}  />
        <Route path="/signup" element={<SignupPage />}  />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
