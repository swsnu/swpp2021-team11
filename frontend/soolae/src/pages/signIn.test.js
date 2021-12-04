import React from 'react';
import {mount} from 'enzyme';
<<<<<<< HEAD
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

=======
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import SignIn from './signIn';

>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
describe('<SignIn />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signIn;
<<<<<<< HEAD
=======

>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signIn = (
<<<<<<< HEAD
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <SignIn />
                </ConnectedRouter>
            </Provider>
=======
            <Router history={history}>
                <SignIn />
            </Router>
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
        );
    });

    it('should render without errors', () => {
        const component = mount(signIn);
<<<<<<< HEAD
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
=======
        const wrapper = component.find('.Login');
        expect(wrapper.length).toBe(1);
    });

    it('handle for empty input', () => {
        const component = mount(signIn);
        component.find('#login-button').simulate('click');
        expect(spyAlert).toBeCalledWith('Enter email and password');
    });

    it('user can sign in', (done) => {
        const component = mount(signIn);
        const fetchSpy204 = jest.spyOn(global, 'fetch').mockResolvedValue({status: 204});
        
        component.find('#email-input').simulate('change', {target: {value: 'swpp'}});
        component.find('#pw-input').simulate('change', {target: {value: 'swppteam11'}});
        component.find('#login-button').simulate('click');

        setImmediate(() => {
            expect(fetchSpy204).toBeCalledTimes(1);
            expect(history.location.pathname).toBe('/main');
            done();
        });
    });

    it('case 401', (done) => {
        const component = mount(signIn);
        const fetchSpy401 = jest.spyOn(global, 'fetch').mockResolvedValue({status: 401});
        
        component.find('#email-input').simulate('change', {target: {value: 'swpp'}});
        component.find('#pw-input').simulate('change', {target: {value: 'swppteam11'}});

        component.find('#login-button').simulate('click');

        setImmediate(() => {
            expect(fetchSpy401).toBeCalled();
            expect(spyAlert).toBeCalledWith('Email or Password is wrong');
            done(); 
        });
    });

    it('case different error', (done) => {
        const component = mount(signIn);
        const fetchSpy401 = jest.spyOn(global, 'fetch').mockResolvedValue({status: 404});
        
        component.find('#email-input').simulate('change', {target: {value: 'swpp'}});
        component.find('#pw-input').simulate('change', {target: {value: 'swppteam11'}});

        component.find('#login-button').simulate('click');
        
        setImmediate(() => {
            expect(fetchSpy401).toBeCalled();
            expect(spyAlert).toBeCalledWith('try again');
            done(); 
        });
    });
});
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
