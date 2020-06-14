import * as actionTypes from "./ActionTypes";
export const User = (
    state = {
        LoggedIn: false,
        UserData: {},
        errMess: null
    },
    action
) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return {
                ...state,
                LoggedIn: true,
                errMess: null,
                UserData: action.payload
            };
        case actionTypes.LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                LoggedIn: false,
                errMess: null,
                UserData: action.payload
            };
        default:
            return state;
    }
};


