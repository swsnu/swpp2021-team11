import React, {Component} from 'react';

class Login extends Component {
    state={email:'', password:''}

    render() {
        return (
            <div className="Login">
                <dir>
                    <h1>Login Page</h1>
                    <label>Email:</label>
                    <input id="email-input" type="email" value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}>
                    </input>
                </dir>
                <dir>
                    <label>Password:</label>
                    <input id="pw-input" type="password" value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}>
                    </input>
                </dir>
                <button id="login-button">Log in</button>
            </div>
        );
    }
}

export default Login;
