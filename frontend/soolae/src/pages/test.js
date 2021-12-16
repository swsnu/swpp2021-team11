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
            answerOptions: [{answerText: '기쁘다'}, {answerText: '괜찮다'}, {answerText: '편안하다'}, {answerText: '화가 난다'}],
        },
        {
            questionText: 'What kind of taste do you prefer?',
            answerOptions: [
                {answerText: '달다'},
                {answerText: '보통'},
                {answerText: '부드럽다'},
                {answerText: '쓰다'},
            ],
        },
        {
            questionText: 'What percentage of alchohol do you prefer?',
            answerOptions: [{answerText: '약함'}, {answerText: '보통'}, {answerText: '쎔'}, {answerText: '아주 쎔'}],
        },
        {
            questionText: 'What is the occasion of drinking?',
            answerOptions: [
                {answerText: '공식적인 자리'},
                {answerText: '친구들과'},
                {answerText: '가족과'},
                {answerText: '혼자서'},
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
            console.log(answers);
            let result = '';
            answers.map((answer) => result += answer + ' ');
            console.log(result);
            props.getTestResult(result);
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
                            <button className='d-flex justify-content-center' id="button" key={index} onClick={() => handleAnswerOptionClick(answerOption.answerText)}>
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
        getTestResult: (answers) => dispatch(actionCreators.getTestResult(answers)),
    };
};

export default withRouter(connect(null, mapDispatchToProps)(TestPage));
