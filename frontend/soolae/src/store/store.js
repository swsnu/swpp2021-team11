import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import alcoholReducer from './reducers/alcoholReducer';
import categoryReducer from './reducers/categoryReducer';
import userReducer from './reducers/userReducer';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    user: userReducer,
    alcohol: alcoholReducer,
    category: categoryReducer,
    router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)));

export default store;