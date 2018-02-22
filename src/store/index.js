import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import data from './testData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = preloadedState => {

  const enhancer = compose(
    applyMiddleware(
      thunk
    ),
  );

  return createStore( combinedReducers, preloadedState, enhancer );
};

const store = configureStore( {
  tasksLists: data.tasksLists,
  tasks: data.tasks,
  chosenListId: 2
});


export default store;