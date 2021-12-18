import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import {withRouter} from 'react-router';
import axios from 'axios';
import SearchAlcohol from '../components/search/search_alcohol';
import StarRateSelect from '../components/common/starSelect';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class WriteReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            title: '',
            alcohol_id: this.props.match.params.id,
            content: '',
            rating: 1,
            image: null,
            alcohol_select: false,
        };
        this.selectAlcohol = this.selectAlcohol.bind(this);
        this.selectAlcoholEnd = this.selectAlcoholEnd.bind(this);
        this.getAlcoholName = this.getAlcoholName.bind(this);
    }

    getAlcoholName(id) {
        if(!id){
            id = this.props.match.params.id;
        }
        let [alcohol] = this.props.alcohol_info.filter((item) => item.id == id);
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
        this.setState({alcohol_select: !this.state.alcohol_select});
    }

    submitReview() {
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('rating', this.state.rating);
        formData.append('image', this.state.image);
        formData.append('sool_id', this.state.alcohol_id);
        this.props.postReview(formData);
        this.setState({submitted: false});
    }

    render() {
        if(!this.props.logged_in){
            this.props.requireLogin();
            return <div>Loading...</div>;
        }
        if(!this.props.alcohol_info || this.props.alcohol_info.length == 0){
            this.props.getAlcoholInfo(172);
            return <div>Loading...</div>;
        }
        else{
            this.getAlcoholName(this.props.match.params.id);
        }
        return (
            <div className="write_review_page" style={{padding:'30px'}}>
                <div className='row d-flex'>
                    <hr/>
                    <div className="col-md-0">
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
                                {!this.state.alcohol_id ? 'Select Alcohol' : this.getAlcoholName(this.state.alcohol_id)}
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
                                type='file'
                                accept='image/*'
                                name='review_image'
                                onChange={(event) => this.setState({image: event.target.files[0]})}
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
        logged_in: state.user.logged_in,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (new_reivew) => dispatch(actionCreators.postReview(new_reivew)),
        getAlcoholInfo: (id) => dispatch(actionCreators.getAlcoholInfo(id)),
        requireLogin: () => dispatch(actionCreators.requireLogin()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteReviewPage));
