import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store/store.js'
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../src/Styles/styles.css';
import {Auth0Provider} from '@auth0/auth0-react'



const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-twkvh8k3200gdm1e.us.auth0.com"
        clientId="7crT8gU99jhS9Wte2kRkUzcILZLreO1b"
        authorizationParams={{
          redirect_uri: window.location.origin
          }}
        >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
);

