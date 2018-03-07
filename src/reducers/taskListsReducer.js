import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";
import typeToReducer from 'type-to-reducer'


const initialState = {
  data: [],
  isPending: false,
  error: false
}

const PENDING = (state) => ({
	...state,
	isPending: true
})

const REJECTED = (state, action) => ({
	...state,
	error: action.payload
})

export const taskLists = typeToReducer({
	[ActionTypes.FETCH_TASK_LISTS]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => ({
			...initialState,
			data: action.payload
		})
	},
	[ActionTypes.CREATE_TASK_LIST]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => {
      let newData = state.data;
      newData.unshift(action.payload);

      return {
        ...initialState,
        data: newData
      }
    }
  },
	[ActionTypes.UPDATE_TASK_LIST]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => {
      const idx = state.data.findIndex( item => item.id === action.meta.id );
      state.data[idx] = action.payload;
      const newData = state.data;

      return {
			  ...initialState,
			  data: newData
		  }
  }
	},
	[ActionTypes.DELETE_TASK_LIST]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => {
      const newData = state.data.filter( list => list.id !== action.meta.id);
      return {
        ...initialState,
      	data: newData
      }
    }
	}
}, initialState);