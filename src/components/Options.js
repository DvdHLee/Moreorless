import React from 'react';

import './Options.css';

const Options = props => {
    return (
        <div className="options">
            <header1 className="optionstitle">Options</header1>
            <button className="optionsexit">
                <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
            </button>
            <button className="optionselement">
                <img className="optionselementimg" src="/assets/info.png" alt="info"></img>
                <p className="optionselementtitle">How To Play</p>
            </button>
            <button className="optionselement">
                <img className="optionselementimg" src="/assets/stats.png" alt="stats"></img>
                <p className="optionselementtitle">Statistics</p>
            </button>
            <button className="optionselement">
                <img className="optionselementimg" src="/assets/about.png" alt="about"></img>
                <p className="optionselementtitle">About</p>
            </button>
            <button className="optionselement">
                <img className="optionselementimg" src="/assets/settings.png" alt="settings"></img>
                <p className="optionselementtitle">Settings</p>
            </button>
        </div>
    );
}

export default Options;