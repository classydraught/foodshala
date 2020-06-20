import * as actionTypes from "./ActionTypes";
export const Review = (
    state = {
        isLoading: true,
        errMess: null,
        reviews: []
    },
    action
) => {
    switch (action.type)
    {
        case actionTypes.ADD_REVIEWS:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                reviews: action.payload
            };

        case actionTypes.REVIEWS_LOADING:
            return { ...state, isLoading: true, errMess: null, reviews: [] };

        case actionTypes.REVIEWS_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload,
                reviews: []
            };
        case actionTypes.ADD_USER_REVIEW:
            return {
                ...state,
                reviews: state.reviews.concat(action.payload)
            }
        default:
            return state;
    }
};
