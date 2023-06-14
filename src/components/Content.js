import React from 'react';

import { useState, useEffect } from 'react';
import './Content.css';

const Content = props => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [wrongNumberArray, setWrongNumberArray] = useState([]);
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

    console.log(numberArray)
    console.log(wrongNumberArray)
    console.log(answerArray);

    return (
        <div className="content">
            <p className="questionnumber">Question {questionNumber + 1}</p>
            <p className="score">Score: {score}</p>
            <p className="question">{wrongQuestionArray[questionNumber]}</p>
            <button className="questionchoice">
                <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
            </button>
            <button className="questionchoice">
                <p className="exact">{wrongNumberArray[questionNumber]}</p>
            </button>
            <button className="questionchoice">
                <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
            </button>
        </div>
    )
}

export default Content;