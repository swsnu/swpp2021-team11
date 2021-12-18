import React from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import CategorySimpleInfo from '../category/category_simple_info';
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

const listToGrid3 = (categoryList, onClick) => {
    const length = categoryList.length;
    let grid = [];
    for(var i = 0; i < parseInt(length / 3); i++){
        const first = 3 * i;
        const second = 3 * i + 1;
        const third =  3 * i + 2;
        grid.push(
            <Row>
                <Col><CategorySimpleInfo category={categoryList[first]} onClick={onClick} /></Col>
                <Col><CategorySimpleInfo category={categoryList[second]} onClick={onClick} /></Col>
                <Col><CategorySimpleInfo category={categoryList[third]} onClick={onClick} /></Col>
            </Row>
        );
    }
    let row = [];
    for(i = length - length % 3; i < length; i++){
        const j = i;
        row.push(
            <Col><CategorySimpleInfo category={categoryList[j]} onClick={onClick} /></Col>
        );
    }
    grid.push(<Row style={{textAlign:'center'}}>{row}</Row>);
    return <div className='alcohol grid'>{grid}</div>;
};

const CategoryList = (props) => {
    if (props.category_list === undefined || props.category_list.length === 0) {
        props.getCategory();
        return <div className="category_list">Loading...</div>;
    }
    let category_list = props.category_list;
    return (
        <ul className="category_list">
            {listToGrid3(category_list, props.onClick)}
        </ul>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
