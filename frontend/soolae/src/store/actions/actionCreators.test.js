import axios from 'axios';
import store from '../store';
import * as actionCreators from './actionCreators';

describe('actionCreators.js', () => {
    const spyPost = jest.spyOn(axios, 'post')
        .mockImplementation(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                    data: {id: 0}
                };
                resolve(result);
            });
        });
    const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                };
                resolve(result);
            });
        });
    // const spyPut = jest.spyOn(axios, 'put')
    //     .mockImplementation(() => {
    //         return new Promise((resolve) => {
    //             const result = {
    //                 status: 201,
    //             };
    //             resolve(result);
    //         });
    //     });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('signUp should post user correctly', (done) => {
        store.dispatch(actionCreators.signUp()).then(() => {
            expect(spyPost).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('signIn should sign in user correctly', (done) => {
        store.dispatch(actionCreators.signIn()).then(() => {
            expect(spyPost).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('signOut should get user correctly', (done) => {
        store.dispatch(actionCreators.signOut()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getRecommendationList should get recommedation list correctly', (done) => {
        store.dispatch(actionCreators.getRecommendationList()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getReviewList should get review list correctly', (done) => {
        store.dispatch(actionCreators.getReviewList()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getReview should get review correctly', (done) => {
        store.dispatch(actionCreators.getReview()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('postReview should post review correctly', (done) => {
        store.dispatch(actionCreators.postReview()).then(() => {
            expect(spyPost).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getAlcoholInfo should get alcohol info correctly', (done) => {
        store.dispatch(actionCreators.getAlcoholInfo()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getTestResult should get test result correctly', (done) => {
        store.dispatch(actionCreators.getTestResult()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getCategories should get categories correctly', (done) => {
        store.dispatch(actionCreators.getCategories()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getCategory should get category correctly', (done) => {
        store.dispatch(actionCreators.getCategory()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getCategoryAlcohols should get category alcohols correctly', (done) => {
        store.dispatch(actionCreators.getCategoryAlcohols()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getUserInfo should get user info correctly', (done) => {
        store.dispatch(actionCreators.getUserInfo()).then(() => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            done();
        });
    });
});