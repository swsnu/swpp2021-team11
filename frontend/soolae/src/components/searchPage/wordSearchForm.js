import React from 'react';
import { withRouter } from 'react-router-dom'; 

const WordSearchForm = () => {
    return (
        <div className="word_search">
            <input type="text"/>
            <button onClick={() => {}}>Search</button>;
        </div>
    );
};

export default withRouter(WordSearchForm);