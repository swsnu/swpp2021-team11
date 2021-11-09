import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class TestResult extends React.Component {
    render(){
        const title = 'Test Result';
        console.log(this.props.storedResult);
        return (this.props.storedResult.length != 0) ? (
            <div className='result'>
                <h2>{title}</h2>
                <h3>{this.props.storedResult[1].name}</h3>
            </div>
        ) : (
            <h1>No result</h1>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedResult: state.alcohol.recommended,
    };
};

export default withRouter(connect(mapStateToProps, null)(TestResult));