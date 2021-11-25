import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';
import {Provider} from 'react-redux';

import TestPage from './test';

describe('<TestPage />', () => {
    const getTestResultSpy = jest.spyOn(actionCreators, 'getTestResult').mockReturnValue({type: 'mockup'});
    let mockStore = getMockStore({
        alcohol: {
            alcohol_info: [
                {id: 1, name: 'mockName', sool_image: 'mockImage', alcohol_content: 3, price: 29000, rating: 3},
            ],
        },
    });
    let testPage;
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
        testPage = (
            <Router history={history}>
                <Provider store={mockStore}>
                    <TestPage />
                </Provider>
            </Router>
        );
    });

    it('should request infomation', () => {
        const component = mount(testPage);
        expect(component.find('.taste-test').length).toBe(1);
    });

    it('should handle click', () => {
        const component = mount(testPage);
        component.find('.answer-section button').at(0).simulate('click');
        component.find('.answer-section button').at(0).simulate('click');
        component.find('.answer-section button').at(0).simulate('click');
        component.find('.answer-section button').at(0).simulate('click');
        expect(history.location.pathname).toBe('/rec');
    });

    afterAll(() => {
        getTestResultSpy.mockRestore();
    });
});
