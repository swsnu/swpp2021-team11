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
            <div className='signup' style={{padding:'30px'}}>
                <hr/>
                <div className='row d-flex justify-content-center'>
                    <div className="col-md-4">
                        <form className='justify-content-center'>
                            <h1 style={{margin:'5px'}}>Sign Up</h1>
                            <div className='form-group'>
                                <label className='form-label'>Username</label>
                                <input className='form-control' type='text' value={this.state.username} placeholder='username' onChange={(e) => this.setState({ username: e.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Email</label>
                                <input className='form-control' type='email' value={this.state.email} placeholder='email' onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Password</label>
                                <input className='form-control' type='password' value={this.state.password} placeholder='password' onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <div className='footer'>
                                <button style={{margin:'10px'}} className='btn btn-primary' onClick= {() => {console.log('log');this.register();}}>Sign Up</button>
                            </div>
                            <div>
                                <p>
                                    Aleady have an account? <br />
                                    <a href="/signin">Sign in here</a>
                                </p>
                            </div>
                        </form>
                    </div>
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
