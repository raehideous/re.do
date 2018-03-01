import * as ActionTypes from "../constants/action-types";

export const addTaskList = taskList => ( {
	type: ActionTypes.ADD_TASK_LIST,
	payload: taskList
});

export const removeTaskList = task => ( {
	type: ActionTypes.REMOVE_TASK_LIST,
	payload: task
});

export const chooseTaskList = taskList => ( {
	type: ActionTypes.CHOOSE_TASK_LIST,
	payload: taskList
});

export const incTaskCountForListWithId = listId => ( {
	type: ActionTypes.INC_TASKS_COUNT,
	payload: listId
});

export const decTaskCountForListWithId = listId => ( {
	type: ActionTypes.DEC_TASKS_COUNT,
	payload: listId
});



