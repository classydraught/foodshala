import * as actionTypes from "./ActionTypes";
export const Restaraunt = (
    state = {
        isLoading: true,
        errMess: null,
        restaraunts: []
    },
    action
) => {
    switch (action.type) {
        case actionTypes.ADD_RESTARAUNTS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                restaraunts: action.payload
            };

        case actionTypes.RESTARAUNTS_LOADING:
            return { ...state, isLoading: true, errMess: null, restaraunts: [] };

        case actionTypes.RESTARAUNTS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                restaraunts: []
            };
        default:
            return state;
    }
};
