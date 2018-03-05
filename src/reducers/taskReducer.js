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

export const tasks = typeToReducer({
	[ActionTypes.FETCH_TASKS]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => ({
			error: false,
      isPending: false,
			data: action.payload
		})
	},
	[ActionTypes.CREATE_TASK]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => {
      let newData = state.data;
      newData.unshift(action.payload);

      return {
        error: false,
        isPending: false,
        data: newData
      }
    }
  },
	[ActionTypes.UPDATE_TASK]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action, list) => {
      const idx = state.data.find( item => item.id === list.id );
      const newData = state.data[idx] = action.payload;

      return {
			  error: false,
        isPending: false,
			  data: newData
		  }
  }
	},
	[ActionTypes.DELETE_TASK]: {
		PENDING,
		REJECTED,
		FULFILLED: (state, action) => {
      const newData = state.data.filter( list => list.id !== action.meta.id);
      return {
        error: false,
        isPending: false,
      	data: newData
      }
    }
	}
}, initialState);