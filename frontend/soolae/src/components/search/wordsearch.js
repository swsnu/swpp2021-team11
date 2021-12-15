import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {Col, Row} from 'react-bootstrap';
import AlcoholSimpleInfo from '../alcohol/alcohol_simple_info';
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

const listToGrid4 = (alcoholList, onClick) => {
    const length = alcoholList.length;
    let grid = [];
    for(var i = 0; i < parseInt(length / 4); i++){
        const first = 4 * i;
        const second = 4 * i + 1;
        const third =  4 * i + 2;
        const fourth = 4 * i + 3;
        grid.push(
            <Row>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[first]} onClick={onClick}/></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[second]} onClick={onClick}/></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[third]} onClick={onClick}/></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[fourth]} onClick={onClick}/></Col>
            </Row>
        );
    }
    let row = [];
    for(i = length - length % 4; i < length; i++){
        const j = i;
        row.push(
            <Col><AlcoholSimpleInfo alcohol={alcoholList[j]} onClick={onClick}/></Col>
        );
    }
    grid.push(<Row style={{textAlign:'center'}}>{row}</Row>);
    return <div className='alcohol grid'>{grid}</div>;
};

const WordSearch = (props) => {
    if (props.alcohol_list.length === 0) {
        props.getAlcoholList();
        return <div className="alcohol_list">Loading...</div>;
    }
    const word_search_list = props.alcohol_list.filter((alcohol) => {
        return (alcohol.name.includes(props.word));
    });
    console.log(props);
    return (
        <ul className="alcohol_list">
            {listToGrid4(word_search_list, props.onClick)}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WordSearch));
