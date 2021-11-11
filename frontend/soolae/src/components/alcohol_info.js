import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.css';
import StarRate from './common/star';

const AlcoholDetailInfo = (props) => {
    let x;
    if (props.alcohol_info.image === undefined) x = props.alcohol_info.sool_image;
    else x = props.alcohol_info.image;
    return (
        <div className='AlcoholDetailInfo'>
            <h1>Name: {props.alcohol_info.name}</h1>
            <img 
                src={'/media/' + x}
                alt="Grapefruit slice atop a pile of other slices"/>
            <div>Alcohol Content: {props.alcohol_info.alcohol_content}</div>
            <div>Price: KRW{props.alcohol_info.price}</div>
            <div>Rate: <StarRate rate={props.alcohol_info.rating}/></div>
        </div>
    );
};

export default withRouter(AlcoholDetailInfo);
