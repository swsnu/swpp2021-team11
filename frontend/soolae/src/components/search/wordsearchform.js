import React from 'react';

class WordSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {word: ''};
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.props.onClickSearch(this.state.word);
        }
    }

    render(){
        return (
            <div className="word_search" style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
                <input
                    type="text"
                    name="word"
                    style={{width:'500px', height:'30px', borderStyle:'solid', borderWidth:'3px'}}
                    value={this.state.word}
                    onChange={(e) => {this.setState({word: e.target.value});}}
                    onKeyDown={(e) => this.pressEnter(e)}
                />
                <button className='btn btn-primary' style={{margin:'3px'}}
                    onClick={() => {this.props.onClickSearch(this.state.word);}}
                >
                    Search
                </button>
                <button className='btn btn-primary' style={{margin:'3px'}}
                    onClick={() => {this.props.onClickReset();}}
                >
                    Reset
                </button>
            </div>
        );
    }
}

export default WordSearchForm;