import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selected:null,
    category:[]
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_CATEGORY:
        return {...state, selected: action.selected};
    case actionTypes.GET_CATEGORIES:
        return {...state, category: action.category};
    default:
        return state;
    }
};

export default reducer;