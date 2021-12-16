import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import AlcoholSimpleInfo from '../alcohol/alcohol_simple_info';
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
                <Col><AlcoholSimpleInfo alcohol={alcoholList[first]} onClick={onClick} /></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[second]} onClick={onClick} /></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[third]} onClick={onClick} /></Col>
                <Col><AlcoholSimpleInfo alcohol={alcoholList[fourth]} onClick={onClick} /></Col>
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

// props.id : category.id is required
const CategoryAlcoholList = (props) => {
    let [category] = props.category_alcohols.filter((item) => item.id === props.id);
    if (category === undefined) {
        props.getCategoryAlcohols(props.id);
        return <div className="alcohol_list">Loading...</div>;
    }
    return (
        <ul className="alcohol_list">
            {listToGrid4(category.alcohol_list, props.onClick)}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAlcoholList);
