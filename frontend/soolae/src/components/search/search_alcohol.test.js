import React from 'react';
import { shallow } from 'enzyme';

import SearchAlcohol from './search_alcohol';

describe('<SearchAlcohol />', () => {       
    const mockOnClick = jest.fn();
    it('should request infomation', () => {
        const component = shallow(<SearchAlcohol onClick={mockOnClick}/>);
        expect(component.find('WordSearchForm').length).toBe(1);
        expect(component.state().viewState).toBe('CATEGORY');
        component.instance().select_category_callback(1);
        expect(component.state().viewState).toBe('ALCOHOL');
        component.instance().select_alcohol_callback(1);
        expect(mockOnClick).toBeCalledWith(1);
    });
});
