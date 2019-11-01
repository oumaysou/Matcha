import { createStore, applyMiddleware, compose } from "redux";
import asyncReducer from "../reducers/asyncReducer";
import thunk from "redux-thunk";

const store = createStore(asyncReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;