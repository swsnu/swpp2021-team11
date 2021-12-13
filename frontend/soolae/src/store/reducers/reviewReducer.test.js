import reducer from './reviewReducer';
import * as actionTypes from '../actions/actionTypes';

const stubReview = {
    id: 0,
    title: 'test_title',
    content: 'test_content'
};

describe('Todo Reducer', () => {
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({reviews: [], review_list: []});
    });
  
    it('should get review list', () => {
        const newState = reducer({reviews: [], review_list: []}, {
            type: actionTypes.GET_REVIEW_LIST,
            reviews: [stubReview]
        });
        expect(newState).toEqual({
            reviews: [stubReview],
            review_list: []
        });
    });

    it('should get review list', () => {
        const newState = reducer({reviews: [], review_list: []}, {
            type: actionTypes.GET_REVIEW,
            review: stubReview
        });
        expect(newState).toEqual({
            reviews: [],
            review_list: [stubReview]
        });
    });

});