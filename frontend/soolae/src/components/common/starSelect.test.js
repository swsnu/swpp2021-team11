import React from 'react';
import {mount} from 'enzyme';

import StarRateSelect from './starSelect';

describe('<Star />', () => {
    const setRateMock = jest.fn();
    it('should render without errors', () => {
        const component = mount(<StarRateSelect rate={3} setRate={setRateMock} />);
        let wrapper = component.find('.StarRate');
        expect(wrapper.text()).toBe('★★★☆☆');
        wrapper = component.find('.StarRate button').at(4).simulate('click');
        expect(setRateMock).toBeCalledWith(5);
    });
});
