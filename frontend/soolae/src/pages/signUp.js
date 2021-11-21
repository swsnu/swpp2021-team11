import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../store/actions/actionCreators';

class SignUpPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
    };
    register() {
        const data = {username: this.state.username, email: this.state.email, password: this.state.password};
        if (!this.state.username || !this.state.email || !this.state.password) {
            alert('Enter username, email and password');
        } else {
            this.props.signup(data);
        }
    }
    render() {
        return (
            <div className="signup">
                <h1>Sign Up</h1>
                <dir className="form">
                    <dir className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={this.state.username}
                            placeholder="username"
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                    </dir>
                    <dir className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            value={this.state.email}
                            placeholder="email"
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </dir>
                    <dir className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </dir>
                </dir>
                <dir className="footer">
                    <button
                        onClick={() => {
                            this.register();
                        }}
                    >
                        Sign Up
                    </button>
                </dir>
                <dir>
                    <p>
                        Aleady have an account? <br />
                        <a href="/signin">Sign in here</a>
                    </p>
                </dir>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (data) => dispatch(actionCreators.signup(data))
    };
};

export default connect(null, mapDispatchToProps)(withRouter(SignUpPage));