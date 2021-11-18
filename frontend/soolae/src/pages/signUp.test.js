import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import SignUp from './signUp';

describe('<SignIn />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signUp;
    let fetchSpy;

    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signUp = (
            <Router history={history}>
                <SignUp />
            </Router>
        );
    });

    afterEach(() => {
        if(fetchSpy !== undefined) fetchSpy.mockRestore();
    });

    it('should render without errors', () => {
        const component = mount(signUp);
        const wrapper = component.find('.signup');
        expect(wrapper.length).toBe(1);
    });

    it('user can sign up', (done) => {
        const component = mount(signUp);
        fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => {return 'test';}
        });
        
        component.find('.form-group').at(0).simulate('change', {target: {value: 'swpp'}});
        component.find('.form-group').at(1).simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
        component.find('.form-group').at(2).simulate('change', {target: {value: 'swppteam11'}});
        component.find('.footer button').simulate('click');

        setImmediate(() => {
            expect(fetchSpy).toBeCalledTimes(1);
            expect(spyAlert).toBeCalledWith('Account made successfully!');
            done();
        });
    });

    it('check failure', (done) => {
        const component = mount(signUp);
        const fetchSpy = jest.spyOn(global, 'fetch').mockRejectedValue();
        
        component.find('.form-group input').at(0).simulate('change', {target: {value: 'swpp'}});
        component.find('.form-group input').at(1).simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
        component.find('.form-group input').at(2).simulate('change', {target: {value: 'swppteam11'}});
        component.find('.footer button').simulate('click');

        setImmediate(() => {
            expect(fetchSpy).toBeCalled();
            expect(spyAlert).toBeCalledWith('Account made successfully!');
            done();
        });
    });

});
