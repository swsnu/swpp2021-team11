import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

import TitleBar from './title';

describe('<TitleBar />', () => {
    let titleBar, history;
    beforeEach(() => {
        history = createMemoryHistory();
        titleBar = (
            <Router history={history}>
                <TitleBar />
            </Router>
        );
    });
    it('should render without errors', () => {
        const component = mount(titleBar);
        const wrapper = component.find('.TitleBar');
        expect(wrapper.length).toBe(1);
    });

    it('When click logo, redirect to main. ', () => {
        const component = mount(titleBar);
        const wrapper = component.find('.TitleBar');
        wrapper.find('.TitleBar button').at(0).simulate('click');
        expect(history.location.pathname).toBe('/');
    });

    it('When click profile, redirect to profile page. ', () => {
        const component = mount(titleBar);
        const wrapper = component.find('.TitleBar');
        wrapper.find('.TitleBar button').at(1).simulate('click');
        expect(history.location.pathname).toBe('/profile');
    });
});
