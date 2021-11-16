import React from 'react';
import {mount} from 'enzyme';

import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import CategoryList from './category_list';
import {Provider} from 'react-redux';

describe('<UserName />', () => {
    const getCategoriesSpy = jest.spyOn(actionCreators, 'getCategories').mockReturnValue({type: 'mockup'});
    let mockStore = getMockStore({category: {category_list: []}});
    let mockOnClick = jest.fn();
    let categoryList;
    
    it('should request category info when redux state is empty', () => {
        mockOnClick.mockClear();
        categoryList = (
            <Provider store={mockStore}>
                <CategoryList onClick={mockOnClick}/>
            </Provider>
        );
        mount(categoryList);
        expect(getCategoriesSpy).toBeCalledTimes(1);
    });

    it('should call when user click button', () => {
        mockStore = getMockStore({category: {category_list: [{id: 1, name: 'name1'}, {id: 2, name: 'name2'}]}});
        mockOnClick.mockClear();
        categoryList = (
            <Provider store={mockStore}>
                <CategoryList onClick={mockOnClick}/>
            </Provider>
        );
        const component = mount(categoryList);
        const wrapper = component.find('.category_list li button');
        wrapper.at(0).simulate('click');
        expect(mockOnClick).toBeCalledWith(1);
    });
});
