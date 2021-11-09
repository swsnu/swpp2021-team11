import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import TitleBar from '../../components/common/title';
import MenuBar from '../../components/common/menuBar';

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
        this.props.onGetAll(this.props.match.params.id).then(()=>{this.setState({loaded: true});});
    }

    render() {
        if(!this.state.loaded)
        {
            return (<><TitleBar/><MenuBar/>Loading...
            </>);
        }
        else
        {
            return(<>
                <TitleBar/>
                <MenuBar/>
                <AlcoholDetailInfo alcohol_info={this.props.alcohol_infos[0]}/>
            </>);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlcoholDetail));