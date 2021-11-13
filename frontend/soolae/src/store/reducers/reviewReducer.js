import * as actionTypes from '../actions/actionTypes';

const initialState = {
    reviews: [],
    review_list: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_REVIEW_LIST:
        return {...state, reviews: action.reviews};
    case actionTypes.GET_REVIEW:
        return {...state, review_list: [...state.review_list, action.review]};
    default:
        return state;
    }
};

export default reducer;