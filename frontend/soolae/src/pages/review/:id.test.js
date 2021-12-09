import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {getMockStore} from '../../test-utils/mocks';
//import * as actionCreators from '../store/actions/actionCreators';
import ReviewDetailPage from './:id';

const stubInitialState = {
    alcohol: {},
    review: {
        review_list: []
    },
    category: {},
    user: {}
};

const mockStore = getMockStore(stubInitialState);

describe('<ReviewDetailPage />', () => {
    let reviewDetailPage;
    beforeEach(() => {
        reviewDetailPage = (

            <Provider store={mockStore}>
                <ReviewDetailPage match={{params: {id: 0}}}/>
            </Provider>
        );
    });
    it('should render without errors', () => {
        const component = mount(reviewDetailPage);
        expect(component.find('.review_detail_page').length).toBe(1);
    });
});