import React from 'react';

import AlcoholListForm from '../../components/categoryDetail/alcoholListForm';

class CategoryDetail extends React.Component{
    state = {
        selected_category : {id: 1, category:'Category 1', info: 'Category 1 info'},
        alcohols : [
            {id: 1, category_id: 1, name: 'alcohol 1 name', info: 'alcohol 1 info'},
            {id: 2, category_id: 1, name: 'alcohol 2 name', info: 'alcohol 2 info'},
            {id: 3, category_id: 1, name: 'alcohol 3 name', info: 'alcohol 3 info'},
            {id: 4, category_id: 1, name: 'alcohol 4 name', info: 'alcohol 4 info'},
            {id: 5, category_id: 1, name: 'alcohol 5 name', info: 'alcohol 5 info'},
        ]
    }; // category example
    // url에서 id받아와서 selected_category, alcohols 찾기

    render() {
        return(
            <div className="category_detail">
                <div className="category_name">
                    {this.state.selected_category.category}
                </div>
                <div className="alcohol_list">
                    <AlcoholListForm
                        alcohols = {this.state.alcohols}
                    />
                </div>
            </div>
        );
    }
}

export default CategoryDetail;