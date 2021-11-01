import React from 'react';

import CategorySearchForm from '../../components/searchPage/categorySearchForm';

class SearchPage extends React.Component{
    state = {
        category_list : [
            {id: 1, category:'Category 1'},
            {id: 2, category:'Category 2'},
            {id: 3, category:'Category 3'},
            {id: 4, category:'Category 4'},
            {id: 5, category:'Category 5'},
        ]
    }
    render() {
        return (
            <CategorySearchForm
                categorylist = {this.state.category_list}
            />
        );
    }
}

export default SearchPage;