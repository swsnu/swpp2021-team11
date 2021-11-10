import React from 'react';
import {withRouter} from 'react-router-dom';

import './style.css';

const MenuBar = (props) => {
    return (
        <div className="MenuBar">
            <div>
                <button
                    onClick={() => {
                        props.history.push('/test');
                    }}
                >
                    test
                </button>
                <button
                    onClick={() => {
                        props.history.push('/review/add');
                    }}
                >
                    add
                </button>
                <button
                    onClick={() => {
                        props.history.push('/refresh');
                    }}
                >
                    refresh
                </button>
                <button
                    onClick={() => {
                        props.history.goBack();
                    }}
                >
                    Back
                </button>
            </div>
            <button
                onClick={() => {
                    props.history.push('/search');
                }}
            >
                Search
            </button>
        </div>
    );
};

export default withRouter(MenuBar);
