import React from 'react';
import {withRouter} from 'react-router';
import AlcoholDetailInfo from '../../components/alcohol/alcohol_detail_info';

class AlcoholDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AlcoholDetailInfo id={parseInt(this.props.match.params.id)} />;
    }
}

export default withRouter(AlcoholDetailPage);
