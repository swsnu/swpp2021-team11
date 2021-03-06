import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recommended: [],
    alcohol_info: [],
    category_alcohols: [],
    alcohol_list: [],
    test_result: [], 
    recUserId: -1
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.GET_RECOMMENDATION_LIST:
        return {...state, recommended: action.recommended};
    case actionTypes.GET_ALCOHOL_INFO:
        if(!state.alcohol_info.map(alcohol => alcohol.id).includes(action.alcohol_info.id))
            return {...state, alcohol_info: [...state.alcohol_info, action.alcohol_info]};
        else
            return state;
    case 'setUid':
        return {...state, recUserId: action.uid};
    case actionTypes.GET_ALCOHOL_LIST:
        return {...state, alcohol_list: action.alcohol_list};
    case actionTypes.GET_TEST_RESULT:
        return {...state, test_result: action.recommended, recUserId: action.recUserId};
    case actionTypes.GET_CATEGORY_ALCOHOLS:
        return {...state, category_alcohols: [...state.category_alcohols, action.category_alcohols]};
    default:
        return state;
    }
};

export default reducer;
