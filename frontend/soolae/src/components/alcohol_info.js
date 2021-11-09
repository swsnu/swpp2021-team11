import React from 'react';
import {withRouter} from 'react-router-dom';

const AlcoholDetailInfo = (props) => {
    return (
        <div>
            <span>Name: {props.alcohol_info.name}</span>
            <img 
                src={props.alcohol_info.alcohol_image}
                alt="Grapefruit slice atop a pile of other slices"/>
            <span>Alcohol Content: {props.alcohol_info.alcohol_content}</span>
            <span>Price: KRW{props.alcohol_info.price}</span>
        </div>
    );
};

export default withRouter(AlcoholDetailInfo);
