import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import './bootstrap/dist/css/bootstrap.css';

import store from './store';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
