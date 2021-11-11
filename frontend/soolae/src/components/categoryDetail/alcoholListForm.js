import React from 'react';
import { withRouter } from 'react-router-dom'; 

const AlcoholListForm = props => {
    return (
        <ul className="alcohol_list">
            {props.alcohols.map((alcohol) => {
                return <li key = {alcohol.id}><button onClick={() => {props.history.push('/alcohol/'+alcohol.id);}}>{alcohol.name}</button></li>;
            })}
        </ul>
    );
};

export default withRouter(AlcoholListForm);