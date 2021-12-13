import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import StarRate from '../../components/common/star';
import AlcoholDetailInfo from '../../components/alcohol/alcohol_detail_info';
import UserName from '../../components/common/user_name';
import './style.css';

class ReviewDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getReview(this.props.match.params.id);
    }

    render() {
        let review = this.props.review_list.filter((item) => item.id === parseInt(this.props.match.params.id));
        if (review.length === 0) {
            return(
                <div className="review_detail_page">
                    <h1>Loading...</h1>;
                </div>
            );
            
        }
        review = review[0];
        return (
            <div className="review_detail_page">
                <h1 className="review_detail_title">{review.title}</h1>
                <h2 className="review_detail_author">
                    Author: <UserName id={review.author_id} />
                </h2>
                <h2 className="review_detail_sool">
                    <AlcoholDetailInfo id={review.sool_id} />
                </h2>
                <h2 className="review_detail_rating">
                    Rating: <StarRate rate={review.star_rating} />
                </h2>
                <img src={'/media/' + review.image}></img>
                <div className="review_detail_content">{review.content}</div>
            </div>
        );
    }
    // 추천, comment, writer 추가하기
}

const mapStateToProps = (state) => {
    return {
        review_list: state.review.review_list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReview: (review_id) => dispatch(actionCreators.getReview(review_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetailPage);
