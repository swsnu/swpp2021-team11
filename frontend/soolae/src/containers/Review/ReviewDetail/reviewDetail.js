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
        return (
            <div className="review_detail_page">
                <div className="review_detail_title">
                    {this.props.storedReview.title}
                </div>
                <div className="review_detail_image">
                    {this.props.storedReview.image}
                </div>
                <div className="review_detail_content">
                    {this.props.storedReview.content}
                </div>
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