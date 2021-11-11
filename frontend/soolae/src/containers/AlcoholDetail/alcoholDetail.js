import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import AlcoholDetailInfo from '../../components/alcohol_info';

const mapStateToProps = state => {
    return {
        alcohol_infos: state.alcohol.alcohol_info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: (id) => {return dispatch(actionCreators.getAlcoholInfo(id));}
    };
};

class AlcoholDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {loaded:false};
    }

    componentDidMount()
    {
        let x = this.props.id === undefined ? this.props.match.params.id : this.props.id;
        this.props.onGetAll(x).then(()=>{this.setState({loaded: true});});
    }

    render() {
        if(!this.state.loaded)
        {
            return (<>Loading...
            </>);
        }
        else
        {
            return(<>
                <AlcoholDetailInfo alcohol_info={this.props.alcohol_infos[this.props.alcohol_infos.length -1]}/>
            </>);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlcoholDetail));