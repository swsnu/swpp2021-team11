import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class SignOut extends Component {
    
    constructor(props) {
        super(props);
        console.log(this.props);
        // this.state = {
        //     isLoggedIn: false
        // };
    }
    
    logout(props) {
        //let history = useHistory();
        // const data = {'username': this.state.username,'password': this.state.password};
        // if (!this.state.username || !this.state.password) { alert('Enter email and password'); 
        // }else{
        fetch('/api/signout/', {
            credentials: 'include',
            method: 'GET',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            // 'X-CSRFToken': csrftoken
            }
        }).then(function(response) {
            if (response.status == 401){
                alert('User is not logged in!');
            }else if (response.status == 204){
                //this.state.isLoggedIn = true;
                props.history.push('/test');
                //alert('logged out');
            }else 
                alert('try again');
        });
    }
    
    render() {
        //const isLoggedIn = this.props.isLoggedIn;
        
        return (
            <div>
                { <Link to= '/signin'><button style={{position:'relative', right:'-880px'}}>Sign in</button></Link> }
                <button style={{position:'relative', right:'-900px'}} onClick= {() => {this.logout(this.props);}}>Sign Out</button>
            </div>
        );
    }
}
export default withRouter(SignOut);