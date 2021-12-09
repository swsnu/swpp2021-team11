import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as actionCreators from '../../store/actions/actionCreators';
import StarRate from '../../components/common/star';
import UserName from '../../components/common/user_name';

import './style.css';

class ReviewList extends React.Component {
    componentDidMount() {
        this.props.getReviewList();
    }

    render() {
        const review_list_item = (review) => {
            return (
                <li key={review.id} onClick={() => this.props.history.push('/review/' + review.id)}>
                    <h1>{review.title}</h1>
                    <h2>
                        Rating: <StarRate rate={review.star_rating} />
                    </h2>
                    <h3>
                        Author: <UserName id={review.author_id} />
                    </h3>
                </li>
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
        storedReviews: state.review.reviews,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewList: () => dispatch(actionCreators.getReviewList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewList));
