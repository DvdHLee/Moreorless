import React from 'react';

import './Stats.css';

function getWithExpiry(key) {
    const jsonItem = localStorage.getItem(key);
    if (!jsonItem) {
        return "Not Played Yet";
    }

    const item = JSON.parse(jsonItem);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return "Not Played Yet";
    }

    return item.value;
}

function getFinalScores(key) {
    const finalscores = localStorage.getItem(key);
    if (!finalscores) {
        return null;
    }

    return finalscores;
}

function getGamesPlayed(finalscores) {
    if (!finalscores) {
        return 0;
    }
    var scorearraystr = finalscores.split(" ");
    return scorearraystr.length;
}

function getAvgScores(finalscores) {
    if (!finalscores) {
        return 0;
    }
    var scorearraystr = finalscores.split(" ");
    var scorearrayint = scorearraystr.map(function (item) {
        return parseInt(item, 10);
    });

    const avg = scorearrayint.reduce((partialSum, a) => partialSum + a, 0) / scorearrayint.length;

    return avg.toFixed(2);
}

function getMax(finalscores) {
    if (!finalscores) {
        return 0;
    }
    var scorearraystr = finalscores.split(" ");
    var scorearrayint = scorearraystr.map(function (item) {
        return parseInt(item, 10);
    });

    return Math.max(...scorearrayint);
}

function getMin(finalscores) {
    if (!finalscores) {
        return 0;
    }
    var scorearraystr = finalscores.split(" ");
    var scorearrayint = scorearraystr.map(function (item) {
        return parseInt(item, 10);
    });

    return Math.min(...scorearrayint);
}

function getStreak() {
    if (!getWithExpiry("streak")) {
        return 0;
    } else {
        return getWithExpiry("streak");
    }
}

function getMaxStreak() {
    if (!localStorage.getItem("maxstreak")) {
        return 0;
    }
    return localStorage.getItem("maxstreak");
}

const Stats = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }

    return (
        <div className={props.showStats ? "stats" : "disappear"}>
            <div className="backdrop" onClick={clickedExit}></div>
            <div className="statsbox">
                <p className="optiontitle">Statistics</p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
                <div className="statsnamelist">
                    <p>Today's Score</p>
                    <p>Average Score</p>
                    <p>Ganes Played</p>
                    <p>Streak</p>
                    <p>Max Streak</p>
                    <p>Best Score</p>
                    <p>Worst Score</p>
                </div>
                <div className="statsnumberlist">
                    <p>{getWithExpiry("score")}</p>
                    <p>{getAvgScores(getFinalScores("finalscores"))}</p>
                    <p>{getGamesPlayed(getFinalScores("finalscores"))}</p>
                    <p>{getStreak()}</p>
                    <p>{getMaxStreak()}</p>
                    <p>{getMax(getFinalScores("finalscores"))}</p>
                    <p>{getMin(getFinalScores("finalscores"))}</p>
                </div>
            </div>
        </div>
    )
}

export default Stats;