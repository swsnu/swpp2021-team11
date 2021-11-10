import React from 'react';
import { withRouter } from 'react-router-dom'; 

const AlcoholListForm = props => {
    return (
        <div className="alcohol_list">
            {props.alcohols.map((alcohol) => {
                return <button key = {alcohol.id} onClick={() => {props.history.push('/alcohol/'+alcohol.id);}}>{alcohol.name}</button>;
            })};
        </div>
    );
};

export default withRouter(AlcoholListForm);