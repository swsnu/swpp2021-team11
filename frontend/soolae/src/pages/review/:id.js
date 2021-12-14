import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/actionCreators';
import StarRate from '../../components/common/star';
import AlcoholDetailInfo from '../../components/alcohol/alcohol_detail_info';
import './style.css';

class ReviewDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getReview(this.props.match.params.id);
    }

    deleteReview(){
        this.props.deleteReview(this.props.match.params.id)
            .then(this.props.history.goBack());
    }

    render() {
        let review = this.props.review;
        if (review === null) {
            return(
                <div className="review_detail_page">
                    <h1>Loading...</h1>;
                </div>
            );
            
        }
        return (
            <div className="review_detail_page">
                <h1 className="review_detail_title">{review.title}</h1>
                <h2 className="review_detail_author">
                    Author: {review.author_name}
                </h2>
                <h2 className="review_detail_sool">
                    <AlcoholDetailInfo id={review.sool_id} />
                </h2>
                <h2 className="review_detail_rating">
                    Rating: <StarRate rate={review.star_rating} />
                </h2>
                <img src={'/media/' + review.image} style={{width:'50%'}}></img>
                <h2 className="review_detail_content">{review.content}</h2>
                {this.props.auth && <button onClick={() => this.deleteReview()}>Delete Review</button>}
            </div>
        );
    }
    // 추천, comment, writer 추가하기
}

const mapStateToProps = (state) => {
    return {
        review: state.review.selected,
        auth: state.review.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReview: (review_id) => dispatch(actionCreators.getReview(review_id)),
        deleteReview: (review_id) => dispatch(actionCreators.deleteReview(review_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewDetailPage));
