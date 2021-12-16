import React from 'react';
import CategoryList from '../category/category_list';
import CategoryAlcoholList from '../category/category_alcohol_list';
import WordSearchForm from './wordsearchform';
import WordSearch from './wordsearch';


const VIEW_STATE = {CATEGORY: 'CATEGORY', ALCOHOL: 'ALCOHOL', WORD: 'WORD'};


class SearchAlcohol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {viewState: VIEW_STATE.CATEGORY, categoryId: undefined, searchword: undefined};
        this.select_category_callback = this.select_category_callback.bind(this);
        this.select_alcohol_callback = this.select_alcohol_callback.bind(this);
        this.word_search_callback = this.word_search_callback.bind(this);
        this.reset_callback = this.reset_callback.bind(this);
    }

    select_category_callback(id) {
        this.setState({viewState: VIEW_STATE.ALCOHOL, categoryId: id});
    }

    select_alcohol_callback(id) {
        this.props.onClick(id);
    }

    word_search_callback(value) {
        this.setState({viewState: VIEW_STATE.WORD, searchword: value});
    }

    reset_callback() {
        this.setState({viewState: VIEW_STATE.CATEGORY, categoryId: undefined, searchword: undefined});
    }

    render() {
        if (this.state.viewState === VIEW_STATE.CATEGORY) {
            return (
                <div>
                    <WordSearchForm onClickSearch={this.word_search_callback} onClickReset={this.reset_callback}/>
                    <CategoryList onClick={this.select_category_callback} />
                </div>
            );
        } else if (this.state.viewState === VIEW_STATE.ALCOHOL) {
            return (
                <div>
                    <WordSearchForm onClickSearch={this.word_search_callback} onClickReset={this.reset_callback}/>
                    <CategoryAlcoholList id={this.state.categoryId} onClick={this.select_alcohol_callback} />
                </div>
            );
        } else if (this.state.viewState === VIEW_STATE.WORD) {
            return(
                <>
                    <WordSearchForm onClickSearch={this.word_search_callback} onClickReset={this.reset_callback}/>
                    <WordSearch word={this.state.searchword} onClick={this.select_alcohol_callback} />
                </>
            );
        }
        return <WordSearchForm onClickSearch={this.word_search_callback} onClickReset={this.reset_callback}/>;
    }
}

export default SearchAlcohol;
