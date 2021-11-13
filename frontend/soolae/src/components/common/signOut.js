import React, {Component} from 'react';
import {withRouter} from 'react-router';

class SignOut extends Component {
    constructor(props) {
        super(props);
    }

    logout(props) {
        fetch('/api/signout/', {
            credentials: 'include',
            method: 'GET',
            mode: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken
            },
        }).then(function (response) {
            if (response.status == 401) {
                alert('User is not logged in!');
            } else if (response.status == 204) {
                props.history.push('/test');
            } else alert('try again');
        });
    }

    render() {
        return (
            <div className="SignOut">
                {
                    <button
                        onClick={() => {
                            this.props.history.push('/signin');
                        }}
                        style={{position: 'relative', right: '-880px'}}
                    >
                        Sign in
                    </button>
                }
                <button
                    style={{position: 'relative', right: '-900px'}}
                    onClick={() => {
                        this.logout(this.props);
                    }}
                >
                    Sign Out
                </button>
            </div>
        );
    }
}
export default withRouter(SignOut);
