import * as ActionTypes from "../constants/action-types";

export const addTask = task => ( {
	type: ActionTypes.ADD_TASK,
	payload: task
});


export const removeTask = task => ( {
	type: ActionTypes.REMOVE_TASK,
	payload: task
});