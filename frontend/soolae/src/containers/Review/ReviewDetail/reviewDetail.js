import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actionCreators';
import { withRouter } from 'react-router';

class ReviewDetail extends React.Component{

    componentDidMount(){
        this.props.getReview(this.props.match.params.id);
    }

    render() {
        if(this.props.storedReview == null || this.props.storedReview.id != this.props.match.params.id){
            return <h1>Loading...</h1>;
        }
        console.log(this.props.storedReview);
        return (
            <div className="review_detail_page">
                <h2 className="review_detail_title">
                    {this.props.storedReview.title}
                </h2>
                <div className="review_detail_sool">
                    Sool: {this.props.storedReview.sool_id}
                </div>
                <div className="review_detail_rating">
                    Rating: {this.props.storedReview.star_rating}
                </div>
                <img src = {'/media/' + this.props.storedReview.image}></img>
                <p className="review_detail_content">
                    {this.props.storedReview.content}
                </p>
            </div>
        );
    }
    // 추천, comment, writer 추가하기
}

const mapStateToProps = state => {
    return {
        storedReview: state.review.selected,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getReview: (review_id) => dispatch(actionCreators.getReview(review_id)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewDetail));