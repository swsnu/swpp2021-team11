import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

import 'bootstrap/dist/css/bootstrap.min.css';

const mapStateToProps = (state) => {
    return {
        alcohol_list: state.alcohol.alcohol_list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlcoholList: () => {
            return dispatch(actionCreators.getAlcoholList());
        },
    };
};

const WordSearch = (props) => {
    if (props.alcohol_list.length === 0) {
        props.getAlcoholList();
        return <div className="alcohol_list">Loading...</div>;
    }
    const word_search_list = props.alcohol_list.filter((alcohol) => {
        return (alcohol.name.includes(props.word));
    });
    return (
        <ul className="alcohol_list">
            {word_search_list.map((alcohol) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WordSearch));
