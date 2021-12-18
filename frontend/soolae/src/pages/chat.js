import axios from 'axios';
import React from 'react';
import AlcoholDetailInfo from '../components/alcohol/alcohol_detail_info';

const RecommendationItem = (index, id) => {
    return (
        <li key={index}>
            <AlcoholDetailInfo id={id} />
        </li>
    );
};

const QuestionItem = (index, questinon_string) => <li key={index}>{questinon_string}</li>;

const itemFunction = (itm, index) =>
{
    if(itm.type === 'question')
    {
        return QuestionItem(index, itm.string);
    }
    return RecommendationItem(index, itm.id);
};

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {history: [], value : ''};
        this.sendHandler = this.sendHandler.bind(this);
    }

    sendHandler()
    {
        const userString = this.state.value;
        if(userString !== '')
        {
            this.setState({value: '', history: [...this.state.history, {type: 'question', string: userString}]});
            axios.post('http://api.fkr.kr:8081/language', {string: userString}).then((res) => 
            {this.setState({history: [...this.state.history, {type: 'answer', id: res.data.index[0]}]});});
        }
    }

    pressEnter(e){
        if(e.key == 'Enter'){
            this.sendHandler();
        }
    }

    render() {
        return (
            <div className="MainPage">
                <h1 style={{marginLeft: 65}}>Chat with your personal Sommelier</h1>
                <ul style={{listStyleType: 'none'}}>{this.state.history.map((item, index) => itemFunction(item, index))}</ul>
                <h2>
                    <input type='text' value={this.state.value}
                        onChange={(event) => {this.setState({value: event.target.value});}}
                        onKeyDown={(e) => this.pressEnter(e)} />
                    <button onClick={this.sendHandler}>Send</button>
                </h2>
            </div>
        );
    }
}


export default ChatPage;
