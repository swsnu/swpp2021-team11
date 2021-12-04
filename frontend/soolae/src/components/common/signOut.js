<<<<<<< HEAD
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class SignOut extends Component {
=======
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class SignOut extends Component {
    
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    
    logout() {

        this.props.signOut();
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b

    }
    
    render() {
        
        return (
<<<<<<< HEAD
            <div className="SignOut">
                <button
                    onClick={() => {
                        this.props.history.push('/signin');
                    }}
                    style={{position: 'relative', right: '-950px'}}
                >
                            Sign in
                </button>
                <button
                    style={{position: 'relative', right: '-950px'}}
                    onClick={() => {
                        this.props.signout();
                    }}
                >
                        Sign Out
                </button>
=======
            <div>
                { <Link to= '/signin'><button style={{position:'relative', right:'-880px'}}>Sign in</button></Link> }
                <button style={{position:'relative', right:'-900px'}} onClick= {() => {this.logout();}}>Sign Out</button>
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
            </div>
        );
    }
}

<<<<<<< HEAD
const mapStateToProps = (state) => {
    return {
        myId: state.user.myId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => {
            return dispatch(actionCreators.signout());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignOut));
=======

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actionCreators.signOut()),
    };
};

export default connect(null, mapDispatchToProps)(SignOut);
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
