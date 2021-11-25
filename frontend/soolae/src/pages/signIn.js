import React, {Component} from 'react';
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
    }

    render() {
        return (
            <div className="Login">
                <h1>Sign in</h1>
                <dir>
                    <label>Username</label>
                    <input id="email-input" type="email" value={this.state.username}
                        onChange={(event) => this.setState({ username: event.target.value })}>
                    </input>
                </dir>
                <dir>
                    <label>Password</label>
                    <input id="pw-input" type="password" value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}>
                    </input>
                </dir>
                <dir className='footer'>
                    <button id="login-button" onClick= {() => {this.login(this.props);}}>Sign in</button>
                    <p>
                        Not a member? <br />
                        <a href="/signup">Sign up here!</a>
                    </p>
                </dir>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (data) => dispatch(actionCreators.signIn(data)),
    };
};

export default connect(null, mapDispatchToProps)(SignIn);