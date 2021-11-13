import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions/actionCreators';
import StarRate from '../common/star';

import './style.css';

const mapStateToProps = (state) => {
    return {
        alcohol_info: state.alcohol.alcohol_info,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlcoholInfo: (id) => dispatch(actionCreators.getAlcoholInfo(id)),
    };
};

const AlcoholDetailInfo = (props) => {
    let alcohol = props.alcohol_info.filter((item) => item.id === props.id);
    if (alcohol.length === 0) {
        props.getAlcoholInfo(props.id);
        return <div className="AlcoholDetailInfo">loading...</div>;
    }
    alcohol = alcohol[0];
    return (
        <div className="AlcoholDetailInfo">
            <h1>Name: {alcohol.name}</h1>
            <img src={'/media/' + alcohol.sool_image} alt="Alcohol Image" />
            <div>Alcohol Content: {alcohol.alcohol_content}</div>
            <div>Price: KRW {alcohol.price}</div>
            <div>
                Rate: <StarRate rate={alcohol.rating} />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlcoholDetailInfo);
