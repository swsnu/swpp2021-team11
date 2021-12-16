import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {ResponsiveBar} from '@nivo/bar';
import * as actionCreators from '../../store/actions/actionCreators';
import StarRate from '../common/star';

import './style.css';

const mapStateToProps = (state) => {
    return {
        alcohol_info: state.alcohol.alcohol_info,
        user_info: state.user.selected,
        logged_in: state.user.logged_in
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlcoholInfo: (id) => dispatch(actionCreators.getAlcoholInfo(id)),
        getProfile: () => dispatch(actionCreators.getProfile()),
        editProfile: (data) => dispatch(actionCreators.editProfile(data)),
    };
};

// props.id : need alcohol.id
const AlcoholDetailInfo = (props) => {
    let alcohol = props.alcohol_info.filter((item) => item.id === props.id);
    if (alcohol.length === 0) {
        props.getAlcoholInfo(props.id);
        //props.getProfile();
        return <div className="AlcoholDetailInfo">loading...</div>;
    }
    alcohol = alcohol[0];
    let data = [];
    const flavorList = ['acidity', 'bitter', 'body', 'carbonic', 'flavor', 'nutty', 'plain', 'richness', 'spicy', 'sweet', 'tannin'];
    flavorList.forEach((flavor) =>{
        if(alcohol[flavor] != -1){
            data.push({
                'flavor': flavor,
                'num': alcohol[flavor]
            });
        }
    });
    const onClickInfo = () => {
        if(props.match.url != '/alcohol/' + props.id){
            props.history.push('/alcohol/' + props.id);
        }
    };

    let starButton = '☆';
    let changeStar;
    if(!props.logged_in){
        starButton = '';
    }
    else if(!props.user_info){
        props.getProfile();
    }
    else{
        let favorites = props.user_info.favorite_sool;

        if(favorites){
            starButton = favorites.map(idx => idx.id).includes(alcohol.id) ? '★' : '☆';
        }
        else{
            return <div>Loading...</div>;
        }
        changeStar = () => {
            const data = {
                'favorite_sool': alcohol.id
            };
            props.editProfile(data);
        };
    }

    return (
        <div className="AlcoholDetailInfo" onClick={() => onClickInfo()}>
            <div>
                <span style={{fontSize:'30px', marginLeft:'20px'}}>{alcohol.name}</span>
                <span style={{float:'right', fontSize:'30px', color:'#fae452'}} onClick={() => changeStar()}>{starButton}</span>
            </div>
            <img style={{width:'35%', margin: '10px'}}src={'/media/' + alcohol.sool_image} alt="Alcohol Image" />
            <div style={{margin:'10px', width:'60%', float:'right'}}>
                <div style={{height:'250px'}}>
                    <div>Alcohol Content: {alcohol.alcohol_content}	℃</div>
                    <div>Price: {alcohol.price}&#8361;</div>
                    <div>
                        Rate: <StarRate rate={alcohol.rating} />
                    </div>
                    <div>Buy: <a href={alcohol.link}>{alcohol.link}</a></div>
                    <ResponsiveBar
                        data={data}
                        keys={['num']}
                        indexBy='flavor'
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        role='application'
                        ariaLabel='Nivo bar chart demo'
                    />
                    <blockquote>
                        <p>{alcohol['taste_note']}</p>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlcoholDetailInfo));
