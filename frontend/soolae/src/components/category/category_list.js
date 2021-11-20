import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        category_list: state.category.category_list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            return dispatch(actionCreators.getCategories());
        },
    };
};

const CategoryList = (props) => {
    if (props.category_list === undefined) {
        props.getCategory();
        return <div className="category_list">Loading...</div>;
    }
    return (
        <ul className="category_list">
            {props.category_list.map((category) => {
                return (
                    <li key={category.id}>
                        <button
                            onClick={() => {
                                props.onClick(category.id);
                            }}
                        >
                            {category.name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
