import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class SignIn extends Component {
    
    constructor() {
        super();
        this.state = {
            email: 'email',
            password: 'password'
        };
    }

    login() {
        //alert('login');
        // return (
        //     <Redirect to='/main' />
        // );
    }

    render() {
        return (
            <div className="Login">
                <h1>Sign in</h1>
                <dir>
                    <label>Email</label>
                    <input id="email-input" type="email" value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}>
                    </input>
                </dir>
                <dir>
                    <label>Password</label>
                    <input id="pw-input" type="password" value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}>
                    </input>
                </dir>
                <dir className='footer'>
                    <Link to="/main"><button id="login-button" onClick= {() => {this.login();}}>Sign in</button>
                    </Link>
                    <p>
                        Not a member? <br />
                        <a href="/signup">Sign up here!</a>
                    </p>
                </dir>
            </div>
        );
    }
}

export default SignIn;
