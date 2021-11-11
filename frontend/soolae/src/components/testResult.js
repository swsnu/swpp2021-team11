import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import AlcoholDetailInfo from '../components/alcohol_info';
import * as actionCreators from '../store/actions/actionCreators';

class TestResult extends React.Component {
    componentDidMount(){
        this.props.getTestResult();
    }
    render(){
        if(this.props.storedResult == null){
            return (
                <div>
                    <h1>Loading...</h1>;
                </div>
            );
        }
        return (
            <AlcoholDetailInfo alcohol_info={this.props.storedResult}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedResult: state.alcohol.recommended,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTestResult: () => {return dispatch(actionCreators.getTestResult());}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TestResult));