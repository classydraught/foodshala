import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./User";
import { createForms } from "react-redux-form";
import { InitialFeedback, RegisterUserDetails, } from "./forms";


export const storeConfig = () => {
    const store = createStore(
        combineReducers({
            user: User,
            ...createForms({ feedback: InitialFeedback }),
            ...createForms({ registeruser: RegisterUserDetails }),
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
