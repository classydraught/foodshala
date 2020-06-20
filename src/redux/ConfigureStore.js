import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./User";
import { Restaraunt } from "./Restaraunt";
import { Dish } from "./Dishes";
import { Cart } from "./Cart";
import { Review } from "./Reviews";
import { createForms } from "react-redux-form";
import { InitialFeedback, RegisterUserDetails, RegisterRestarauntDetails, addDishDetails } from "./forms";


export const storeConfig = () => {
    const store = createStore(
        combineReducers({
            user: User,
            restaraunts: Restaraunt,
            dishes: Dish,
            reviews: Review,
            cart: Cart,
            ...createForms({ feedback: InitialFeedback }),
            ...createForms({ registeruser: RegisterUserDetails }),
            ...createForms({ registerres: RegisterRestarauntDetails }),
            ...createForms({ addDish: addDishDetails })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};
