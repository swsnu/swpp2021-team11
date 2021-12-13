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

// props.id : need alcohol.id
const AlcoholDetailInfo = (props) => {
    let alcohol = props.alcohol_info.filter((item) => item.id === props.id);
    if (alcohol.length === 0) {
        props.getAlcoholInfo(props.id);
        return <div className="AlcoholDetailInfo">loading...</div>;
    }
    alcohol = alcohol[0];
    return (
        <div className="AlcoholDetailInfo">
            <h1 style={{marginLeft:'20px'}}>{alcohol.name}</h1>
            <img style={{width:'50%', margin: '10px'}}src={'/media/' + alcohol.sool_image} alt="Alcohol Image" />
            <div style={{margin:'10px', float:'right', textAlign:'center'}}>
                <div>Alcohol Content: {alcohol.alcohol_content}</div>
                <div>Price: KRW {alcohol.price}</div>
                <div>
                    Rate: <StarRate rate={alcohol.rating} />
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlcoholDetailInfo);
