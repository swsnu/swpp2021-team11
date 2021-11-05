import React, {useState} from 'react';
import {Redirect} from 'react-router';
import TitleBar from '../components/common/title';
import MenuBar from '../components/common/menuBar';
import {withRouter} from 'react-router-dom';
import './taste-test.css';

function TasteTest(props) {
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
    const [result, setShow] = useState(false);

    const handleAnswerOptionClick = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShow(true);
            props.history.push('/rec');
        }
    };
    return (
        <div className="taste-test" id="padding">
            <div className="MainPage">
                <TitleBar />
                <MenuBar />
            </div>
            {result ? (
                <div className="rec">
                    <Redirect exact from="/" to="rec" />
                </div>
            ) : (
                <>
                    <div className="question-section">
                        <div className="question-title">
                            <h2 id="h2"> Please answer these questions to get our recommendation!</h2>
                        </div>
                        <div className="question-text">
                            <h2 id="h2">{questions[currentQuestion].questionText}</h2>
                        </div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button
                                id="button"
                                key={questions.findIndex.toString()}
                                onClick={() => handleAnswerOptionClick()}
                            >
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default withRouter(TasteTest);
