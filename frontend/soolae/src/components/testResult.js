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
        return (
            <div className='result'>
                <h2>Test Result</h2>
                <h3>{this.props.storedResult.name}</h3>
                <h3>{this.props.storedResult.price}원</h3>
                <img src = {'/media/' + this.props.storedResult.image}></img>
                <h3>{this.props.storedResult.rating}점</h3>
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