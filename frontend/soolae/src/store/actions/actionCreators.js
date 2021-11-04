import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getRecommendationList = () => {
    return dispatch => {
        return axios.get('/api/recommend/')
            .then(res => {dispatch({type: actionTypes.GET_RECOMMENDATION_LIST, recommended: res.data});});
    };
};
