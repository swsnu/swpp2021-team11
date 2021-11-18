import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import SignIn from './signIn';

describe('<SignIn />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signIn;

    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signIn = (
            <Router history={history}>
                <SignIn />
            </Router>
        );
    });

    it('should render without errors', () => {
        const component = mount(signIn);
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
