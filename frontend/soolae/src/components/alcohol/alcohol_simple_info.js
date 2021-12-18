import React from 'react';
import {withRouter} from 'react-router-dom';

class AlcoholSimpleInfo extends React.Component {
    render(){
        const alcohol = this.props.alcohol;
        return (
            <li className='AlcoholSimpleInfo' key={alcohol.id} onClick={() => this.props.onClick(alcohol.id)}>
                <h3 style={{color:'#32a897'}}>{alcohol.name}</h3>
                <img style={{width:'9vw', marginRight:'3vw'}}src={'/media/' + alcohol.sool_image} alt="Alcohol Image" />
            </li>
        );
    }
}

export default withRouter(AlcoholSimpleInfo);
