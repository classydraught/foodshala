import * as actionTypes from "./ActionTypes";
export const User = (
    state = {
        isLoading: false,
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
                isLoading: false,
                LoggedIn: true,
                errMess: null,
                UserData: action.payload
            };
        case actionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true,
                LoggedIn: false,
                errMess: null,
                UserData: {}
            }
        case actionTypes.LOGOUT_USER:
            localStorage.clear();
            return {
                ...state,
                isLoading: false,
                LoggedIn: false,
                errMess: null,
                UserData: action.payload
            };
        case actionTypes.FAILED_USERLOGIN:
            localStorage.clear();
            return {
                ...state,
                isLoading: false,
                LoggedIn: false,
                errMess: null,
                UserData: {}
            }
        case actionTypes.ADD_NEW_DISH:
            return {
                ...state,
                UserData: {
                    ...state.UserData, dishes: state.UserData.dishes.concat(action.payload)
                }
            }
        case actionTypes.ADD_ORDER_USER:
            return {
                ...state,
                UserData: {
                    ...state.UserData, userorders: state.UserData.userorders.concat(action.payload)
                }
            }
        default:
            return state;
    }
};


