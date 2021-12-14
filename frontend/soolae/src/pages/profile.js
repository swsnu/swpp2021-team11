import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import StarRate from '../components/common/star';
import {Col, Row} from 'react-bootstrap';
import './profile.css';

class ProfilePage extends React.Component {
    state = {
        tabState: 0,
        edit: false,
        username: null,
        email: null,
    }

    componentDidMount() {
        //this.props.requireLogin();
        this.props.getProfile();
    }

    editInfo(){
        const data = {
            'username': this.state.username,
            'email': this.state.email
        };
        this.props.editProfile(data).then(this.setState({edit: false}));
    }

    render() {
        if(!this.props.logged_in || !this.props.userInfo){
            this.props.requireLogin();
            return <div className='profile'><h1>Loading...</h1></div>;
        }
        const infoTab = (
            <div className='infoTab'>
                <h2>Username: {this.props.userInfo.username}</h2>
                <h2>Email: {this.props.userInfo.email}</h2>
                <button className='btn-edit' onClick = {() => {this.setState({edit: true});}}>Edit</button>
            </div>
        );
        const editTab = (
            <div className='editTab'>
                <div className='username-input'>
                    <label>Username</label>
                    <input type='text' value={this.state.username} placeholder='username' onChange={(e) => this.setState({ username: e.target.value })} />
                </div>
                <div className='email-input'>
                    <label>Email</label>
                    <input type='email' value={this.state.email} placeholder='email' onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <button className='btn-confirm' onClick = {() => {this.editInfo();}}>Confirm</button>
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
                                Author: {review.author_id}
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
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 0, edit: false})}>Profile Info</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 1, edit: false})}>My Reviews</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 2, edit: false})}>Friends</button>
                        
                    </Col>
                    <Col xs={10}>
                        {this.state.tabState == 0 && !this.state.edit && infoTab}
                        {this.state.tabState == 0 && this.state.edit && editTab}
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
        logged_in: state.user.logged_in,
        userInfo: state.user.selected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => {
            return dispatch(actionCreators.getProfile());
        },
        editProfile: (data) => dispatch(actionCreators.editProfile(data)),
        requireLogin: () => dispatch(actionCreators.requireLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
