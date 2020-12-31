import * as t from "./constants";


/*--------------------------LOG IN ROOT USER ------------------------*/

export const loginPatient = (email, password) => {

    return{
        type: t.PATIENT_LOGIN_WATCHER,
        payload: { email, password }     
    }
};

export const loginPatientSuccess = (userData) => {
    return{
        type: t.PATIENT_LOGIN,
        payload: userData   
    }
};


/*-------------------------- LOG OUT ROOT USER-------------------------------*/

export const logoutPatient = () => {

    return {
        type: t.PATIENT_LOGOUT
    }
};

export const logoutPatientSaga = (router) => {

    return {
        type: t.PATIENT_LOGOUT_WATCHER,
        payload: router
    }
    
};

/* --------------------------- ROOT PASSWORD RESET ---------------------------*/


export const forgotPatientPasswordRequestSaga = (email) => {
    
    return{
        type: t.PATIENT_PASSWORD_RESET_REQ_WATCHER,
        payload: { email }
    }
    
}

export const forgotPatientPasswordRequest = (passwordResetStatus) => ({
    type: t.PATIENT_PASSWORD_RESET_REQ,
    payload: passwordResetStatus
});

/*------------- PATIENTS PASSWORD RESET WITH KEY ACTIONS -----------------*/

export const patientPasswordResetWithKey = (passwordResetMessage) => ({
    type: t.PATIENT_PASSWORD_RESET,
    payload: passwordResetMessage
});

export const patientPasswordResetWithKeySaga = (passwordResetKey, newPassword) => ({
    type: t.PATIENT_PASSWORD_RESET_WATCHER,
    payload: {
        password: newPassword,
        key: passwordResetKey
    }
});



/*------------- PATIENT_GET_ALL_PRACTICE -----------------*/

export const patientGetAllPractices = (practices) => ({
    type: t.PATIENT_GET_ALL_PRACTICE,
    payload: practices
});

export const patientGetAllPracticesSaga = (token) => ({
        type: t.PATIENT_GET_ALL_PRACTICE_WATCHER,
        payload: {
            token
        }
});




export const apiError = () => {
    console.log("Api Action called -----------")
    return {type: t.API_FAILED}
};

export const apiErrorReset = () => ({
    type: t.API_ERROR_RESET
});
