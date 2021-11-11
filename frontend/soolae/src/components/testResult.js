import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import TitleBar from '../components/common/title';
import MenuBar from '../components/common/menuBar';
import * as actionCreators from '../store/actions/index';
import AlcoholDetailInfo from '../components/alcohol_info';

class TestResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loaded:false};
    }

    componentDidMount()
    {
        this.props.onGetAll(212).then(()=>{this.setState({loaded: true});});
    }

    render(){
        console.log(this.props.storedResult);
        return (this.state.loaded) ? (
            <div className='result'>
                <TitleBar/>
                <MenuBar/>
                <AlcoholDetailInfo alcohol_info={this.props.alcohol_infos[0]}/>
            </div>
        ) : (
            <>
                <TitleBar/>
                <MenuBar/>
                <h1>Loading...</h1>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        alcohol_infos: state.alcohol.alcohol_info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: (id) => {return dispatch(actionCreators.getAlcoholInfo(id));}
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestResult));