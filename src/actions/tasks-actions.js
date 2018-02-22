import * as ActionTypes from "../constants/action-types";

export const createTask = task => ( {
	type: ActionTypes.CREATE_TASK,
	payload: task
});

