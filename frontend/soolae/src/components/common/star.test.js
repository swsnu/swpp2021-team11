import React from 'react';
import {mount} from 'enzyme';

import StarRate from './star';

describe('<Star />', () => {
    it('should render without errors', () => {
        const component = mount(<StarRate rate={3} />);
        const wrapper = component.find('.StarRate');
        expect(wrapper.text()).toBe('★★★☆☆');
    });
});
