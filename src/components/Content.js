import React from 'react';

import { useState } from 'react';
import './Content.css';

const Content = props => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [score, setScore] = useState(0);

    return (
        <div className="content">
            <p className="questionnumber">Question 1</p>
            <p className="score">Score: 0</p>
            <p className="question">The United States is comprised of 53 states.</p>
            <button className="questionchoice">
                <img className="questionchoiceimg" src="/assets/more.png" alt="more"></img>
            </button>
            <button className="questionchoice">
                <p className="exact">53</p>
            </button>
            <button className="questionchoice">
                <img className="questionchoiceimg" src="/assets/less.png" alt="less"></img>
            </button>
        </div>
    )
}

export default Content;