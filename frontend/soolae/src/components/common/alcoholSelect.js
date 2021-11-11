import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        category_list: state.category.category,
        alcohol_list: state.alcohol.alcohol_list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => {
            return Promise.all([dispatch(actionCreators.getCategories()), dispatch(actionCreators.getAlcoholList())]);
        }
    };
};

class AlcoholSelect extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: false,
            category: null,
        };
        this.selectCategory = this.selectCategory.bind(this);
        this.selectAlcohol = this.selectAlcohol.bind(this);
    }

    selectCategory(id)
    {
        this.setState({category: id});
    }

    selectAlcohol(id, name)
    {
        this.props.select(id, name);
    }

    componentDidMount()
    {
        this.props.onGetAll().then(this.setState({loading: true}));
    }

    render()
    {
        if(!this.state.loading)
        {
            return (<div>loading...</div>);
        }

        const mapCategory = (category) => {
            return (
                <li key={category.id}>
                    <button onClick={()=>{this.selectCategory(category.id);}}>{category.name}</button>
                </li>
            );
        };

        const mapDetailCategory = (id) => 
        {
            return this.props.alcohol_list.filter((item) => {console.log(item.sool_category_id); return item.sool_category_id === id;}).map((item) => {
                return (
                    <li key={item.id}>
                        <button onClick={() => {this.selectAlcohol(item.id, item.name);}}>{item.name}</button>
                    </li>);
            });
        };

        console.log(this.state.category);
        return (<ul>
            {this.state.category === null ? this.props.category_list.map(mapCategory) : 
                mapDetailCategory(this.state.category)}
        </ul>);
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlcoholSelect);