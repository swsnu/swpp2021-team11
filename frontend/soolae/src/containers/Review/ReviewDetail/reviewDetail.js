import React from 'react';

class ReviewDetail extends React.Component{
    state = {
        selected_review : {id: 1, writer_id: 1, alcohol_id: 1, title: 'review 1 title', content: 'review 1 content', image: 'review 1 image'},
    }; 
    // id로 selected_review 찾기
    
    render() {
        return (
            <div className="review_detail_page">
                <div className="review_detail_title">
                    {this.state.selected_review.title}
                </div>
                <div className="review_detail_image">
                    {this.state.selected_review.image}
                </div>
                <div className="review_detail_content">
                    {this.state.selected_review.content}
                </div>
            </div>
        );
    }
    // 추천, comment, writer 추가하기
}

export default ReviewDetail;