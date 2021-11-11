import React from 'react';

const StarRate = (props) => {
    let x = '';
    for(let i = 1; i < 6; ++i)
    {
        x += i < props.rate ? '★' : '☆';
    }
    return (
        <span className='StarRate'>
            {x}
        </span>
    );
};

export default StarRate;
