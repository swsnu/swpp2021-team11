import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/actionCreators';
import AlcoholDetailInfo from '../components/alcohol/alcohol_detail_info';

const RecommendationItem = (id) => {
    return (
        <li key={id}>
            <AlcoholDetailInfo id={id} />
        </li>
    );
};

class MainPage extends React.Component {
    componentDidMount() {
        this.props.getRecommendationList();
    }

    render() {
        if(!this.props.logged_in || this.props.storedRecommendations.length == 0){
            this.props.requireLogin();
            return <div className="MainPage">Loading...</div>;
        }
        let list = this.props.storedRecommendations;
        return (
            <div className="MainPage">
                <h1 style={{marginLeft: 65}}>Today&apos;s Recommendation</h1>
                <ul style={{listStyleType:'none'}}>{list.map((item) => RecommendationItem(item.id))}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        storedRecommendations: state.alcohol.recommended,
        logged_in: state.user.logged_in,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecommendationList: () => dispatch(actionCreators.getRecommendationList()),
        requireLogin: () => dispatch(actionCreators.requireLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
