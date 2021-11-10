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

export const getAlcoholInfo_ = (data) => {
    return { type: actionTypes.GET_ALCOHOL_INFO, alcohol_info:data};
};

export const getAlcoholInfo = (id) => {
    return dispatch => {
        return axios.get('/api/alcohol/' + id).then(res=> dispatch(getAlcoholInfo_(res.data)));
    };
};

export const getTestResult = () => {
    return dispatch => {
        return axios.get('/api/test/')
            .then(res => {dispatch({type: actionTypes.GET_TEST_RESULT, recommended: res.data});});
    };
};

export const getCategories_ = (data) => {
    return {type: actionTypes.GET_CATEGORIES, category:data};
};

export const getCategories = () => {
    return dispatch => {
        return axios.get('/api/category/').then(res=> dispatch(getCategories_(res.data)));
    };
};

export const getCategory_ = (data) => {
    return {type: actionTypes.GET_CATEGORY, selected:data};
};

export const getCategory = (id) => {
    return dispatch => {
        return axios.get('/api/category/' + id).then(res=> dispatch(getCategory_(res.data)));
    };
};

export const getCategoryAlcohols_ = (data) => {
    return {type: actionTypes.GET_CATEGORY_ALCOHOLS, category_alcohols:data};
};

export const getCategoryAlcohols = (id) => {
    return dispatch => {
        return axios.get('/api/category/alcohol/' + id).then(res => dispatch(getCategoryAlcohols_(res.data)));
    };
};