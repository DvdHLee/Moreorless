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

function setMaxStreak(value) {
    localStorage.setItem("maxstreak", value);
}

function getMaxStreak() {
    return localStorage.getItem("maxstreak");
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

function getFinalScores(key) {
    const finalscores = localStorage.getItem(key);
    if (!finalscores) {
        return "Not Played Yet";
    }

    return finalscores;
}

function getAvgScores(finalscores) {
    var scorearraystr = finalscores.split(" ");
    var scorearrayint = scorearraystr.map(function (item) {
        return parseInt(item, 10);
    });

    const avg = scorearrayint.reduce((partialSum, a) => partialSum + a, 0) / scorearrayint.length;

    return avg.toFixed(2);
}

const Content = props => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const nextmidnight = new Date();
    nextmidnight.setHours(48, 0, 0, 0);

    if (!localStorage.getItem("streak")) {
        localStorage.setItem("streak", 0);
    }

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

    var now = new Date();
    var dayindex = now.getDay();

    const allQuestionsArray = [
        "The Earth's circumference at the equator is approximately 24901 miles.",
        "The Eiffel Tower in Paris is 330 meters tall.",
        "The speed of sound at sea level is approximately 343 meters per second.",
        "The average lifespan of a housefly is about 28 days.",
        "Mount Everest, the highest peak on Earth, stands at an elevation of 29032 feet.",
        "The Golden Gate Bridge in San Francisco is 8981 feet long.",
        "The number of teaspoons in a tablespoon is 3.",
        "The distance from the Earth to the Sun, on average, is about 93 million miles.",
        "The number of symphonies composed by Ludwig van Beethoven is 9.",
        "The boiling point of water at sea level is 100 degrees Celsius.",
        "The average lifespan of a domestic cat is around 15 years.",
        "The speed record for the fastest land animal, the cheetah, is about 70 miles per hour.",
        "The atomic number of carbon is 6.",
        "The average human heart beats around 100 thousand times per day.",
        "The Great Wall of China is approximately 13171 miles long.",
        "The standard human body temperature is around 98.6 degrees F.",
        "The Statue of Liberty in New York stands at a height of 305 feet.",
        "The number of chromosomes in a human cell is 46.",
        "The diameter of the Sun is approximately 865370 miles.",
        "The longest river in the world, the Nile, stretches for about 4132 miles.",
        "The average adult human body is composed of around 60% water.",
        "The deepest part of the world's oceans, the Mariana Trench, reaches a depth of 10935 meters.",
        "The Leaning Tower of Pisa tilts at an angle of approximately 4 degrees.",
        "The human brain weighs about 3 pounds",
        "The number of elements in the periodic table is 118.",
        "The United States Constitution has 27 amendments.",
        "The number of bones in the human hand is 27.",
        "The number of keys on a standard piano is 88.",
        "The number of sides on a heptagon is 7.",
        "The freezing point of water is 0 degrees Celsius.",
        "The average diameter of Earth's moon is about 2159 miles.",
        "The speed required for an object to break free from Earth's gravitational pull is approximately 25020 miles per hour.",
        "The estimated age of the universe is approximately 14 billion years.",
        "The number of teeth in a full set of adult human teeth, including wisdom teeth, is 32.",
        "The number of Academy Awards won by Walt Disney throughout his career was 26."];

    // const questionArray = [
    //     "The United States is comprised of 50 states",
    //     "There are 24 hours in a day",
    //     "The solar system has 8 planets",
    //     "The latest Iphone is the iphone 14",
    //     "The American Civil war lasted 4 years"
    // ];

    //Currently cycles through only 35 questions in this Beta 
    const questionArray = allQuestionsArray.slice(dayindex * 5, (dayindex * 5) + 5);

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
            if (!getWithExpiry("streak")) {
                setWithExpiry("streak", 1, nextmidnight.getTime());
                if (!getMaxStreak()) {
                    setMaxStreak(1);
                }
            } else {
                const currentstreak = getWithExpiry("streak");
                setWithExpiry("streak", currentstreak + 1, nextmidnight.getTime());
                if (parseInt(getWithExpiry("streak")) > parseInt(getMaxStreak())) {
                    setMaxStreak(getWithExpiry("streak"));
                }
            }
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
            if (!getWithExpiry("streak")) {
                setWithExpiry("streak", 1, nextmidnight.getTime());
                if (!getMaxStreak()) {
                    setMaxStreak(1);
                }
            } else {
                const currentstreak = getWithExpiry("streak");
                setWithExpiry("streak", currentstreak + 1, nextmidnight.getTime());
                if (parseInt(getWithExpiry("streak")) > parseInt(getMaxStreak())) {
                    setMaxStreak(getWithExpiry("streak"));
                }
            }
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
                            <img className="questionchoiceimg" src="./assets/more.png" alt="more"></img>
                        </button>
                        <div className="answertop" style={(correct && !wrong) ? { boxShadow: "0 0 15px rgb(44, 187, 75)" } : {}}>{numberArray[questionNumber]}</div>
                        <button className="questionchoicemid">
                            <p className="exact">{wrongNumberArray[questionNumber]}</p>
                        </button>
                        <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedWrong}>
                            <img className="questionchoiceimg" src="./assets/less.png" alt="less"></img>
                        </button>
                        <div className="answerbot" style={(!correct && wrong) ? { boxShadow: "0 0 15px rgb(145, 0, 0)" } : {}}>
                            <img className="redx" src="./assets/redx.png" alt="red x"></img>
                        </div>
                    </div>
                    : <div>
                        <button className={showButtons ? "questionchoicetop" : "disappear"} onClick={clickedWrong}>
                            <img className="questionchoiceimg" src="./assets/more.png" alt="more"></img>
                        </button>
                        <div className="answertop" style={(!correct && wrong) ? { boxShadow: "0 0 15px rgb(145, 0, 0)" } : {}}>
                            <img className="redx" src="./assets/redx.png" alt="red x"></img>
                        </div>
                        <button className="questionchoicemid">
                            <p className="exact">{wrongNumberArray[questionNumber]}</p>
                        </button>
                        <button className={showButtons ? "questionchoicebot" : "disappear"} onClick={clickedRight}>
                            <img className="questionchoiceimg" src="./assets/less.png" alt="less"></img>
                        </button>
                        <div className="answerbot" style={(correct && !wrong) ? { boxShadow: "0 0 15px rgb(44, 187, 75)" } : {}}>{numberArray[questionNumber]}</div>
                    </div>
                }
                <button className={showNext ? "next" : "disappear"} onClick={clickedNext}>Next</button>
                <button className={showSummaryButton ? "next" : "disappear"} onClick={clickedSummary}>Summary</button>
            </div>
            <div className={showSummary ? "summary" : "disappear"}>
                <p>Today's Score: {score}</p>
                <p>Average Score: {getAvgScores(getFinalScores("finalscores"))}</p>
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