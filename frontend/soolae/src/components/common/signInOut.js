import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class SignInOut extends Component {

    render() {
        const signin = (
            <button
                onClick={() => {
                    this.props.history.push('/signin');
                }}
                style={{position: 'relative', right: '-950px'}}
            >
                        Sign in
            </button>
        );
        const signout = (
            <button
                style={{position: 'relative', right: '-950px'}}
                onClick={() => {
                    this.props.signout();
                }}
            >
                    Sign Out
            </button>
        );
        console.log(this.props.myId);
        return (
            <div className="SignOut">
                {!this.props.myId && signin}
                {this.props.myId && signout}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myId: state.user.myId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => {
            return dispatch(actionCreators.signout());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInOut));
