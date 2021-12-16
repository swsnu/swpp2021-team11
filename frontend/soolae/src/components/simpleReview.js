import React from 'react';
import StarRate from './common/star';
import {withRouter} from 'react-router-dom';

import './style.css';

class SimpleReview extends React.Component {
    render(){
        const review = this.props.review;
        return (
            <li className='simple-review' key={review.id} onClick={() => this.props.history.push('/review/' + review.id)}>
                <h2>{review.title}</h2>
                <h3>
                    Rating: <StarRate rate={review.star_rating} />
                </h3>
                <h3>
                    Author: <span>{review.author_name}</span>
                </h3>
            </li>
        );
    }
}

export default withRouter(SimpleReview);
