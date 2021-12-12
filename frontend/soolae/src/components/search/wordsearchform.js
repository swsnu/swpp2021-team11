import React from 'react';

class WordSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {word: ''};
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
                <button className='btn btn-primary' style={{margin:'3px'}}
                    onClick={() => {this.props.onClick(this.state.word);}}
                >
                    Search
                </button>

            </div>
        );
    }
}

export default WordSearchForm;