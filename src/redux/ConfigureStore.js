import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./User";

export const storeConfig = () => {
    const store = createStore(
        combineReducers({
            user: User,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
