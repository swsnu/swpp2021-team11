import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {getMockStore} from '../../test-utils/mocks';
//import * as actionCreators from '../store/actions/actionCreators';
import AlcoholDetailPage from './:id';

const stubInitialState = {
    alcohol: {
        alcohol_info: []
    },
    review: {},
    category: {},
    user: {}
};

const mockStore = getMockStore(stubInitialState);

describe('<AlcoholDetailPage />', () => {
    let alcoholDetailPage;
    beforeEach(() => {
        alcoholDetailPage = (
            <Provider store={mockStore}>
                <AlcoholDetailPage match={{params: {id: 0}}}/>
            </Provider>
        );
    });
    it('should render without errors', () => {
        const component = mount(alcoholDetailPage);
        expect(component.find('.AlcoholDetailInfo').length).toBe(1);
    });
});