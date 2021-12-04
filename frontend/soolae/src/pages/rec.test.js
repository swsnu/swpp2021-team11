import React from 'react';
import {mount} from 'enzyme';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';

import TestResultPage from './rec';
import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
    alcohol: {
        test_result: [{id: 1}]
    },
};


jest.mock('../components/alcohol/alcohol_detail_info', () => {
    return {
        __esModule: true,
        default: (props) => {return (<div>{props.id}</div>);}
    };
});



describe('<TestResultPage />', () => {
    let testResultPage, history;
    let mockStore;
    const spyGetTestResult = jest.spyOn(actionCreators, 'getTestResult').mockReturnValue({type: 'mockup'});
    beforeEach(() => {
        
    });
    
    it('should render without errors', () => {
        history = createMemoryHistory();
        mockStore = getMockStore(stubInitialState);
        testResultPage = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <TestResultPage />
                </Router>
            </Provider>
        );
        const component = mount(testResultPage);
        expect(component.length).toBe(1);
    });

    it('should get recommendations', () => {
        const emptyInitialState = {
            alcohol: {
                test_result: []
            },
        };
        history = createMemoryHistory();
        mockStore = getMockStore(emptyInitialState);
        testResultPage = (
            <Provider store={mockStore}>
                <Router history={history}>
                    <TestResultPage />
                </Router>
            </Provider>
        );
        mount(testResultPage);
        expect(spyGetTestResult).toBeCalled();
    });
});
