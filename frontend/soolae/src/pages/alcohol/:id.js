import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SimpleReview from '../../components/simpleReview';
import AlcoholDetailInfo from '../../components/alcohol/alcohol_detail_info';
import * as actionCreators from '../../store/actions/actionCreators';

class AlcoholDetailPage extends React.Component {
    componentDidMount(){
        //this.props.getAlcoholInfo(this.props.match.params.id);
    }
    render() {
        if(!this.props.alcohol_info || this.props.alcohol_info.length == 0){
            this.props.getAlcoholInfo(this.props.match.params.id);
            return <div className="AlcoholDetailPage">loading...</div>;
        }
        let alcohol = this.props.alcohol_info.filter((item) => item.id == this.props.match.params.id);
        if (alcohol.length === 0) {
            this.props.getAlcoholInfo(this.props.match.params.id);
            return <div className="AlcoholDetailPage">loading...</div>;
        }
        alcohol = alcohol[0];
        const review_list_item = (review) => {
            return (
                <SimpleReview review={review} />
            );
        };
        let reviewNum = 2;
        if(this.props.logged_in){
            reviewNum = alcohol.sool_review.length;
        }
        return (
            <div>
                <AlcoholDetailInfo id={parseInt(this.props.match.params.id)} />
                <div style={{textAlign:'center'}}>
                    <button style={{margin:'20px', height:'50px', backgroundColor:'#79cbd1', borderRadius:'10%'}} 
                        onClick={() => this.props.history.push('/write-review/' + alcohol.id)}>
                        Write a review For this Sool!
                    </button>
                </div>
                {alcohol.sool_review.map(review_list_item).slice(0, reviewNum)}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        alcohol_info: state.alcohol.alcohol_info,
        logged_in: state.user.logged_in
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlcoholInfo: (id) => dispatch(actionCreators.getAlcoholInfo(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlcoholDetailPage));
