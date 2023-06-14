import React from 'react';

import './Options.css';

const Options = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }

    const clickedInfo = () => {
        props.onClickedInfo();
    }

    const clickedStats = () => {
        props.onClickedStats();
    }

    const clickedAbout = () => {
        props.onClickedAbout();
    }

    const clickedSettings = () => {
        props.onClickedSettings();
    }

    return (
        <div className="option">
            <div className="backdrop" onClick={clickedExit}></div>
            <div className="options">
                <p className="optionstitle">Options</p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
                <button className="optionselement" onClick={clickedInfo}>
                    <img className="optionselementimg" src="/assets/info.png" alt="info"></img>
                    <p className="optionselementtitle">How To Play</p>
                </button>
                <button className="optionselement" onClick={clickedStats}>
                    <img className="optionselementimg" src="/assets/stats.png" alt="stats"></img>
                    <p className="optionselementtitle">Statistics</p>
                </button>
                <button className="optionselement" onClick={clickedAbout}>
                    <img className="optionselementimg" src="/assets/about.png" alt="about"></img>
                    <p className="optionselementtitle">About</p>
                </button>
                <button className="optionselement" onClick={clickedSettings}>
                    <img className="optionselementimg" src="/assets/settings.png" alt="settings"></img>
                    <p className="optionselementtitle">Settings</p>
                </button>
            </div>
        </div>
    );
}

export default Options;