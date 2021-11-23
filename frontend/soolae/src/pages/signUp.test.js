import React from 'react';
import {mount} from 'enzyme';
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
    beforeEach(() => {
        spyAlert.mockClear();
        history = createMemoryHistory();
        signUp = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <SignUp />
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const component = mount(signUp);
        const wrapper = component.find('.signup');
        expect(wrapper.length).toBe(1);
    });

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
        component.find('.form-group input').at(0).simulate('change', {target: {value: 'swpp'}});
        component.find('.form-group input').at(1).simulate('change', {target: {value: 'swpp@snu.ac.kr'}});
        component.find('.form-group input').at(2).simulate('change', {target: {value: 'swppteam11'}});
        component.find('.footer button').simulate('click');
        expect(spySignUp).toHaveBeenCalledTimes(1);
        done();
    });
});