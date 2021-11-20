import React from 'react';

const StarRateSelect = (props) => {
    let x = [1, 2, 3, 4, 5];
    const mapping = (i) => {
        return (<button onClick={() => {props.setRate(i);}} key={i}>{i <= props.rate ? '★' : '☆'}</button>);
    };
    x = x.map(mapping);
    
    return (
        <span className='StarRate'>
            {x}
        </span>
    );
};

export default StarRateSelect;
