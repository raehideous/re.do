import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";


export const tasks = createReducer( {}, {
	[ActionTypes.ADD_TASK](state,action) {
		 let tasks = state.slice();
     tasks.unshift( action.payload );
		 return tasks;
	},
	[ActionTypes.REMOVE_TASK](state,action) {
		 const taskToRemIdx = state.findIndex(item => {
			 return item.id === action.payload.id && item.todo_list === action.payload.todo_list
		 });
		 let tasks = state.slice();
		 tasks.splice(taskToRemIdx, 1);
		 return tasks;
	},
	[ActionTypes.MODIFY_TASK](state,action) {
		let modifiedTask = action.payload;
		let tasks = state.slice();

		 for(let i in tasks) {
			 	if( tasks[i].id === modifiedTask.id && tasks[i].todo_list === modifiedTask.todo_list ) {
					tasks[i] = modifiedTask;
					break;
				}
		 }
		 return tasks;
	},
});



