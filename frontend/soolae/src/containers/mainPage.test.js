import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router';
import { createMemoryHistory } from "history";

import MainPage from './mainPage'

describe('<MainPage />', () => {
    let mainPage, history;
    beforeEach(() => {
        history = createMemoryHistory();
        mainPage = (
            <Router history={history}>
                <MainPage />
            </Router>
        );
    });
    it('should render without errors', () => {
        const component = mount(mainPage);
        const wrapper = component.find('.MainPage');
        expect(wrapper.length).toBe(1);
    });

});