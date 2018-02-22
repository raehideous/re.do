import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";


export const tasks = createReducer( {}, {
	[ActionTypes.CREATE_TASK](state,action) {

		 let newState = state.slice();
     newState.push( action.payload );
		 return newState;
	}
});

export const tasksLists = createReducer( {}, {
	[ActionTypes.CREATE_TASK_LIST](state,action) {

		 let newState = state.slice();
     newState.push( action.payload );
		 return newState;
	}
});

export const chosenListId = createReducer( {}, {
	[ActionTypes.SET_TASK_VIEW_MODE](state,action) {

		 let newState = action.payload;
		 return newState;
	}
});