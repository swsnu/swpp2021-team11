import React from 'react';

class Recommendation extends React.Component {
    render(){
        const title = 'Today\'s Recommendation';
        return (
            <div className='recommendation'>
                <h2>{title}</h2>
                <h3>{this.props.alcohol.name}</h3>
            </div>
        );
    }
}
export default Recommendation;