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

    async checkLogin(){
        await this.props.checkLogin();
    }

    render() {
        this.checkLogin();
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRecommendationList: () => dispatch(actionCreators.getRecommendationList()),
        checkLogin: () => dispatch(actionCreators.checkLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
