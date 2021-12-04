import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';
import SignIn from './signIn';

const stubInitialState = {
    alcohol: {},
    review: {},
    category: {},
    user: {}
};

const mockStore = getMockStore(stubInitialState);

describe('<SignIn />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signIn;
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signIn = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <SignIn />
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const component = mount(signIn);
        const wrapper = component.find('.SignIn');
        expect(wrapper.length).toBe(1);
    });

    it('should set state properly on username and password input', () => {
        const component = mount(signIn);
        const instance = component.find(SignIn.WrappedComponent).instance();
        component.find('#username-input').simulate('change', {target: {value: 'swpp'}});
        component.find('#pw-input').simulate('change', {target: {value: 'swppteam11'}});
        expect(instance.state.username).toEqual('swpp');
        expect(instance.state.password).toEqual('swppteam11');
    });

    it('should call alert() with blank input', (done) => {
        const component = mount(signIn);
        component.find('#login-button').simulate('click');
        expect(spyAlert).toBeCalledWith('Enter username and password');
        done();
    });

    it('should call signin() on clicking sign in button', (done) => {
        const spySignIn = jest.spyOn(actionCreators, 'signin');
        const component = mount(signIn);
        component.find('#username-input').simulate('change', {target: {value: 'swpp'}});
        component.find('#pw-input').simulate('change', {target: {value: 'swppteam11'}});
        component.find('#login-button').simulate('click');
        expect(spySignIn).toHaveBeenCalledTimes(1);
        done();
    });
});