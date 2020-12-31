import { call, put, takeEvery, takeLatest, all, fork} from 'redux-saga/effects';
import * as t from "./constants";
import * as Api from '../Api.js';
import * as Actions from "./actions";
import { Alert } from "react-native";

import * as NavigationUtil from '../../utils/NavigationUtil';




/*------------------------ USER LOGIN SAGA --------------------------------*/

function* loginPatient(action) {

   try {
    console.log("---------LOGIN CALLED -------")
    const user = yield call(Api.loginPatient, action.payload);

    if (user.message === "Login successful!"){

        yield put(Actions.loginPatientSuccess(user));

        yield call(()=>{

                NavigationUtil.navigate("Authenticated", {user : user});
            }
        );

      }else{ 
        Alert.alert(user.errors[0]);
      }
      

   } catch (e) {
     
      Alert.alert(e)
   }
}

function* patientLoginWatcher() { /* --------------- USER LOGIN WATCHER ---------------------------*/

  yield takeLatest(t.PATIENT_LOGIN_WATCHER, loginPatient);

}





/*------------------------ PATIENTS GET PRACTICES SAGA --------------------------------*/

function* patientGetAllPractices(action) {


    try {

        const allP = yield call(Api.getPractice, action.payload.token);

        if (allP.practices.count > 0){

            yield put(Actions.patientGetAllPractices(allP));

        }else{ 
            Alert.alert(user.errors.map(err => err));
        }

    } catch (e) {
    
        Alert.alert(e)
    }
}

function* patientGetAllPracticesWatcher () { /* --------------- USER LOGIN WATCHER ---------------------------*/

    yield takeLatest(t.PATIENT_GET_ALL_PRACTICE_WATCHER, patientGetAllPractices);

}

/*------------------------LOGOUT USER --------------------------------*/


function* logoutPatient(action){
  
    yield put(Actions.logoutPatient());
    
    yield call(()=>{});

  
}

function* logoutPatientSaga() { /* --------------- LOGOUT USER WATCHER ---------------------------*/

  yield takeLatest(t.PATIENT_LOGOUT_WATCHER, logoutPatient);

}



/*-------------------------------------------- USER PASSWORD RESET REQUEST ------------------------------------*/


function* passwordResetUser(action){

  
  
  try{

    const {message} = yield call(Api.passwordReset, action.payload.email);

    if(message === "A link to reset your password has been sent to your mail. Please note that the link is only valid for one hour."){

        yield put(Actions.forgotPatientPasswordRequest(message));
    }

  }catch(e){
    console.log("password reset request error" , e)
  }
  
}

function* passwordResetUserWatcher() { 

  yield takeLatest(t.PATIENT_PASSWORD_RESET_REQ_WATCHER, passwordResetUser);

}


function* passwordResetUserWithKey(action){
  
  try{

    const {message} = yield call(Api.passwordResetWithKey, action.payload);

    if(message === "Password changed successfully!"){
      yield put(Actions.patientPasswordResetWithKey(message));
    }else{
      console.log("message is:::", message)
    }
    

  }catch(e){
    console.log("password reset error" , e)
  }
  
}


function* passwordResetWithKeyUserWatcher() { 
  
  yield takeLatest(t.PATIENT_PASSWORD_RESET_WATCHER, passwordResetUserWithKey);

}

function* authSaga() {
    yield all([
        fork(patientLoginWatcher),
        fork(logoutPatientSaga),
        fork(passwordResetUserWatcher),
        fork(passwordResetWithKeyUserWatcher),
        fork(patientGetAllPracticesWatcher),
    ]);
}


export default authSaga;
