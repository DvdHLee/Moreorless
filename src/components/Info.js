import React from 'react';

import './Info.css';

const Info = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }
    
    return (
        <div className={props.showInfo ? "info" : "disappear"}>
            <div className="infobox">
                <p className="optiontitle">How to Play</p>
                <p>Each round, a question will be presented with a missing number. 
                    Your job is to pick "More" or "Less" than the given number in the middle. There are 5 rounds per day.</p>
                <p>Example:</p>
                <img className="exampleimg" src="/assets/example.png" alt="example"></img>
                <p>Since there are 24 hours in a day, we would select the "More" option (up arrow) as our correct choice.
                    Now let's play!
                </p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
            </div>
        </div>
    )
}

export default Info;