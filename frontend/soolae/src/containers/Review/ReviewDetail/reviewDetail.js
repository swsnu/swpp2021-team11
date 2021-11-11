import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/actionCreators';
import { withRouter } from 'react-router';
import StarRate from '../../../components/common/star';
import '../style.css';
import AlcoholDetailInfo from '../../../components/alcohol_info';

class ReviewDetail extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {load: false};
    }

    componentDidMount(){
        this.props.getReview(this.props.match.params.id).then(() =>{this.setState({load:true});});
    }

    render() {
        if(!this.state.load || this.props.storedReview == null || this.props.storedReview.id != this.props.match.params.id){
            return <h1>Loading...</h1>;
        }
        let [alcohol] = this.props.alcohol_list.filter((item) => {console.log(item.id);return item.id === this.props.storedReview.sool_id;});
        console.log(alcohol);
        return (
            <div className="review_detail_page">
                <h1 className="review_detail_title">
                    {this.props.storedReview.title}
                </h1>
                <h2 className="review_detail_sool">
                    <AlcoholDetailInfo alcohol_info={alcohol}/>
                </h2>
                <h2 className="review_detail_rating">
                    Rating: <StarRate rate={this.props.storedReview.star_rating}/>
                </h2>
                <img src = {'/media/' + this.props.storedReview.image}></img>
                <div className="review_detail_content">
                    {this.props.storedReview.content}
                </div>
            </div>
        );
    }
    // 추천, comment, writer 추가하기
}

const mapStateToProps = state => {
    return {
        storedReview: state.review.selected,
        alcohol_list: state.alcohol.alcohol_list
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getReview: (review_id) => Promise.all([dispatch(actionCreators.getReview(review_id)), dispatch(actionCreators.getAlcoholList())]),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReviewDetail));