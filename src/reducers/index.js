import { combineReducers } from 'redux';

import * as taskReducer from './taskReducer'

export default combineReducers( Object.assign(
	taskReducer
));
