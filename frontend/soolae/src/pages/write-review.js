import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import {withRouter} from 'react-router';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import SearchAlcohol from '../components/search/search_alcohol';
import StarRateSelect from '../components/common/starSelect';
import 'bootstrap/dist/css/bootstrap.min.css';

class WriteReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            title: '',
            alcohol_id: null,
            content: '',
            rating: 1,
            image: '',
            alcohol_select: false,
        };
        this.selectAlcohol = this.selectAlcohol.bind(this);
        this.selectAlcoholEnd = this.selectAlcoholEnd.bind(this);
        this.getAlcoholName = this.getAlcoholName.bind(this);
    }

    getAlcoholName(id) {
        let [alcohol] = this.props.alcohol_info.filter((item) => item.id === id);
        if (alcohol === undefined) {
            this.props.getAlcoholInfo(id);
            return 'loading';
        }
        return alcohol.name;
    }
    selectAlcoholEnd(id) {
        this.setState({alcohol_select: false, alcohol_id: id});
    }

    selectAlcohol() {
        this.setState({alcohol_select: true});
    }

    submitReview() {
        this.props.postReview({
            title: this.state.title,
            content: this.state.content,
            rating: this.state.rating,
            image: this.state.image,
            id: this.state.alcohol_id,
        });
        this.setState({submitted: false});
    }

    render() {
        return (
            <div className="write_review_page" style={{padding:'30px'}}>
                <div className='row d-flex'>
                    <hr/>
                    <div className="col-md-6">
                        
                        <h1> Write Review </h1>
                        <div className='form-group'>
                            <label className='form-label'>Title</label>
                            <input className='form-control'
                                type="text"
                                value={this.state.title}
                                onChange={(event) => this.setState({title: event.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <label className='form-label' style={{margin:'3px'}}>Sool</label>
                            <button className='btn btn-dark' style={{margin:'3px'}} onClick={this.selectAlcohol}>
                                {this.state.alcohol_id === null ? 'Select Alcohol' : this.getAlcoholName(this.state.alcohol_id)}
                            </button>
                        </div>
                        {this.state.alcohol_select ? <SearchAlcohol onClick={this.selectAlcoholEnd} /> : null}
                        <div className='form-group'>
                            Rating{' '}
                            <StarRateSelect
                                setRate={(rate) => {
                                    this.setState({rating: rate});
                                }}
                                rate={this.state.rating}
                            />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Image</label>
                            <input className='form-control'
                                type="text"
                                value={this.state.image}
                                onChange={(event) => this.setState({image: event.target.value})}
                            />
                        </div>
                        <div>
                            <label className='form-label'>Content</label>
                            <input className='form-control'
                                type="text"
                                value={this.state.content}
                                onChange={(event) => this.setState({content: event.target.value})}
                            />
                        </div>
                        <button className="btn btn-primary" style={{margin:'5px'}} disabled={this.state.submitted} onClick={() => this.submitReview()}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alcohol_info: state.alcohol.alcohol_info,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (new_reivew) => dispatch(actionCreators.postReview(new_reivew)),
        getAlcoholInfo: (id) => dispatch(actionCreators.getAlcoholInfo(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteReviewPage));
