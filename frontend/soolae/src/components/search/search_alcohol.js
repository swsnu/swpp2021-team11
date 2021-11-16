import React from 'react';

import CategoryList from '../category/category_list';
import CategoryAlcoholList from '../category/category_alcohol_list';

const WordSearchForm = () => {
    return (
        <div className="word_search">
            <input type="text" />
            <button onClick={() => {}}>Search</button>
        </div>
    );
};


const VIEW_STATE = {CATEGORY: 'CATEGORY', ALCOHOL: 'ALCOHOL'};

class SearchAlcohol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {viewState: VIEW_STATE.CATEGORY, categoryId: undefined};
        this.select_category_callback = this.select_category_callback.bind(this);
        this.select_alcohol_callback = this.select_alcohol_callback.bind(this);
    }

    select_category_callback(id) {
        this.setState({viewState: VIEW_STATE.ALCOHOL, categoryId: id});
    }

    select_alcohol_callback(id) {
        this.props.onClick(id);
    }

    render() {
        if (this.state.viewState === VIEW_STATE.CATEGORY) {
            return (
                <div className='SearchAlcohol'>
                    <WordSearchForm />
                    <CategoryList onClick={this.select_category_callback} />
                </div>
            );
        } else if (this.state.viewState === VIEW_STATE.ALCOHOL) {
            return (
                <div className='SearchAlcohol'>
                    <WordSearchForm />
                    <CategoryAlcoholList id={this.state.categoryId} onClick={this.select_alcohol_callback} />
                </div>
            );
        }
        return <WordSearchForm />;
    }
}

export default SearchAlcohol;
