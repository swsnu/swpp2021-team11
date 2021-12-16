import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import AlcoholSimpleInfo from '../components/alcohol/alcohol_simple_info';
import {Col, Row} from 'react-bootstrap';
import './profile.css';
import SimpleReview from '../components/simpleReview';

class ProfilePage extends React.Component {
    state = {
        tabState: 1,
        edit: false,
        username: null,
        email: null,
    }

    componentDidMount() {
        //this.props.requireLogin();
        this.props.getProfile();
    }

    putOnShelf(alcoholList){
        const length = alcoholList.length;
        let grid = [];
        for(var i = 0; i < parseInt(length / 3); i++){
            const first = 3 * i;
            const second = 3 * i + 1;
            const third = 3 * i + 2;
            grid.push(
                <Row>
                    <Col><AlcoholSimpleInfo alcohol={alcoholList[first]} /></Col>
                    <Col><AlcoholSimpleInfo alcohol={alcoholList[second]} /></Col>
                    <Col><AlcoholSimpleInfo alcohol={alcoholList[third]} /></Col>
                </Row>
            );
        }
        let row = [];
        for(i = length - length % 3; i < length; i++){
            const j = i;
            row.push(
                <Col><AlcoholSimpleInfo alcohol={alcoholList[j]} /></Col>
            );
        }
        grid.push(<Row style={{textAlign:'center'}}>{row}</Row>);
        return <div className='alcohol grid' style={{position:'relative'}}>
            <img src='/img/shelf.jpg' alt="Shelf Image" style={{width:'100%'}}/>
            <div className='alcohol grid' style={{position:'absolute', top:'90px', left:'70px'}}>{grid}</div>
        </div>;
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
            return <div className='profile'>Loading...</div>;
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
        const myAlcoholTab = (
            <div className = 'alcoholTab'>
                {this.putOnShelf(this.props.userInfo.favorite_sool)}
            </div>
        );
        const myReviewsTab = (
            <div className = 'reviewsTab'>
                <h2>Reviews</h2>
                {this.props.userInfo.reviews.map((review) => {
                    return (
                        <SimpleReview key={0} review={review} />
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
                        {<img src="/img/profileButton.svg" alt="Profile" style={{height: '100px'}} />}
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 0, edit: false})}>Profile Info</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 1, edit: false})}>My Sool</button>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 2, edit: false})}>My Reviews</button><br/>
                        <button className='btn btn-info' style={{margin:'10px'}} onClick = {() => this.setState({tabState: 3, edit: false})}>Friends</button>
                        
                    </Col>
                    <Col xs={10}>
                        {this.state.tabState == 0 && !this.state.edit && infoTab}
                        {this.state.tabState == 0 && this.state.edit && editTab}
                        {this.state.tabState == 1 && myAlcoholTab}
                        {this.state.tabState == 2 && myReviewsTab}
                        {this.state.tabState == 3 && friendsTab}
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
