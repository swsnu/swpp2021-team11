import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import * as actionCreators from '../store/actions/actionCreators';
import './taste-test.css';

function TestPage(props) {
    //This part may get changed after we discuss more
    //Sample example
    const questions = [
        {
            questionText: 'How do you feel today?',
            answerOptions: [{answerText: 'Happy'}, {answerText: 'Fine'}, {answerText: 'Chill'}, {answerText: 'Upset'}],
        },
        {
            questionText: 'What kind of taste do you prefer?',
            answerOptions: [
                {answerText: 'Sweet'},
                {answerText: 'Moderate'},
                {answerText: 'Soft'},
                {answerText: 'Bitter'},
            ],
        },
        {
            questionText: 'What percentage of alchohol do you prefer?',
            answerOptions: [{answerText: '5%'}, {answerText: '15%'}, {answerText: '30%'}, {answerText: '70%'}],
        },
        {
            questionText: 'What is the occasion of drinking?',
            answerOptions: [
                {answerText: 'For a Formal meeting'},
                {answerText: 'With Friends'},
                {answerText: 'With Family'},
                {answerText: 'Alone'},
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]); //saved and sent to backend server

    const handleAnswerOptionClick = (answer) => {
        setAnswers(answers.concat(answer));
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            props.getTestResult(answers);
            props.history.push('/rec');
        }
    };
    return (
        <div className="taste-test" id="padding">
            {
                <>
                    <div className="question-section" style={{padding:'15px'}}>
                        <hr/>
                        <div className="alert alert-dark" role="alert" >
                            
                            <h3 id="h2"> Please answer these questions to get our recommendation!</h3><br/>
                        </div>
                        <div className="question-text" style={{paddingLeft:'30px'}}>
                            <h2 id="h2">{questions[currentQuestion].questionText}</h2>
                        </div>
                        <br/>
                    </div>
                    <div className="row justify-content-center" id='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button className='d-flex justify-content-center' id="button" key={index} onClick={() => handleAnswerOptionClick(index)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTestResult: () => dispatch(actionCreators.getTestResult()),
    };
};

export default withRouter(connect(null, mapDispatchToProps)(TestPage));
