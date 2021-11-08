import React from 'react';
import {withRouter} from 'react-router-dom';

const TitleBar = (props) => {
    return (
        <div>
            <span>{props.name}</span>
        </div>
    );
};

export default withRouter(TitleBar);
