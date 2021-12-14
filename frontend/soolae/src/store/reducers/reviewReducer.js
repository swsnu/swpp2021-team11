import * as actionTypes from '../actions/actionTypes';

const initialState = {
    reviews: [],
    review_list: [],
    selected: null,
    is_authorized: false,
};

let index, deleted;

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_REVIEW_LIST:
        return {...state, reviews: action.reviews};
    case actionTypes.GET_REVIEW:
        return {...state,
            review_list: [...state.review_list, action.review],
            selected: action.review,
            is_authorized: action.is_authorized
        };
    case actionTypes.DELETE_REVIEW:
        index = state.review_list.indexOf(action.review);
        deleted = state.review_list.splice(index, 1);
        return {...state, review_list: deleted};
    default:
        return state;
    }
};

export default reducer;