import * as TasksActions from './tasks-actions';
import * as TaskListsActions from './taskLists-actions';

export const ActionCreators = Object.assign( {},
	TasksActions,
	TaskListsActions
);