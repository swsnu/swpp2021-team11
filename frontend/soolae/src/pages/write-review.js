import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import {withRouter} from 'react-router';
import axios from 'axios';
import SearchAlcohol from '../components/search/search_alcohol';
import StarRateSelect from '../components/common/starSelect';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
            <div className="write_review_page">
                <h1> Write Review </h1>
                <div>
                    Title
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                    />
                </div>
                <div>
                    Sool
                    <button onClick={this.selectAlcohol}>
                        {this.state.alcohol_id === null ? 'Select Alcohol' : this.getAlcoholName(this.state.alcohol_id)}
                    </button>
                </div>
                {this.state.alcohol_select ? <SearchAlcohol onClick={this.selectAlcoholEnd} /> : null}
                <div>
                    Rating:{' '}
                    <StarRateSelect
                        setRate={(rate) => {
                            this.setState({rating: rate});
                        }}
                        rate={this.state.rating}
                    />
                </div>
                <div>
                    Image
                    <input
                        type="text"
                        value={this.state.image}
                        onChange={(event) => this.setState({image: event.target.value})}
                    />
                </div>
                <div>
                    Content
                    <input
                        type="text"
                        value={this.state.content}
                        onChange={(event) => this.setState({content: event.target.value})}
                    />
                </div>
                <button disabled={this.state.submitted} onClick={() => this.submitReview()}>
                    Submit
                </button>
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
