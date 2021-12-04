import React, {Component} from 'react';
<<<<<<< HEAD
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../store/actions/actionCreators';

class SignInPage extends Component {
    state = {
        username: '',
        password: '',
    };

    login() {
        const data = {username: this.state.username, password: this.state.password};
        if (!this.state.username || !this.state.password) {
            alert('Enter username and password');
        } else {
            this.props.signin(data);
        }
=======
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



class SignIn extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
    }

    login() {
        const data = {'username': this.state.username,'password': this.state.password};
        this.props.signIn(data);
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
    }

    render() {
        return (
            <div className="SignIn">
                <h1>Sign in</h1>
                <dir>
                    <label>Username</label>
<<<<<<< HEAD
                    <input
                        id="username-input"
                        type="string"
                        value={this.state.username}
                        onChange={(event) => this.setState({username: event.target.value})}
                    ></input>
=======
                    <input id="email-input" type="email" value={this.state.username}
                        onChange={(event) => this.setState({ username: event.target.value })}>
                    </input>
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
                </dir>
                <dir>
                    <label>Password</label>
                    <input id="pw-input" type="password" value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}>
                    </input>
                </dir>
<<<<<<< HEAD
                <dir className="footer">
                    <button
                        id="login-button"
                        onClick={() => {
                            this.login();
                        }}
                    >
                        Sign in
                    </button>
=======
                <dir className='footer'>
                    <button id="login-button" onClick= {() => {this.login(this.props);}}>Sign in</button>
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
                    <p>
                        Not a member? <br />
                        <a href="/signup">Sign up here!</a>
                    </p>
                </dir>
            </div>
        );
    }
}

<<<<<<< HEAD
const mapDispatchToProps = (dispatch) => {
    return {
        signin: (data) => dispatch(actionCreators.signin(data))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(SignInPage));
=======
const mapDispatchToProps = dispatch => {
    return {
        signIn: (data) => dispatch(actionCreators.signIn(data)),
    };
};

export default connect(null, mapDispatchToProps)(SignIn);
>>>>>>> c0a19a75e272841a8eac064429e640f4d52d5d4b
