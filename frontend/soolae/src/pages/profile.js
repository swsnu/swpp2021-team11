import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import StarRate from '../components/common/star';
import UserName from '../components/common/user_name';
import {Col, Row} from 'react-bootstrap';
import './profile.css';

class ProfilePage extends React.Component {
    state = {
        tabState: 0
    }

    componentDidMount() {
        this.props.getProfile();
    }
    
    async checkLogin(){
        await this.props.checkLogin();
    }

    render() {
        this.checkLogin();
        if(!this.props.userInfo){
            return <h1>Loading...</h1>;
        }
        const infoTab = (
            <div className='infoTab'>
                <h2>Username: {this.props.userInfo.username}</h2>
                <h2>Email: {this.props.userInfo.email}</h2>
            </div>
        );
        const myReviewsTab = (
            <div className = 'reviewsTab'>
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
            <div className='friendsTab'>
                <h2>Friends</h2>
            </div>
        );
        return (
            <div className='profile' style={{padding:'30px'}}>
                <hr/>
                <Row className='col'>
                    <Col>
                        <img src="/img/profileButton.svg" alt="Profile" style={{height: '100px'}} /><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 0})}>Profile Info</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 1})}>My Reviews</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 2})}>Friends</button>
                        
                    </Col>
                    <Col xs={10}>
                        {this.state.tabState == 0 && infoTab}
                        {this.state.tabState == 1 && myReviewsTab}
                        {this.state.tabState == 2 && friendsTab}
                
                    </Col>
                </Row>
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
        getProfile: () => {
            return dispatch(actionCreators.getProfile());
        },
        checkLogin: () => dispatch(actionCreators.checkLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
