import * as ActionTypes from "../constants/action-types";
import { VentureDevsAPI } from "../constants/apis";

export const fetchTaskLists = () => ({
	type: ActionTypes.FETCH_TASK_LISTS,
	payload: fetch( VentureDevsAPI + `/todolists/`)
			.then( resp => resp.json() )
});

export const createTaskList = name => ({
	type: ActionTypes.CREATE_TASK_LIST,
	payload: fetch( VentureDevsAPI + `/todolists/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then( resp => resp.json() )
});

export const updateTaskList = list => ({
	type: ActionTypes.UPDATE_TASK_LIST,
	meta: {
		id: list.id
	},
	payload: fetch( VentureDevsAPI + `/todolists/${list.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    }).then( resp => resp.json() )
});

export const deleteTaskList = listId => ({
	type: ActionTypes.DELETE_TASK_LIST,
	meta: {
		id: listId
	},
	payload: fetch( VentureDevsAPI + `/todolists/${listId}/`, {
      method: 'DELETE',
    })
});

export const getTaskListById = state => id => {
		return state.taskLists.data.find( list => list.id === +id);
}