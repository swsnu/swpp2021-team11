import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import StarRate from '../components/common/star';
import UserName from '../components/common/user_name';

import './profile.css';

class ProfilePage extends React.Component {
    state = {
        tabState: 0
    }

    componentDidMount() {
        this.props.getUserInfo(1);
    }
    
    render() {
        if(!this.props.userInfo){
            return <h1>Loading...</h1>;
        }
        const infoTab = (
            <div>
                <h2>Username: {this.props.userInfo.username}</h2>
                <h2>Email: {this.props.userInfo.email}</h2>
            </div>
        );
        const myReviewsTab = (
            <div className = "profile">
                <h2>Reviews</h2>
                {this.props.userInfo.reviews.map((review) => {
                    return (
                        <li key={review.id} onClick={() => this.props.history.push('/review/' + review.id)}>
                            <h1>{review.title}</h1>
                            <h2>
                                Rating: <StarRate rate={review.star_rating} />
                            </h2>
                            <h3>
                                Author: <UserName id={review.author_id} />
                            </h3>
                        </li>
                    );
                })}
            </div>
        );
        const friendsTab = (
            <div>
                <h2>Friends</h2>
            </div>
        );
        return (
            <div>
                <button onClick = {() => this.setState({tabState: 0})}>Profile Info</button>
                <button onClick = {() => this.setState({tabState: 1})}>My Reviews</button>
                <button onClick = {() => this.setState({tabState: 2})}>Friends</button>
                {this.state.tabState == 0 && infoTab}
                {this.state.tabState == 1 && myReviewsTab}
                {this.state.tabState == 2 && friendsTab}
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
