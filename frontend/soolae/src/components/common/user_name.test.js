import React from 'react';
import {mount} from 'enzyme';

import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import UserName from './user_name';
import {Provider} from 'react-redux';

describe('<UserName />', () => {
    const getUserInfoSpy = jest.spyOn(actionCreators, 'getUserInfo').mockReturnValue({type: 'mockup'});
    let mockStore = getMockStore({user: {users: [{id: 1, username: 'mock'}]}});
    const userName = (id) => (
        <Provider store={mockStore}>
            <UserName id={id} />
        </Provider>
    );

    it('should render without errors', () => {
        const component = mount(userName(1));
        const wrapper = component.find('.UserName');
        expect(wrapper.text()).toBe('mock');
    });

    it('should get correct user info', () => {
        const component = mount(userName(2));
        const wrapper = component.find('.UserName');
        expect(wrapper.text()).toBe('loading...');
        expect(getUserInfoSpy).toBeCalledTimes(1);
    });
});
