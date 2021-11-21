import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

class ProfilePage extends React.Component {
    state = {
        tabState: 0
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.myId);
    }
    
    render() {
        if (this.props.userInfo == null){
            return <h1>Loading...</h1>;
        }
        const infoTab = (
            <div>
                <h2>Username: {this.props.userInfo.username}</h2>
            </div>
        );
        return (
            <div>
                {this.state.tabState == 0 && infoTab}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myId: state.user.myId,
        userInfo: state.user.selected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => {
            return dispatch(actionCreators.getUserInfo(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
