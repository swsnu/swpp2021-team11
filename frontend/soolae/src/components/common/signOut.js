import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class SignOut extends Component {
    
    constructor(props) {
        super(props);
    }
    
    logout() {

        this.props.signOut();

    }
    
    render() {
        
        return (
            <div>
                { <Link to= '/signin'><Button variant='secondary' style={{position:'relative', float:'right', margin:'3px'}}>Sign in</Button></Link> }
                <Button variant='secondary' id='signout-button' style={{position:'relative', float:'right', margin:'3px'}} onClick= {() => {this.logout();}}>Sign Out</Button>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actionCreators.signOut()),
    };
};

export default connect(null, mapDispatchToProps)(SignOut);
