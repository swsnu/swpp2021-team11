import React from 'react';
import {withRouter} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import SignOut from './signOut';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';

const TitleBar = (props) => {
    return (
        <div className="TitleBar">
            <header className="App-header">
                <Card style={{backgroundColor: '#6c757d'}}>
                    <Card.Body>
                        <Button variant="link" id="btn"
                            onClick={() => {
                                props.history.push('/');
                            }}
                        >
                            <img src="/img/titleLogo.svg" alt="Soolae Title" style={{height: '50px'}}/>
                        </Button>
                        <div style={{float:'right', margin:'10px'}}>
                            <SignOut />
                        </div>
                        <Button variant="link" style={{float: 'right'}} id="btn"
                            onClick={() => {
                                props.history.push('/profile');
                            }}
                        >
                            <img src="/img/profileButton.svg" alt="Profile" style={{height: '50px'}} />
                        </Button>
                    </Card.Body>
                </Card>
            </header>
        </div>
    );
};

export default withRouter(TitleBar);
