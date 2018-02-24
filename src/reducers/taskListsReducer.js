import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";


export const taskLists = createReducer( {}, {
	[ActionTypes.ADD_TASK_LIST](state,action) {

		 let newState = state.slice();
     newState.unshift( action.payload );
		 return newState;
	},
	[ActionTypes.INC_TASKS_COUNT](state,action) {

		let newState = state.slice();
		newState.find( el => el.id === action.payload ).todos_count++;
	 	return newState;
	},
});

export const chosenList = createReducer( {}, {
	[ActionTypes.CHOOSE_TASK_LIST](state,action) {

		 let newState = action.payload;
		 return newState;
	}
});