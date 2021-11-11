import React from 'react';
import { withRouter } from 'react-router-dom'; 

const CategorySearchForm = props => {
    return (
        <ul className="category_search">
            {props.categorylist.map((category) => {
                return <li key = {category.id}><button onClick={() => {props.history.push('/search/'+category.id);}}>{category.name}</button></li>;
            })}
        </ul>
    );
};

export default withRouter(CategorySearchForm);