import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getRecommendationList = () => {
    return dispatch => {
        return axios.get('/api/recommend/')
            .then(res => {dispatch({type: actionTypes.GET_RECOMMENDATION_LIST, recommended: res.data});});
    };
};

export const getReviewList = () => {
    return dispatch => {
        return axios.get('/api/review/')
            .then(res => {dispatch({type: actionTypes.GET_REVIEW_LIST, reviews: res.data});});
    };
};

export const getTestResult = () => {
    return dispatch => {
        return axios.get('/api/test/')
            .then(res => {dispatch({type: actionTypes.GET_TEST_RESULT, recommended: res.data});});
    };
};