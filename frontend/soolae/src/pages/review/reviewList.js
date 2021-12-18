import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import SimpleReview from '../../components/simpleReview';
import * as actionCreators from '../../store/actions/actionCreators';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

class ReviewList extends React.Component {
    componentDidMount() {
        this.props.getReviewList();
    }

    render() {
        if(!this.props.logged_in || this.props.storedReviews.length == 0){
            this.props.requireLogin();
            return <div className="review_list">Loading...</div>;
        }
        const review_list_item = (review) => {
            return (
                <SimpleReview review={review} />
            );
        };
        return (
            <div className="review_list" style={{padding:'30px'}}>
                <hr/>
                <h1> Review List </h1>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.props.history.push('/write-review/')}>post review</button>
                <ul>{this.props.storedReviews.map(review_list_item)}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logged_in: state.user.logged_in,
        storedReviews: state.review.reviews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewList: () => dispatch(actionCreators.getReviewList()),
        requireLogin: () => dispatch(actionCreators.requireLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewList));
