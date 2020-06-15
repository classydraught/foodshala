import * as actionTypes from "./ActionTypes";
export const Cart = (
    state = {
        isEmpty: true,
        errMess: null,
        cart: {}
    },
    action
) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            console.log(action.payload);
            return {
                ...state,
                isEmpty: false,
                cart: action.payload,
                errMess: null,
            };

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                isEmpty: true,
                cart: {},
                errMess: null
            };
        default:
            return state;
    }
};
