import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { withRouter } from 'react-router';

class ReviewList extends React.Component{
    componentDidMount(){
        this.props.getReviewList();
    }
    
    render() {
        return (
            <div>
                <div className="review_list">
                    <h1> Review List </h1>
                    {this.props.storedReviews.map((review) => {
                        return (
                            <div key = {review.id} onClick = {() => this.props.history.push('/review/' + review.id)}>
                                <hr  style={{
                                    color: '#000000',
                                    backgroundColor: '#000000',
                                    borderColor : '#000000'
                                }}/>
                                <h1>{review.title}</h1>
                                <h2>Author: {review.author_id}</h2>
                                <h3>Rating: {review.star_rating}</h3>
                                <hr  style={{
                                    color: '#000000',
                                    backgroundColor: '#000000',
                                    borderColor : '#000000'
                                }}/>
                            </div>
                        );
                    })}
                </div>
                <button onClick = {() => this.props.history.push('/write-review/')}>post review</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedReviews: state.review.reviews,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getReviewList: () => dispatch(actionCreators.getReviewList()),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewList));