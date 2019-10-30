import { createStore, applyMiddleware } from "redux";
import asyncReducer from "../reducers/asyncReducer";
import thunk from "redux-thunk";

const store = createStore(asyncReducer, applyMiddleware(thunk));

export default store;