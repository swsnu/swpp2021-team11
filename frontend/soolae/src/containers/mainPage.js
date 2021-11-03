import React from 'react';
import * as actionCreators from '../store/actions/actionCreators';
import { connect } from 'react-redux';

import TitleBar from '../components/common/title';
import MenuBar from '../components/common/menuBar';
import Recommendation from './Recommend/recommendation';

class MainPage extends React.Component {

    componentDidMount(){
        this.props.getRecommendationList();
    }

    render()
    {
        let list = this.props.storedRecommendations;
        return (
            <div className="MainPage">
                <TitleBar />
                <MenuBar />
                {(list[0] != null) && (
                    <div>
                        <Recommendation alcohol = {list[0]}/>
                        <Recommendation alcohol = {list[1]}/>
                        <Recommendation alcohol = {list[2]}/>
                    </div>
                )}
            </ div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedRecommendations: state.alcohol.recommended,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRecommendationList: () => dispatch(actionCreators.getRecommendationList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);