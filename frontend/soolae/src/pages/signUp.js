import React from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }
    register() {
        const data = {'username': this.state.username, 'email': this.state.email, 'password': this.state.password};
        this.props.signUp(data);
    }

    render() {
        return (
            <div className='signup'>
                <h1>Sign Up</h1>
                <dir className='form'>
                    <dir className='form-group'>
                        <label>Username</label>
                        <input type='text' value={this.state.username} placeholder='username' onChange={(e) => this.setState({ username: e.target.value })} />
                    </dir>
                    <dir className='form-group'>
                        <label>Email</label>
                        <input type='text' value={this.state.email} placeholder='email' onChange={(e) => this.setState({ email: e.target.value })} />
                    </dir>
                    <dir className='form-group'>
                        <label>Password</label>
                        <input type='password' value={this.state.password} placeholder='password' onChange={(e) => this.setState({ password: e.target.value })} />
                    </dir>
                </dir>
                <dir className='footer'>
                    <button onClick= {() => {this.register();}}>Sign Up</button>
                </dir>
                <dir>
                    <p>
                        Aleady have an account? <br />
                        <a href="/signin">Sign in here</a>
                    </p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (data) => dispatch(actionCreators.signUp(data)),
    };
};

export default connect(null, mapDispatchToProps)(SignUp);
