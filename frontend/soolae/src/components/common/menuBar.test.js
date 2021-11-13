import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

import MenuBar from './menuBar';

describe('<MenuBar />', () => {
    let menuBar, history;
    beforeEach(() => {
        history = createMemoryHistory();
        menuBar = (
            <Router history={history}>
                <MenuBar />
            </Router>
        );
    });
    it('should render without errors', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        expect(wrapper.length).toBe(1);
    });

    it('When click test, redirect to test. ', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        wrapper.find('.MenuBar button').at(0).simulate('click');
        expect(history.location.pathname).toBe('/test');
    });

    it('When click review, redirect to review list. ', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        wrapper.find('.MenuBar button').at(1).simulate('click');
        expect(history.location.pathname).toBe('/review');
    });

    it('When click main, redirect to main. ', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        wrapper.find('.MenuBar button').at(2).simulate('click');
        expect(history.location.pathname).toBe('/main');
    });

    it('When click back, it should go backpage. ', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        wrapper.find('.MenuBar button').at(3).simulate('click');
        expect(history.location.pathname).toBe('/');
    });

    it('When click search, redirect to search. ', () => {
        const component = mount(menuBar);
        const wrapper = component.find('.MenuBar');
        wrapper.find('.MenuBar button').at(4).simulate('click');
        expect(history.location.pathname).toBe('/search');
    });
});
