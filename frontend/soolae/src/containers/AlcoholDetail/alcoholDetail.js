import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

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
        this.props.onGetAll(this.props.match.params.id).then(()=>{this.setState({loaded: true});});
    }

    render() {
        if(!this.state.loaded)
        {
            return (<div>Loading...</div>);
        }
        else
        {
            return(
                <div className="alcohol_detail_page">
                    {this.props.alcohol_infos[0].name}
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlcoholDetail));