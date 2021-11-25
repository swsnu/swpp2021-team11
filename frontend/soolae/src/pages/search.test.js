import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

import SearchPage from './search';

jest.mock('../components/search/search_alcohol', () => {
    return {
        __esModule: true,
        default: (props) => {return (<button onClick={() => {props.onClick(3);}}>test</button>);}
    };
});

describe('<MainPage />', () => {
    let searchPage, history;
    
    beforeEach(() => {
        history = createMemoryHistory();
        searchPage = (
            <Router history={history}>
                <SearchPage />
            </Router>

        );
    });
    
    it('should render without errors', () => {
        const component = mount(searchPage);
        expect(component.length).toBe(1);
        component.find('button').simulate('click');
        expect(history.location.pathname).toBe('/alcohol/3');
    });
});
