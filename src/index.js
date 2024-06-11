import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss'; 
import App from './App.js'
import store from './Redux/store/store.js'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import '../src/styles.scss';
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

// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './styles.scss'; 
// import App from './App.js'
// import store from './Redux/store/store.js'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>
// );