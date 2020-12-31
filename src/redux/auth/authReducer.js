import * as t from "./constants";



 
const initialState = {
	user:{},
	practices:false,
	passwordResetStatus:"",
	addStaff:"",
	error: false
};

export default function authReducer (state = initialState, action){

	switch(action.type){

		case t.PATIENT_LOGIN:

			state = {...state, user:action.payload};
			
			return state;

		case t.PATIENT_LOGOUT:

			state = {...state, user:{}, passwordResetStatus:"", addStaff:"", error: false, practices: []}
			return state;
			
		case t.PATIENT_PASSWORD_RESET_REQ:

			state = {...state, passwordResetStatus:action.payload}
			return state;

		case t.PATIENT_PASSWORD_RESET:

			state = {...state, passwordResetStatus:action.payload}
			return state;

		case t.PATIENT_GET_ALL_PRACTICE:
			state = { ...state, practices: action.payload}
			return state;

		case t.API_FAILED:

			state = {...state, error: true}
			return state;

		case t.API_ERROR_RESET:
			state = {...state, error: false}
			console.log("----------- Error -----------", state.error)
			return state;

		
		default:
			return state;
			
	}
}
