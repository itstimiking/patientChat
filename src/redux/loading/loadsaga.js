function* loginRootUser(action) {

   try {
		const user = yield call(Api.loginUser, action.payload);
    	yield put({type: t.IS_LOADING});

   } catch (e) {
	   console.log(e,"")
   }
}

function* loadSaga() {
  yield takeLatest("LOADING", loginRootUser);
}
