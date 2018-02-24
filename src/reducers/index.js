import { combineReducers } from 'redux';

import * as taskReducer from './taskReducer';
import * as taskListsReducer from './taskListsReducer'

export default combineReducers( Object.assign(
	taskReducer,
	taskListsReducer
));
