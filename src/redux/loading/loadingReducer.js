import * as t from "../constants";


const initialState = {
	isLoading: false,
	loaded: false,
	failed: false
};

export default function loadingReducer (state = initialState, action){
	switch(action.type){
		case t.LOADING:
			state = {...state, isLoading:action.isLoading}
			return state;

		case t.LOADED:
			state = {...state, isLoading:action.isLoading, }
			return state;

		case t.FAILED_LOAD:
			state = {...state, isLoading:action.isLoading, }
			return state;

		default:
			return state;
	}
}
