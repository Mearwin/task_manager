import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';


import 'materialize-css/dist/css/materialize.min.css';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <link type="text/css" rel="stylesheet" href="materialize/dist/css/materialize.min.css" media="screen,projection" />
    <script type="text/javascript" src="js/materialize.min.js"></script>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
