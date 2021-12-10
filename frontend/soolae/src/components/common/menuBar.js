import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//import './style.css';

const MenuBar = (props) => {
    return (
        <div className="MenuBar" style={{margin:'10px'}}>
            <div className="btn-group" role="group" aria-label="Basic example">
                <Button  variant="secondary btn-lg"
                    onClick={() => {
                        props.history.push('/test');
                    }}
                >
                    Test
                </Button>
                <Button variant="secondary btn-lg"
                    onClick={() => {
                        props.history.push('/review');
                    }}
                >
                    Reviews
                </Button>
                <Button variant="secondary btn-lg"
                    onClick={() => {
                        props.history.push('/main');
                    }}
                >
                    Main
                </Button>
                <Button variant="secondary btn-lg"
                    onClick={() => {
                        props.history.goBack();
                    }}
                >
                    Back
                </Button>

            </div>
            <Button variant="secondary btn-lg" style={{float: 'right'}}
                onClick={() => {
                    props.history.push('/search');
                }}
            >
                Search
            </Button>

        </div>
    );
};

export default withRouter(MenuBar);
