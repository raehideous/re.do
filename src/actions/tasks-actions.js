import * as ActionTypes from "../constants/action-types";
import { VentureDevsAPI } from "../constants/apis";

export const fetchTasks = listId => ({
	type: ActionTypes.FETCH_TASKS,
	payload: fetch( VentureDevsAPI + `/todolists/${listId}/`)
			.then( resp => resp.json() )
});

export const createTask = task => ({
	type: ActionTypes.CREATE_TASK,
	payload: fetch( VentureDevsAPI + `/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( task ),
    }).then( resp => resp.json() ),
});

export const updateTask = task => ({
	type: ActionTypes.UPDATE_TASK,
	meta: {
		id: task.id
	},
	payload: fetch( VentureDevsAPI + `/todos/${task.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( task ),
    }).then( resp => resp.json() ),
});

export const deleteTask = task => ({
	type: ActionTypes.DELETE_TASK,
	meta: {
		id: task.id
	},
	payload: fetch( VentureDevsAPI + `/todolists/${task.todo_list}/${task.id}/`, {
      method: 'DELETE',
    }),
});
