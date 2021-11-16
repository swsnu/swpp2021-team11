import React from 'react';
import {mount} from 'enzyme';

import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import CategoryAlcoholList from './category_alcohol_list';
import {Provider} from 'react-redux';

describe('<CategoryAlcoholList />', () => {
    const getCategoriesSpy = jest.spyOn(actionCreators, 'getCategoryAlcohols').mockReturnValue({type: 'mockup'});
    let mockStore = getMockStore({alcohol: {category_alcohols: [{id: 1, alcohol_list: [{id: 1, name: 'mockAlcohol'}]}]}});
    let mockOnClick = jest.fn();
    let categoryAlcoholList;
    
    it('should request category info when redux state is empty', () => {
        mockOnClick.mockClear();
        categoryAlcoholList = (
            <Provider store={mockStore}>
                <CategoryAlcoholList id={2} onClick={mockOnClick}/>
            </Provider>
        );
        mount(categoryAlcoholList);
        expect(getCategoriesSpy).toBeCalledTimes(1);
    });

    it('should call onClick when user click button', () => {
        mockOnClick.mockClear();
        categoryAlcoholList = (
            <Provider store={mockStore}>
                <CategoryAlcoholList id={1} onClick={mockOnClick}/>
            </Provider>
        );
        const component = mount(categoryAlcoholList);
        const wrapper = component.find('.alcohol_list li button');
        wrapper.at(0).simulate('click');
        expect(mockOnClick).toBeCalledWith(1);
    });
});
