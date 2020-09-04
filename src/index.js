import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import firebase, { db, provider } from 'services/firebase';

import App from './app';
import rootReducer from 'state';
import './styles/tailwind.output.css';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: {
        firebase: { app: firebase, db, provider }
      }
    }
  })
});
// store.dispatch(verifyAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
