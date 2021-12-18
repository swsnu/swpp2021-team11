import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
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

    componentDidMount(){
        this.props.checkLogin();
    }
    
    logout() {
        this.props.history.push('/test');
        this.props.signOut();
    }
    
    render() {
        this.props.checkLogin();
        return (
            <div className='signin-out'>
                { !this.props.logged_in && <Link to= '/signin'><Button variant='secondary' style={{position:'relative', float:'right', margin:'3px'}}>Sign in</Button></Link> }
                { this.props.logged_in && <Button variant='secondary' id='signout-button' style={{position:'relative', float:'right', margin:'3px'}} onClick= {() => {this.logout();}}>Sign Out</Button>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logged_in: state.user.logged_in,
        userInfo: state.user.selected
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actionCreators.signOut()),
        checkLogin: () => dispatch(actionCreators.checkLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignOut));
