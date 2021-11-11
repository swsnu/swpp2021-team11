import * as actionTypes from '../actions/actionTypes';

const initialState = {
    reviews: [],
    selected: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_REVIEW_LIST:
        return {...state, reviews: action.reviews};
    case actionTypes.GET_REVIEW:
        return {...state, selected: action.review};
    default:
        return state;
    }
};

export default reducer;