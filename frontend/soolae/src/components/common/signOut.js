import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

class SignOut extends Component {

    render() {
        return (
            <div className="SignOut">
                <button
                    onClick={() => {
                        this.props.history.push('/signin');
                    }}
                    style={{position: 'relative', right: '-950px'}}
                >
                            Sign in
                </button>
                <button
                    style={{position: 'relative', right: '-950px'}}
                    onClick={() => {
                        this.props.signout();
                    }}
                >
                        Sign Out
                </button>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignOut));
