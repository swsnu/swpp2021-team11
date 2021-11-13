import React, {Component} from 'react';
//import { useHistory } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router';
//import MainPage from './mainPage';
// import axios from 'axios';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class SignInPage extends Component {
    //history = useHistory;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    login(props) {
        //let history = useHistory();
        const data = {username: this.state.username, password: this.state.password};
        if (!this.state.username || !this.state.password) {
            alert('Enter email and password');
        } else {
            fetch('/api/signin/', {
                credentials: 'include',
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(data),
            }).then(function (response) {
                if (response.status == 401) {
                    alert('Email or Password is wrong');
                } else if (response.status == 204) {
                    props.history.push('/main');
                } else alert('try again');
            });

            //console.log(props.history.push('/main'));
            // return(
            //     <Redirect exact from='/signin' to='/main' />
            // );
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Sign in</h1>
                <dir>
                    <label>Email</label>
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
                            this.login(this.props);
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

export default withRouter(SignInPage);
