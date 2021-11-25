import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {connectRouter} from 'connected-react-router';

import {history, middlewares} from '../store/store';

const getMockReducer = jest.fn((initialState) => (state = initialState, action) => {
    return {...state, result: action};
});

export const getMockStore = (initialState) => {
    const mockAlcoholReducer = getMockReducer(initialState.alcohol);
    const mockCategoryReducer = getMockReducer(initialState.category);
    const mockUserReducer = getMockReducer(initialState.user);
    const rootReducer = combineReducers({
        alcohol: mockAlcoholReducer,
        user: mockUserReducer,
        category: mockCategoryReducer,
        router: connectRouter(history),
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
    return mockStore;
};
