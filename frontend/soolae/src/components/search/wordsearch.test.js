import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/actionCreators';
import WordSearch from './wordsearch';

const stubInitialState1 = {
    alcohol: {alcohol_list: [{id: 0, name: 'test_sool'}]},
    review: {},
    category: {},
    user: {}
};

const stubInitialState2 = {
    alcohol: {alcohol_list: []},
    review: {},
    category: {},
    user: {}
};


const mockStore1 = getMockStore(stubInitialState1);
const mockStore2 = getMockStore(stubInitialState2);

describe('<WordSearch />', () => {
    let history;
    let wordSearch;

    it('should render without errors', () => {
        history = createMemoryHistory();
        wordSearch = (
            <Provider store={mockStore1}>
                <ConnectedRouter history={history}>
                    <WordSearch />
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(wordSearch);
        const wrapper = component.find('.alcohol_list');
        expect(wrapper.length).toBe(1);
    });

    it('should render without errors', () => {
        history = createMemoryHistory();
        wordSearch = (
            <Provider store={mockStore2}>
                <ConnectedRouter history={history}>
                    <WordSearch />
                </ConnectedRouter>
            </Provider>
        );
        const spyGetAlcoholList = jest.spyOn(actionCreators, 'getAlcoholList');
        const component = mount(wordSearch);
        const wrapper = component.find('.alcohol_list');
        expect(wrapper.length).toBe(1);
        expect(spyGetAlcoholList).toHaveBeenCalledTimes(1);
    });

});