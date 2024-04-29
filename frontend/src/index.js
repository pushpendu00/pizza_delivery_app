import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginState from './context/login/LoginState';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoginState>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </LoginState>
);
