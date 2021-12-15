import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';
import Profile from './profile';

const stubInitialState = {
    alcohol: {},
    review: {},
    category: {},
    user: {selected: {
        'id': 1, 
        'username': 'swpp', 
        'email': 'swpp@snu.ac.kr', 
        'reviews': [
            {
                'id': 1,
                'title': 'test_title',
                'content': 'test_content'
            }
        ]}}
};

const mockStore = getMockStore(stubInitialState);

describe('<Profile />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const spyRequireLogin = jest.spyOn(actionCreators, 'requireLogin');
    let history;
    let profile;
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        profile = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Profile requireLogin={spyRequireLogin}/>
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const component = mount(profile);
        const wrapper = component.find('.profile');
        expect(wrapper.length).toBe(1);
        expect(spyRequireLogin).toBeCalledTimes(1);
    });
});