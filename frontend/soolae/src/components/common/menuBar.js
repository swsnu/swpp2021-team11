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
                        props.history.push('/review');
                    }}
                >
                    reviews
                </button>
                <button
                    onClick={() => {
                        props.history.push('/main');
                    }}
                >
                    main
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
