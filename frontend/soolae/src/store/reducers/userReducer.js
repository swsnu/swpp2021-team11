import * as actionTypes from '../actions/actionTypes';

const initialState = {
    selected: null,
    logged_in: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.CHECK_LOGIN:
        if(action.logged_in == 'False')
            return {...state, logged_in: false};
        else if (action.logged_in == 'True')
            return {...state, logged_in: true};
        else
            return {state};
    case actionTypes.SIGNIN:
    case actionTypes.SIGNUP:
        console.log(action);
        return {
            ...state,
            selected: action.user,
            logged_in: true,
        };
    case actionTypes.GET_USER_INFO:
    case actionTypes.EDIT_PROFILE: 
        return {
            ...state,
            selected: action.user,
            logged_in: action.logged_in
        };
    case actionTypes.SIGNOUT:
        return {...state, selected: null, logged_in: false};
    default:
        return state;
    }
};

export default reducer;