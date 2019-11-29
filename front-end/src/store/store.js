import { createStore, applyMiddleware, compose } from "redux";
import asyncReducer from "../reducers/asyncReducer";
import thunk from "redux-thunk";

const store = createStore(asyncReducer, compose(applyMiddleware(thunk)));

export default store;