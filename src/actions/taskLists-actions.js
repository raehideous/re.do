import * as ActionTypes from "../constants/action-types";

export const addTask = task => ( {
	type: ActionTypes.ADD_TASK,
	payload: task
});

export const addTaskList = taskList => ( {
	type: ActionTypes.ADD_TASK_LIST,
	payload: taskList
});

export const chooseTaskList = taskList => ( {
	type: ActionTypes.CHOOSE_TASK_LIST,
	payload: taskList
});

export const incTaskCountForListWithId = listId => ( {
	type: ActionTypes.INC_TASKS_COUNT,
	payload: listId
});


