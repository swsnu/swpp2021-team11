import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actionCreators';
import { withRouter } from 'react-router';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import AlcoholSelect from '../../../components/common/alcoholSelect';
import StarRateSelect from '../../../components/common/starSelect';

class WriteReview extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            submitted: false, 
            title: '',
            alcohol_id: null,
            content: '',
            rating: 1,
            image: '',
            alcohol_name:null,
            alcohol_select: false
        };
        this.selectAlcohol = this.selectAlcohol.bind(this);
        this.selectAlcoholEnd = this.selectAlcoholEnd.bind(this);
    }
    
    selectAlcoholEnd(id, name)
    {
        this.setState({alcohol_select: false, alcohol_id : id, alcohol_name : name});
    }
    
    selectAlcohol()
    {
        this.setState({alcohol_select: true});
    }

    submitReview(){
        this.props.postReview({
            'title': this.state.title,
            'content': this.state.content,
            'rating': this.state.rating,
            'image': this.state.image,
            'id': this.state.alcohol_id,
            
        });
        this.setState({submitted: false});
    }

    render() {
        console.log(this.state.submitted);
        return (
            <div className="write_review_page">
                <h1> Write Review </h1>
                <div>Title<input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/></div>
                <div>Sool<button onClick={this.selectAlcohol}>{this.state.alcohol_name == null ? 'Select Alcohol' : this.state.alcohol_name}</button></div>
                {this.state.alcohol_select ? <AlcoholSelect select={this.selectAlcoholEnd}/> : null}
                <div>Rating: <StarRateSelect setRate={(rate) => {this.setState({rating: rate});}} rate={this.state.rating}/></div>
                <div>Image<input type="text" value={this.state.image} onChange={(event) => this.setState({image: event.target.value})}/></div>
                <div>Content<input type="text" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})}/></div>
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