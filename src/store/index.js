import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createHashHistory as createHistory } from 'history';
import combinedReducers from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';

import logger from 'redux-logger';

export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = preloadedState => {

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
  //    logger,
      promiseMiddleware(),
      routerMiddleware(history)
    ),
  );

  const store =createStore( combinedReducers, preloadedState, enhancer );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureStore( {
  taskLists: {
    isPending: false,
    isError: false,
    data: [],
  },
  tasks: [],
});


export default store;