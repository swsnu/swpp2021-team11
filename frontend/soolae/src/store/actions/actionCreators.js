import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getRecommendationList = () => {
    return dispatch => {
        return axios.get('/api/recommend/')
            .then(res => {dispatch({type: actionTypes.GET_RECOMMENDATION_LIST, recommended: res.data});});
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