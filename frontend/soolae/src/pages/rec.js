import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/actionCreators';
import AlcoholDetailInfo from '../components/alcohol/alcohol_detail_info';

class TestResultPage extends React.Component {
    render() {
        let recommendation = this.props.recommended;
        if (recommendation === undefined || recommendation.length === 0) {
            console.log('Error!!!');
            return (
                <div>
                    <h1><Redirect to="test" /></h1>
                </div>
            );
        }
        console.log(recommendation);
        return <AlcoholDetailInfo id={recommendation[0].id} />;
    }
}

const mapStateToProps = (state) => {
    return {
        recommended: state.alcohol.test_result,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTestResult: () => {
            return dispatch(actionCreators.getTestResult());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TestResultPage));
