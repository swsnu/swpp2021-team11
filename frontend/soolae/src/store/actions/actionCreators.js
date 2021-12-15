import * as actionTypes from './actionTypes';
import axios from 'axios';
import {push} from 'connected-react-router';

const recommendServer = 'http://api.fkr.kr:8081';

export const signUp = (data) => {
    return (dispatch) => {
        return axios.post('/api/signup/', data).then(() => {
            dispatch({type: actionTypes.SIGNUP});
            dispatch(push('/main/'));
        });
    };
};
export const signIn = (data) => {
    return (dispatch) => {
        return axios.post('/api/signin/', data).then(() => {
            dispatch({type: actionTypes.SIGNIN});
            dispatch(push('/main/'));
        });
    };
};

export const signOut = () => {
    return (dispatch) => {
        return axios.get('/api/signout/').then(() => {
            dispatch({type: actionTypes.SIGNOUT});
            dispatch(push('/test/'));
        });
    };
};

export const getRecommendationList = () => {
    return (dispatch) => {
        return axios.get('/api/recommend/').then((res) => {
            dispatch({type: actionTypes.GET_RECOMMENDATION_LIST, recommended: res.data});
        });
    };
};

export const getReviewList = () => {
    return (dispatch) => {
        return axios.get('/api/review/').then((res) => {
            dispatch({type: actionTypes.GET_REVIEW_LIST, reviews: res.data});
        });
    };
};

export const getReview = (review_id) => {
    return (dispatch) => {
        return axios.get('/api/review/' + review_id + '/').then((res) => {
            dispatch({type: actionTypes.GET_REVIEW, review: res.data});
        });
    };
};

export const postReview = (new_review) => {
    return (dispatch) => {
        return axios.post('/api/review/', new_review).then((res) => {
            dispatch({type: actionTypes.POST_REVIEW, review: res.data});
            dispatch(push('/review/' + res.data.id));
        });
    };
};

export const getAlcoholInfo_ = (data) => {
    return {type: actionTypes.GET_ALCOHOL_INFO, alcohol_info: data};
};

export const getAlcoholInfo = (id) => {
    return (dispatch) => {
        return axios.get('/api/alcohol/' + id).then((res) => dispatch(getAlcoholInfo_(res.data)));
    };
};

export const getTestResult = (userId, answers) => {
    return (dispatch) => {
        console.log(answers);
        return axios
            .post(recommendServer + '/test/' + userId, {
                answer: answers
            })
            .then(() => axios.get(recommendServer + '/recommend/' + userId))
            .then((res) => {
                return dispatch({type: actionTypes.GET_TEST_RESULT, recommended: res.data.index, recUserId: userId});
            });
    };
};

export const getCategories_ = (data) => {
    return {type: actionTypes.GET_CATEGORIES, category: data};
};

export const getCategories = () => {
    return (dispatch) => {
        return axios.get('/api/category/').then((res) => dispatch(getCategories_(res.data)));
    };
};

export const getCategory_ = (data) => {
    return {type: actionTypes.GET_CATEGORY, selected: data};
};

export const getCategory = (id) => {
    return (dispatch) => {
        return axios.get('/api/category/' + id).then((res) => dispatch(getCategory_(res.data)));
    };
};

export const getCategoryAlcohols_ = (data) => {
    return {type: actionTypes.GET_CATEGORY_ALCOHOLS, category_alcohols: data};
};

export const getCategoryAlcohols = (id) => {
    return (dispatch) => {
        return axios.get('/api/category/' + id).then((res) => dispatch(getCategoryAlcohols_(res.data)));
    };
};

export const getAlcoholList_ = (data) => {
    return {type: actionTypes.GET_ALCOHOL_LIST, alcohol_list: data};
};

export const getAlcoholList = () => {
    return (dispatch) => {
        return axios.get('/api/alcohol/').then((res) => dispatch(getAlcoholList_(res.data)));
    };
};

export const getUserInfo_ = (data) => {
    return {type: actionTypes.GET_USER_INFO, user: data};
};

export const getUserInfo = (id) => {
    return (dispatch) => {
        return axios.get('/api/user/' + id).then((res) => dispatch(getUserInfo_(res.data)));
    };
};
