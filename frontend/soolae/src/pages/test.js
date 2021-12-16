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
            questionText: '당신이 선호하는 맛은?',
            answerOptions: [
                {answerText: '처지는 텐션은 단맛으로 올려야...'},
                {answerText: '약간 씁쓸한게 우리 삶 아닐까?'},
                {answerText: '차라리 새콤하고 상쾌한 신맛이 나을거야. '},
            ],
        },
        {
            questionText: '오늘은 어떤 술이 필요하신가요?',
            answerOptions: [
                {answerText: '가볍게 혼자 마실 술'},
                {answerText: '친구들과 떠들며 즐겁게 마실 술'},
                {answerText: '분위기 잡고 마실 술'},
            ],
        },
        {
            questionText: '지금 당신의 기분은 어떤가요?',
            answerOptions: [
                {answerText: '오늘 날씨 만큼이나 기분도 울적한데...'},
                {answerText: '이렇게나 즐겁고 기쁜 날'},
                {answerText: '그렇게 슬프지는 않은데 어딘가 지친다...'},
            ],
        },
        {
            questionText: '당신이 가장 좋아하는 계절은?',
            answerOptions: [
                {answerText: '화사한 봄이 좋다!'},
                {answerText: '정열적인 여름이 나는 좋다!'},
                {answerText: '선선하고 차분한 가을이 좋다!'},
                {answerText: '밝고 차가운 겨울이 좋다!'},
            ],
        },
        {
            questionText: '가장 좋아하는 색은?',
            answerOptions: [
                {answerText: '즐겁고 평화로운 노란색'},
                {answerText: '마음까지 편안해지는 초록색'},
                {answerText: '신비롭고 우아한 파란색'},
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
            const userId = Math.floor(Math.random() * 1000) + 3000;
            props.getTestResult(userId, answers).then(() => {props.history.push('/rec');});
            
        }
    };
    return (
        <div className="taste-test" id="padding">
            {
                <>
                    <div className="question-section" style={{padding: '15px'}}>
                        <hr />
                        <div className="alert alert-dark" role="alert">
                            <h3 id="h2"> Please answer these questions to get our recommendation!</h3>
                            <br />
                        </div>
                        <div className="question-text" style={{paddingLeft: '30px'}}>
                            <h2 id="h2">{questions[currentQuestion].questionText}</h2>
                        </div>
                        <br />
                    </div>
                    <div className="row justify-content-center" id="answer-section">
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
        getTestResult: (userId, answers) => {
            return dispatch(actionCreators.getTestResult(userId, answers));
        },
    };
};

export default withRouter(connect(null, mapDispatchToProps)(TestPage));
