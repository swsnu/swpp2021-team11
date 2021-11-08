import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recommended:[]
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_RECOMMENDATION_LIST:
        return {...state, recommended: action.recommended};
    case actionTypes.GET_TEST_RESULT:
        return {...state, recommended: action.recommended};
    default:
        return state;
    }
};

export default reducer;