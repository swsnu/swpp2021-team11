import React, {Component} from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        const data = {'username': this.state.username, 'password': this.state.password};
        this.props.signIn(data, this.props.uid);
    }

    render() {
        return (
            <div className='SignIn' style={{padding:'30px'}}>
                <hr/>
                <div className='row d-flex justify-content-center'>
                    <div className="col-md-4">
                        <div className='justify-content-center'>
                            
                            <h1 style={{margin:'5px'}}>Sign in</h1>
                            <div className='form-group'>
                                <label className='form-label'>Username</label>
                                <input id="username-input" type='text' className="form-control" value={this.state.username}
                                    onChange={(event) => this.setState({ username: event.target.value })}>
                                </input>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Password</label>
                                <input id="pw-input" type="password" className="form-control" value={this.state.password}
                                    onChange={(event) => this.setState({ password: event.target.value })}>
                                </input>
                            </div>
                            <button style={{margin:'10px'}} type='submit' className='btn btn-primary btn-block' id="login-button" onClick= {() => {this.login(this.props);}}>Sign in</button>
                            <p className="forgot-password">
                                Not a member? <br />
                                <a href="/signup">Sign up here!</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (data, uid) => dispatch(actionCreators.signIn(data, uid)),
    };
};

const mapStateToProps = state => {
    return {
        uid: state.alcohol.recUserId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
