import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';

import MainPage from './main';
import {getMockStore} from '../test-utils/mocks';

const stubInitialState = {
    alcohol: {
        recommended: [{id: 1}], alcohol_info: []
    },
};
const mockStore = getMockStore(stubInitialState);

jest.mock('../components/alcohol/alcohol_detail_info', () => {
    return {
        __esModule: true,
        default: (props) => {return (<div>{props.id}</div>);}
    };
});

describe('<MainPage />', () => {
    let mainPage, history;
    
    beforeEach(() => {
        history = createMemoryHistory();
        mainPage = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <MainPage />
                </Router>
            </Provider>
        );
    });
    
    it('should render without errors', () => {
        const component = mount(mainPage);
        const wrapper = component.find('.MainPage');
        expect(wrapper.length).toBe(1);
    });
});
