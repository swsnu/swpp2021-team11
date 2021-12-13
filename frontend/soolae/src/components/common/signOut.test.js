import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import SignOut from './signOut';

const stubInitialState = {
    alcohol: {},
    review: {},
    category: {},
    user: {}
};

const mockStore = getMockStore(stubInitialState);

describe('<SignOut />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signOut;
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signOut = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <SignOut />
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const component = mount(signOut);
        const wrapper = component.find('div');
        expect(wrapper.length).toBe(1);
    });
    /*
    it('should redirect users to /signin when user click sign in', () => {
        const component = mount(signOut);
        component.find('.SignOut button').at(0).simulate('click');
        expect(history.location.pathname).toBe('/signin');
    });
    */
    it('should call signout() on clicking sign out button', (done) => {
        const component = mount(signOut);
        const spySignOut = jest.spyOn(actionCreators, 'signOut')
            .mockImplementation(() => {return () => {};});
        component.find('div').find('#signout-button').at(0).simulate('click');
        expect(spySignOut).toHaveBeenCalledTimes(1);
        done();
    });
});
