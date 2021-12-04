import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users : [],
    selected: null,
    myId: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
    case actionTypes.GET_USER_INFO:
        return {...state, users: [...state.users, action.user], selected: action.user};
    case actionTypes.SIGNIN:
    case actionTypes.SIGNUP:
        console.log(action.id);
        return {...state, myId: action.id};
    case actionTypes.SIGNOUT:
        return {...state, myId: null};
    default:
        return state;
    }
};

export default reducer;