import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import * as actionCreators from '../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        category_alcohols: state.alcohol.category_alcohols,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryAlcohols: (id) => {
            return dispatch(actionCreators.getCategoryAlcohols(id));
        },
    };
};

const CategoryAlcoholList = (props) => {
    let [category] = props.category_alcohols.filter((item) => item.id === props.id);
    if (category === undefined) {
        props.getCategoryAlcohols(props.id);
        return <div className="alcohol_list">Loading...</div>;
    }
    return (
        <ul className="alcohol_list">
            {category.alcohol_list.map((alcohol) => {
                return (
                    <li key={alcohol.id}>
                        <button
                            onClick={() => {
                                props.onClick(alcohol.id);
                            }}
                        >
                            {alcohol.name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryAlcoholList));
