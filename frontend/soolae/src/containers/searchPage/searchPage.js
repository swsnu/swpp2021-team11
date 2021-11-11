import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CategorySearchForm from '../../components/searchPage/categorySearchForm';
import WordSearchForm from '../../components/searchPage/wordSearchForm';

import * as actionCreators from '../../store/actions/index';

const mapStateToProps = state => {
    return {
        category_list: state.category.category
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAll: () => {return dispatch(actionCreators.getCategories());}
    };
};

class SearchPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {loaded:false};
    }

    componentDidMount(){
        this.props.onGetAll().then(()=>{this.setState({loaded:true});});
    }

    render() {
        if(!this.state.loaded)
        {
            return (<>Loading...
            </>);
        }
        else
        {
            return(<div>
                <WordSearchForm/>
                <CategorySearchForm categorylist={this.props.category_list}/>
            </div>);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));