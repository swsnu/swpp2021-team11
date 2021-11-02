import React from 'react';

import { withRouter } from 'react-router';

class AlcoholDetail extends React.Component{
    state = {
        selected_alcohols : {id: 1, category_id: 1, name: 'alcohol 1 name', info: 'alcohol 1 info'},
        review_list : [
            {id: 1, writer_id: 1, alcohol_id: 1, title: 'review 1 title', content: 'review 1 content', image: 'review 1 image'},
            {id: 2, writer_id: 2, alcohol_id: 1, title: 'review 2 title', content: 'review 2 content', image: 'review 2 image'},
            {id: 3, writer_id: 3, alcohol_id: 1, title: 'review 3 title', content: 'review 3 content', image: 'review 3 image'},
            {id: 4, writer_id: 4, alcohol_id: 1, title: 'review 4 title', content: 'review 4 content', image: 'review 4 image'},
            {id: 5, writer_id: 5, alcohol_id: 1, title: 'review 5 title', content: 'review 5 content', image: 'review 5 image'},
        ]
    }; // alcohol, review example
    // url에서 id받아와서 selected_alcohols 찾기

    render() {
        return(
            <div className="alcohol_detail_page">
                <div className="alcohol_name">
                    {this.state.selected_alcohols.name}
                </div>
                <div className="alcohol_info">
                    {this.state.selected_alcohols.info}
                </div>
                <div className="write_review_button">
                    <button onClick={() => {this.props.history.push('/write-review/'+this.state.selected_alcohols.id);}}>Write Review</button>
                </div>
            </div>
        );
    }
}

export default withRouter(AlcoholDetail);