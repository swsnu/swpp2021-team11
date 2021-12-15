import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../test-utils/mocks';
//import * as actionCreators from '../store/actions/actionCreators';
import ReviewList from './reviewList';

const stubInitialState = {
    alcohol: {},
    review: {
        reviews: [],
        review_list: [{id:0}]
    },
    category: {},
    user: {
        logged_in: true
    }
};

const mockStore = getMockStore(stubInitialState);

describe('<ReviewList />', () => {
    let history;
    let reviewList;
    beforeEach(() => {
        history = createMemoryHistory();
        reviewList = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <ReviewList/>
                </ConnectedRouter>
            </Provider>
        );
    });
    it('should render without errors', () => {
        const component = mount(reviewList);
        expect(component.find('.review_list').length).toBe(1);
    });
});