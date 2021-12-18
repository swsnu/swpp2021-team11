import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../test-utils/mocks';
import * as actionCreators from '../store/actions/actionCreators';
import WriteReviewPage from './write-review';

const stubInitialState = {
    alcohol: {},
    review: {},
    category: {},
    user: {selected: {
        'id': 1, 
        'username': 'swpp', 
        'email': 'swpp@snu.ac.kr', 
        'reviews': [
            {
                'id': 1,
                'title': 'test_title',
                'content': 'test_content'
            }
        ]}}
};

const mockStore = getMockStore(stubInitialState);

describe('<WriteReviewPage />', () => {
    let history;
    let writeReview;
    beforeEach(() => {
        history = createMemoryHistory();
        writeReview = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <WriteReviewPage />
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render without errors', () => {
        const component = mount(writeReview);
        const wrapper = component.find('.write_review_page');
        expect(wrapper.length).toBe(1);
    });

    it('should set state properly on input', () => {
        const component = mount(writeReview);
        const wrapper = component.find('.write_review_page');
        const instance = component.find(WriteReviewPage.WrappedComponent).instance();
        wrapper.find('input').at(0).simulate('change', {target: {value: 'test_title'}});
        wrapper.find('input').at(2).simulate('change', {target: {value: 'test_content'}});
        expect(instance.state.title).toEqual('test_title');
        expect(instance.state.content).toEqual('test_content');
    });

    it('should set state properly on clicking alcohol', () => {
        const spyGetCategories = jest.spyOn(actionCreators, 'getCategories')
            .mockImplementation(() => {return () => {[{id: 0, name: 'test_category'}];};});
        const component = mount(writeReview);
        const wrapper = component.find('.write_review_page');
        const instance = component.find(WriteReviewPage.WrappedComponent).instance();
        wrapper.find('.form-group').at(1).find('button').simulate('click');
        component.setProps({});
        expect(spyGetCategories).toHaveBeenCalledTimes(1);
        expect(instance.state.alcohol_select).toBe(true);
    });
});