import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users : []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_USER_INFO:
        return {...state, users: [...state.users, action.user]};
    default:
        return state;
    }
};

export default reducer;