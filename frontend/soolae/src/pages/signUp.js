import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }
    register() {
        const data = {username: this.state.username, email: this.state.email, password: this.state.password};
        fetch('/api/signup/', {
            credentials: 'include',
            method: 'POST',
            mode: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        alert('Account made successfully!');
        // result = await result.json();
        // console.log('result',result);

        // let item = {username: this.state.username, password: this.state.password};
        // axios.post('http://localhost:8000/api/signup/', item);
        // // console.log(item);

        // // let result = await fetch('http://locallhost:8000/api/signup',{
        // //     method: 'POST',
        // //     body: JSON.stringify(item),
        // //     headers:{
        // //         'Content-Type':'application/json',
        // //         'Accept':'application/json'
        // //     }
        // // });
        // // result = await result.json();
        // // console.log('result',result);

        // //var querystring = require('querystring');
    }

    render() {
        return (
            <div className="signup">
                <h1>Sign Up</h1>
                <div className="form">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={this.state.username}
                            placeholder="username"
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            value={this.state.email}
                            placeholder="email"
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="password"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </div>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            this.register();
                        }}
                    >
                        Sign Up
                    </button>
                </div>
                <div>
                    <p>
                        Aleady have an account? <br />
                        <a href="/signin">Sign in here</a>
                    </p>
                </div>
            </div>
        );
    }
}
export default SignUpPage;
