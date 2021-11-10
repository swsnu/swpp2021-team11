import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actionCreators';
import { withRouter } from 'react-router';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class WriteReview extends React.Component{
    state = {
        submitted: false,
        title: null,
        alcohol_id: null,
        content: null,
        rating: null,
        image: null,
    };
    
    submitReview(){
        this.props.postReview({
            'title': this.state.title,
            'content': this.state.content,
            'rating': this.state.rating,
            'id': this.state.alcohol_id
        });
        this.setState({submitted: false});
    }

    render() {
        console.log(this.state.submitted);
        return (
            <div className="write_review_page">
                <h1> Write Review </h1>
                Title<input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
                Sool<input type="number" value={this.state.alcohol_id} onChange={(event) => this.setState({alcohol_id: event.target.value})}/>
                Rating<input type="number" value={this.state.rating} onChange={(event) => this.setState({rating: event.target.value})}/>
                Image<input type="file" value={this.state.image} onChange={(event) => this.setState({image: event.target.value})}/>
                Content<input type="text" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})}/>
                <button disabled = {this.state.submitted} onClick = {() => this.submitReview()}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storedAlcohols: state.alcohol.recommended
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postReview: (new_reivew) => dispatch(actionCreators.postReview(new_reivew)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteReview));