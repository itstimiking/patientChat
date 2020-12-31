import React from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";


const saga = createSagaMiddleware();



const initialState = {}



const store = createStore(rootReducer, initialState, applyMiddleware(saga));
saga.run(rootSaga)


export default store;
