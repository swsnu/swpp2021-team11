import * as actionTypes from '../actions/actionTypes';

const initialState = {
    reviews: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_REVIEW_LIST:
        return {...state, reviews: action.reviews};
    default:
        return state;
    }
};

export default reducer;