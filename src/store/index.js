import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import data from './testData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = preloadedState => {

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk
    ),
  );

  return createStore( combinedReducers, preloadedState, enhancer );
};

const store = configureStore( {
  taskLists: data.taskLists,
  tasks: data.tasks,
  chosenList: null
});


export default store;