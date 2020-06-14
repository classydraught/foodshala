import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./User";
import { createForms } from "react-redux-form";
import { InitialFeedback, RegisterUserDetails, RegisterRestarauntDetails } from "./forms";


export const storeConfig = () => {
    const store = createStore(
        combineReducers({
            user: User,
            ...createForms({ feedback: InitialFeedback }),
            ...createForms({ registeruser: RegisterUserDetails }),
            ...createForms({ registerres: RegisterRestarauntDetails })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
