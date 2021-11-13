import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

import './style.css';

const mapStateToProps = state => {
    return {
        user_info: state.user.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: (id) => dispatch(actionCreators.getUserInfo(id))
    };
};

const UserName = (props) => {
    let user = props.user_info.filter((item) => item.id === props.id);
    if(user.length === 0)
    {
        props.getUserInfo(props.id);
        return (<span className='UserName'>
            loading...
        </span>);
    }
    user = user[0];
    
    return (
        <span className='UserName'>
            {user.username}
        </span>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserName);