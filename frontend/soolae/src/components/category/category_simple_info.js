import React from 'react';
import {withRouter} from 'react-router-dom';

class CategorySimpleInfo extends React.Component {
    render(){
        const category = this.props.category;
        return (
            <li className='CategorySimpleInfo' key={category.id} onClick={() => this.props.onClick(category.id)}>
                <h3>{category.name}</h3>
                <img style={{width:'20vw'}} src={'/img/' + category.id + '.jpg'} alt="Category Image" />
            </li>
        );
    }
}

export default withRouter(CategorySimpleInfo);
