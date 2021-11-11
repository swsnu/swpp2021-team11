import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recommended:[],
    alcohol_info:[],
    category_alcohols:[],
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_RECOMMENDATION_LIST:
        return {...state, recommended: action.recommended};
    case actionTypes.GET_ALCOHOL_INFO:
        return {...state, alcohol_info: [...state.alcohol_info, action.alcohol_info]};
    case actionTypes.GET_TEST_RESULT:
        return {...state, recommended: action.recommended};
    case actionTypes.GET_CATEGORY_ALCOHOLS:
        return {...state, category_alcohols: action.category_alcohols};
    case actionTypes.GET_ALCOHOL_LIST:
        return {...state, alcohol_list: action.alcohol_list};
    default:
        return state;
    }
};

export default reducer;