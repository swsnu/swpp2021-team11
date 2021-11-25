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

    }
    
    render() {
        
        return (
            <div>
                { <Link to= '/signin'><button style={{position:'relative', right:'-880px'}}>Sign in</button></Link> }
                <button style={{position:'relative', right:'-900px'}} onClick= {() => {this.logout();}}>Sign Out</button>
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