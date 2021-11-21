import React, {Component} from 'react';
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
            alert('Enter email and password');
        } else {
            this.props.signin(data);
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Sign in</h1>
                <dir>
                    <label>Username</label>
                    <input
                        id="email-input"
                        type="email"
                        value={this.state.username}
                        onChange={(event) => this.setState({username: event.target.value})}
                    ></input>
                </dir>
                <dir>
                    <label>Password</label>
                    <input
                        id="pw-input"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                    ></input>
                </dir>
                <dir className="footer">
                    <button
                        id="login-button"
                        onClick={() => {
                            this.login();
                        }}
                    >
                        Sign in
                    </button>
                    <p>
                        Not a member? <br />
                        <a href="/signup">Sign up here!</a>
                    </p>
                </dir>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (data) => dispatch(actionCreators.signin(data))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(SignInPage));