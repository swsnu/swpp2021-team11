import React from 'react';
import {withRouter} from 'react-router';

import SearchAlcohol from '../components/search/search_alcohol';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.select_alcohol_callback = this.select_alcohol_callback.bind(this);
    }

    select_alcohol_callback(id) {
        this.props.history.push('/alcohol/' + id);
    }

    render() {
        return (
            <div>
                <SearchAlcohol onClick={this.select_alcohol_callback} />
            </div>
        );
    }
}

export default withRouter(SearchPage);
