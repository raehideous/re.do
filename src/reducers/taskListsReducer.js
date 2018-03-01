import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";


export const taskLists = createReducer( {}, {
	[ActionTypes.ADD_TASK_LIST](state,action) {

		 let taskLists = state.slice();
     taskLists.unshift( action.payload );
		 return taskLists;
	},
	[ActionTypes.REMOVE_TASK_LIST](state,action) {
		 let taskLists = state.slice().filter( item => item.id !== action.payload.id);
		 return taskLists;
	},
	[ActionTypes.INC_TASKS_COUNT](state,action) {
		let taskLists = state.slice();
		taskLists.find( el => el.id === action.payload ).todos_count++;
	 	return taskLists;
	},
	[ActionTypes.DEC_TASKS_COUNT](state,action) {
		let taskLists = state.slice();
		taskLists.find( el => el.id === action.payload ).todos_count--;
		return taskLists;
	},
	[ActionTypes.MODIFY_TASK_LIST](state,action) {
		let modifiedList = action.payload;
		let taskLists = state.slice();

		 for(let i in taskLists) {
			 	if( taskLists[i].id === modifiedList.id ) {
					taskLists[i] = modifiedList;
					break;
				}
		 }
		 return taskLists;
	},
});

export const chosenList = createReducer( {}, {
	[ActionTypes.CHOOSE_TASK_LIST](state,action) {
		 return action.payload;
	}
});