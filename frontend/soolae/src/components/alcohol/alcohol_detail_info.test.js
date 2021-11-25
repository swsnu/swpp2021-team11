import React from 'react';
import {mount} from 'enzyme';

import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import {Provider} from 'react-redux';

import AlcoholDetailInfo from './alcohol_detail_info';

describe('<AlcoholDetailInfo />', () => {
    const getAlcoholInfoSpy = jest.spyOn(actionCreators, 'getAlcoholInfo').mockReturnValue({type: 'mockup'});
    let mockStore = getMockStore({alcohol: {alcohol_info: [{id: 1, name: 'mockName', sool_image: 'mockImage', alcohol_content: 3, price: 29000, rating: 3}]}});
    let alcoholDetailInfo;
    
    it('should request infomation', () => {
        alcoholDetailInfo = (
            <Provider store={mockStore}>
                <AlcoholDetailInfo id={2}/>
            </Provider>
        );
        mount(alcoholDetailInfo);
        expect(getAlcoholInfoSpy).toBeCalledTimes(1);
    });

    it('should show correct info', () => {
        alcoholDetailInfo = (
            <Provider store={mockStore}>
                <AlcoholDetailInfo id={1}/>
            </Provider>
        );
        const component = mount(alcoholDetailInfo);
        const wrapper = component.find('.AlcoholDetailInfo');
        expect(wrapper.find('h1').text()).toBe('Name: mockName');
    });
});
