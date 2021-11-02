import React from 'react';

import { withRouter } from 'react-router';

class WriteReview extends React.Component{
    state = {
        selected_alcohols : {id: 1, category_id: 1, name: 'alcohol 1 name', info: 'alcohol 1 info'},
    }; // alcohol example
    // id로 selected_alcohols 찾기
    
    render() {
        return (
            <div className="write_review_page">
                <h1> Write Review </h1>
                Title<input type="text"/>
                Image<input type="file"/>
                Content<input type="text"/>
                <button onClick={() => this.props.history.push('/reivew/'+this.state.selected_alcohols.id)}>Submit</button>
            </div>
        );
    }
}

export default withRouter(WriteReview);