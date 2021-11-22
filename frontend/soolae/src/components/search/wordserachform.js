import React from 'react';

class WordSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {word: ''};
        //this.word_search_button_callback = this.word_search_button_callback.bind(this);
    }

    
    render(){
        return (
            <div className="word_search">
                <input 
                    type="text"
                    name="word"
                    value={this.state.word}
                    onChange={(e) => {this.setState({word: e.target.value});}}
                />
                <button
                    onClick={() => {this.props.onClick(this.state.word);}}
                >
                    Search
                </button>

            </div>
        );
    }
}

export default WordSearchForm;