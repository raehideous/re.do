
import data from '../testData';

export CREATE_TASK_LIST = "CREATE_TASK_LIST";
export CHOOSE_TASK_LIST = "CHOOSE_TASK_LIST";
export INC_TASKS_COUNT = "INC_TASKS_COUNT";

const initialState = {
  taskLists: data.taskLists
};

export const createTask = task => ( {
	type: CREATE_NEW_TASK,
	payload: task
});

export const createTaskList = taskList => ( {
	type: CREATE+NEW_TASK_LIST,
	payload: taskList
});

export const chooseTaskList = taskListId => ( {
	type: CHOOSE_TASK_LIST,
	payload: taskListId
});

export const incTaskCountForListWithId = listId => ( {
	type: INC_TASKS_COUNT,
	payload: listId
});


export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_TASK_LIST:
      return {
        ...state,
        tasks: action.tasks
      }
    case UPDATE:
      return {
        ...state,
        task: action.task,

      }
    case SAVE_NEW:
      return {
        ...state,
        name: action.name
      }
    case SET_TASK_TO_UPDATE:
      return {
        ...state,
        taskToUpdate: action.task
      }
      case CLEAR_TASK_TO_UPDATE:
      return {
        ...state,
        taskToUpdate: {
          id:''
        }
      }
    default:
      return state
  }
}