import * as actionTypes from "./ActionTypes";
export const Dish = (
    state = {
        isLoading: true,
        errMess: null,
        dishes: []
    },
    action
) => {
    switch (action.type) {
        case actionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                dishes: action.payload
            };

        case actionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] };
        case actionTypes.ADD_NEW_DISH:
            return { ...state, dishes: state.dishes.concat(action.payload) };

        case actionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                dishes: []
            };
        default:
            return state;
    }
};
