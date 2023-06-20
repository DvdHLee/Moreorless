import React from 'react';

import { useState, useEffect } from 'react';
import './Content.css';

function setWithExpiry(key, value, expiration) {
    const item = {
        value: value,
        expiry: expiration,
    }

    localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
    const jsonItem = localStorage.getItem(key);
    if (!jsonItem) {
        return null;
    }

    const item = JSON.parse(jsonItem);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}

function setFinalScore(key, value) {
    const values = localStorage.getItem(key);
    if (!values) {
        localStorage.setItem(key, value);
    } else {
        const existingvalues = localStorage.getItem(key);
        localStorage.setItem(key, existingvalues + " " + value);
    }
}

const Content = props => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    if (!getWithExpiry("questionNumber")) {
        setWithExpiry("questionNumber", 0, midnight.getTime())
        setWithExpiry("showSummary", false, midnight.getTime())
        setWithExpiry("score", 0, midnight.getTime())
    }

    var storedQuestionNumber = parseInt(getWithExpiry("questionNumber"));
    var storedShowSummary = getWithExpiry("showSummary");
    var storedScore = parseInt(getWithExpiry("score"));

    if (!storedQuestionNumber) {
        setWithExpiry("questionNumber", 0, midnight.getTime())
        setWithExpiry("showSummary", false, midnight.getTime())
        setWithExpiry("score", 0, midnight.getTime())
    }

    const [questionNumber, setQuestionNumber] = useState(storedQuestionNumber);
    const [score, setScore] = useState(storedScore);
    const [wrongNumberArray, setWrongNumberArray] = useState([]);
    const [showNext, setShowNext] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const [showSummaryButton, setShowSummaryButton] = useState(false);
    const [showSummary, setShowSummary] = useState(storedShowSummary);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
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
        setWrongNumberArray(numberArray.map(randomizeFN));  // eslint-disable-next-line
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
        setCorrect(false);
        setWrong(false);
        if (questionNumber < 4) {
            setQuestionNumber(questionNumber + 1);
            setShowButtons(true);
        }
        setShowNext(false);
    }

    const clickedSummary = () => {
        setShowSummary(true);
    }

    const clickedRight = () => {
        setWithExpiry("score", score + 1, midnight.getTime())
        setScore(score + 1);
        setShowButtons(false);
        setCorrect(true);
        if (questionNumber < 4) {
            setWithExpiry("questionNumber", questionNumber + 1, midnight.getTime())
            setShowNext(true);
        } else {
            setFinalScore("finalscores", score + 1);
            setWithExpiry("showSummary", true, midnight.getTime())
            setShowSummaryButton(true);
        }
    }

    const clickedWrong = () => {
        setShowButtons(false);
        setWrong(true);
        if (questionNumber < 4) {
            setWithExpiry("questionNumber", questionNumber + 1, midnight.getTime())
            setShowNext(true);
        } else {
            setFinalScore("finalscores", score);
            setWithExpiry("showSummary", true, midnight.getTime())
            setShowSummaryButton(true);
        }
    }

    const clickedStats = () => {
        props.onClickedStats();
    }

    return (
        <div>
            <div className={showSummary ? "disappear" : "content"}>
                <p className="questionnumber">Question {questionNumber + 1}</p>
                <p className="score">Score: {score}</p>
                <p className="question">{wrongQuestionArray[questionNumber]}</p>
                {(answerArray[questionNumber] === 0)
                    ? <div>
                        <button className={showButtons ? "questionchoicetop" : "disappear"} onClick={clickedRight}>
                            <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
                        </button>
                        <div className="answertop" style={(correct && !wrong) ? { boxShadow: "0 0 15px rgb(44, 187, 75)" } : {}}>{numberArray[questionNumber]}</div>
                        <button className="questionchoicemid">
                            <p className="exact">{wrongNumberArray[questionNumber]}</p>
                        </button>
                        <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedWrong}>
                            <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
                        </button>
                        <div className="answerbot" style={(!correct && wrong) ? { boxShadow: "0 0 15px rgb(145, 0, 0)" } : {}}>
                            <img className="redx" src="/assets/redx.png" alt="red x"></img>
                        </div>
                    </div>
                    : <div>
                        <button className={showButtons ? "questionchoicetop" : "disappear"} onClick={clickedWrong}>
                            <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
                        </button>
                        <div className="answertop" style={(!correct && wrong) ? { boxShadow: "0 0 15px rgb(145, 0, 0)" } : {}}>
                            <img className="redx" src="/assets/redx.png" alt="red x"></img>
                        </div>
                        <button className="questionchoicemid">
                            <p className="exact">{wrongNumberArray[questionNumber]}</p>
                        </button>
                        <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedRight}>
                            <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
                        </button>
                        <div className="answerbot" style={(correct && !wrong) ? { boxShadow: "0 0 15px rgb(44, 187, 75)" } : {}}>{numberArray[questionNumber]}</div>
                    </div>
                }
                <button className={showNext ? "next" : "disappear"} onClick={clickedNext}>Next</button>
                <button className={showSummaryButton ? "next" : "disappear"} onClick={clickedSummary}>Summary</button>
            </div>
            <div className={showSummary ? "summary" : "disappear"}>
                <p>Today's Score: {score}</p>
                <p>Average Score: 3.4</p>
                <p className="questionreviewtitle">Question Review</p>
                <div className="questionreview">
                    {questionArray[0]}
                    <br></br>{questionArray[1]}
                    <br></br>{questionArray[2]}
                    <br></br>{questionArray[3]}
                    <br></br>{questionArray[4]}
                </div>
                <button className="allstatsbutton" onClick={clickedStats}>All Stats</button>
            </div>
        </div>
    )
}

export default Content;