import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import TitleBar from '../../components/common/title';
import MenuBar from '../../components/common/menuBar';

import * as actionCreators from '../../store/actions/index';
import AlcoholListForm from '../../components/categoryDetail/alcoholListForm';

const mapStateToProps = state => {
    return {
        category_alcohols: state.alcohol.category_alcohols,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategoryAlcohols: (id) => {return dispatch(actionCreators.getCategoryAlcohols(id));},
    };
};

class CategoryDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {loaded:false};
    }

    componentDidMount()
    {
        this.props.onGetCategoryAlcohols(this.props.match.params.id).then(()=>{this.setState({loaded: true});});
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
                <AlcoholListForm alcohols={this.props.category_alcohols}/>
            </>);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetail));