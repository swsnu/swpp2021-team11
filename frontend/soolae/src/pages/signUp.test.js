import React from 'react';
import {mount} from 'enzyme';
<<<<<<< HEAD
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';
import SignUp from './signUp';

const stubInitialState = {
    alcohol: {},
    review: {},
    category: {},
    user: {}
};

const mockStore = getMockStore(stubInitialState);

describe('<SignUp />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signUp;
=======
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import SignUp from './signUp';

describe('<SignIn />', () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    let history;
    let signUp;
    let fetchSpy;

>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signUp = (
<<<<<<< HEAD
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <SignUp />
                </ConnectedRouter>
            </Provider>
        );
    });

=======
            <Router history={history}>
                <SignUp />
            </Router>
        );
    });

    afterEach(() => {
        if(fetchSpy !== undefined) fetchSpy.mockRestore();
    });

>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
    it('should render without errors', () => {
        const component = mount(signUp);
        const wrapper = component.find('.signup');
        expect(wrapper.length).toBe(1);
    });

<<<<<<< HEAD
    it('should set state properly on username and password input', () => {
        const component = mount(signUp);
        const instance = component.find(SignUp.WrappedComponent).instance();
        component.find('.form-group input').at(0).simulate('change', {target: {value: 'swpp'}});
        component.find('.form-group input').at(1).simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
        component.find('.form-group input').at(2).simulate('change', {target: {value: 'swppteam11'}});
        expect(instance.state.username).toEqual('swpp');
        expect(instance.state.email).toEqual('swpp@snu.ac.kr');
        expect(instance.state.password).toEqual('swppteam11');
    });

    it('should call alert() with blank input', (done) => {
        const component = mount(signUp);
        component.find('.footer button').simulate('click');
        expect(spyAlert).toBeCalledWith('Enter username, email and password');
        done();
    });

    it('should call signin() on clicking sign in button', (done) => {
        const spySignUp = jest.spyOn(actionCreators, 'signup');
        const component = mount(signUp);
=======
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
        
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
        component.find('.form-group input').at(0).simulate('change', {target: {value: 'swpp'}});
        component.find('.form-group input').at(1).simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
        component.find('.form-group input').at(2).simulate('change', {target: {value: 'swppteam11'}});
        component.find('.footer button').simulate('click');
<<<<<<< HEAD
        expect(spySignUp).toHaveBeenCalledTimes(1);
        done();
    });
});
=======

        setImmediate(() => {
            expect(fetchSpy).toBeCalled();
            expect(spyAlert).toBeCalledWith('Account made successfully!');
            done();
        });
    });

});
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
