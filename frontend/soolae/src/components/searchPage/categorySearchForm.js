import React from 'react';
import { withRouter } from 'react-router-dom'; 

const CategorySearchForm = props => {
    return (
        <div className="category_search">
            {props.categorylist.map((category) => {
                return <button key = {category.id} onClick={() => {props.history.push('/search/'+category.id);}}>{category.category}</button>;
            })};
        </div>
    );
};

export default withRouter(CategorySearchForm);