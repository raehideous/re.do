import createReducer from '../lib/createReducer';
import * as ActionTypes from "../constants/action-types";


export const tasks = createReducer( {}, {
	[ActionTypes.ADD_TASK](state,action) {

		 let newState = state.slice();
     newState.unshift( action.payload );
		 return newState;
	}
});



