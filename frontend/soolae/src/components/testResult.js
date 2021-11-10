import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
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
        console.log(this.props.storedResult);
        return (
            <div className='result'>
                <h2>Test Result</h2>
                <h3>{this.props.storedResult.name}</h3>
                <h3>{this.props.storedResult.price}</h3>
                <h3>{this.props.storedResult.image}</h3>
                <h3>{this.props.storedResult.rating}</h3>
            </div>
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