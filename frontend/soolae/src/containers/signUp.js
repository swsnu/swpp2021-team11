import React from 'react';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='signup'>
                <h1>Sign Up</h1>
                <dir className='form'>
                    <dir className='form-group'>
                        <label>Username</label>
                        <input type='text' name='username' placeholder='username' />
                    </dir>
                    <dir className='form-group'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='email' />
                    </dir>
                    <dir className='form-group'>
                        <label>Password</label>
                        <input type='text' name='password' placeholder='password' />
                    </dir>
                    <dir className='form-group'>
                        <label>Confirm Password</label>
                        <input type='text' name='password' placeholder='confirm password' />
                    </dir>
                    <dir>
                        <label>Birthday</label>
                        <input type="date" id="birthday" name="birthday" />
                    </dir>
                </dir>
                <dir className='footer'>
                    <Link to="/signin"><button type='button' className='btn'>Sign Up</button>
                    </Link>
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
export default SignUp;