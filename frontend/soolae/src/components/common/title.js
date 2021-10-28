import React from "react";
import { withRouter } from 'react-router-dom'; 

import "./style.css"

const TitleBar = props => {
    return (
        <div className="TitleBar">
            <button onClick={() => {props.history.push("/")}}><img src="/img/titleLogo.svg" alt="Soolae Title"/></button>
            <button onClick={() => {props.history.push("/profile")}}><img src="/img/profileButton.svg" alt="Profile"/></button>
        </div>
    );
}

export default withRouter(TitleBar);