import * as ActionTypes from "../constants/action-types";

export const addTask = task => ( {
	type: ActionTypes.ADD_TASK,
	payload: task
});



