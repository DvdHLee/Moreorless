import React from 'react';

import { useState, useEffect } from 'react';
import './Content.css';

const Content = props => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [wrongNumberArray, setWrongNumberArray] = useState([]);
    const [showNext, setShowNext] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [showSummary, setShowSummary] = useState(false);
    const answerArray = [];

    const questionArray = [
        "The United States is comprised of 50 states",
        "There are 24 hours in a day",
        "The solar system has 8 planets",
        "The latest Iphone is the iphone 14",
        "The American Civil war lasted 4 years"
    ];

    const numberArray = questionArray.map((data) => data.match(/\d+/));

    useEffect(() => {
        setWrongNumberArray(numberArray.map(randomizeFN));
    }, []);

    function randomizeFN(number) {
        const deviation = Math.floor(Math.random() * (30 - 10 + 1) + 10) //deviation 10-30%
        const addorsubtract = Math.round(Math.random()) * 2 - 1;
        if (addorsubtract > 0) {
            return Math.ceil(number * (1 + (deviation * 0.01 * addorsubtract)));
        } else {
            return Math.floor(number * (1 + (deviation * 0.01 * addorsubtract)));
        }
    }

    const wrongQuestionArray = questionArray.map((data) => data.replace(/\d+/, '__'));

    for (let i = 0; i < numberArray.length; i++) {
        if (numberArray[i] < wrongNumberArray[i]) {
            answerArray.push(1);
        } else {
            answerArray.push(0);
        }
    }

    const clickedNext = () => {
        if (questionNumber < 4) {
            setQuestionNumber(questionNumber + 1);
            setShowButtons(true);
        }
        setShowNext(false);
    }

    const clickedSummary = () => {

    }

    const clickedRight = () => {
        setScore(score + 1);
        setShowButtons(false);
        if (questionNumber < 4) {
            setShowNext(true);
        } else {
            setShowSummary(true);
        }
    }

    const clickedWrong = () => {
        setShowButtons(false);
        if (questionNumber < 4) {
            setShowNext(true);
        } else {
            setShowSummary(true);
        }
    }

    return (
        <div className="content">
            <p className="questionnumber">Question {questionNumber + 1}</p>
            <p className="score">Score: {score}</p>
            <p className="question">{wrongQuestionArray[questionNumber]}</p>
            {(answerArray[questionNumber] == 0)
                ? <div>
                    <button className={showButtons ? "questionchoicetop" : "disappear"} onClick={clickedRight}>
                        <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
                    </button>
                    <div className="answertop">{numberArray[questionNumber]}</div>
                    <button className="questionchoicemid">
                        <p className="exact">{wrongNumberArray[questionNumber]}</p>
                    </button>
                    <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedWrong}>
                        <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
                    </button>
                    <div className="answerbot">
                        <img className="redx" src="/assets/redx.png" alt="red x"></img>
                    </div>
                </div>
                : <div>
                    <button className={showButtons ? "questionchoicetop" : "disappear"} onClick={clickedWrong}>
                        <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
                    </button>
                    <div className="answertop">
                        <img className="redx" src="/assets/redx.png" alt="red x"></img>
                    </div>
                    <button className="questionchoicemid">
                        <p className="exact">{wrongNumberArray[questionNumber]}</p>
                    </button>
                    <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedRight}>
                        <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
                    </button>
                    <div className="answerbot">{numberArray[questionNumber]}</div>
                </div>
            }
            <button className={showNext ? "next" : "disappear"} onClick={clickedNext}>Next</button>
            <button className={showSummary ? "next" : "disappear"} onClick={clickedSummary}>Summary</button>
        </div>
    )
}

export default Content;