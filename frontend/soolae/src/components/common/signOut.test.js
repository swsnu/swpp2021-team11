import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import SignOut from './signOut';

describe('<SignOut />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signOut;
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signOut = (
            <Router history={history}>
                <SignOut />
            </Router>
        );
    });

    it('should render without errors', () => {
        const component = mount(signOut);
        const wrapper = component.find('.SignOut');
        expect(wrapper.length).toBe(1);
    });

    it('should redirect users to /signin when user click sign in', () => {
        const component = mount(signOut);
        component.find('.SignOut button').at(0).simulate('click');
        expect(history.location.pathname).toBe('/signin');
    });

    it('user can sign out', (done) => {
        const component = mount(signOut);
        const fetchSpy204 = jest.spyOn(global, 'fetch').mockResolvedValueOnce({status: 204});
        component.find('.SignOut button').at(1).simulate('click');
        setImmediate(() => {
            expect(fetchSpy204).toBeCalledTimes(1);
            expect(history.location.pathname).toBe('/test');
            done();
        });
    });

    it('case 401', (done) => {
        const component = mount(signOut);
        jest.spyOn(global, 'fetch').mockResolvedValue({status: 401});
        component.find('.SignOut button').at(1).simulate('click');
        setImmediate(() => {
            expect(spyAlert).toBeCalledWith('User is not logged in!');
            done();
        });
    });

    it('case 401', (done) => {
        const component = mount(signOut);
        jest.spyOn(global, 'fetch').mockResolvedValue({status: 404});
        component.find('.SignOut button').at(1).simulate('click');
        setImmediate(() => {
            expect(spyAlert).toBeCalledWith('try again');
            done();
        });
    });
});