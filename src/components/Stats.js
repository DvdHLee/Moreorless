import React from 'react';

import './Stats.css';

const Stats = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }

    return (
        <div className={props.showStats ? "stats" : "disappear"}>
            <div className="statsbox">
                <p className="optiontitle">Statistics</p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
            </div>
        </div>
    )
}

export default Stats;