import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignOut extends Component {
    render() {
        return (
            <div>
                <Link to='/signin'><button style={{position:'relative', right:'-950px'}}>Sign Out</button>
                </Link>
            </div>
        );
    }
}
export default SignOut;