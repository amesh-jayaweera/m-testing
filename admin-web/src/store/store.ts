import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import thunk from "redux-thunk";

export function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}
