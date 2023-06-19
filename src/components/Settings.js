import React from 'react';

import './Settings.css';

const Settings = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }

    return (
        <div className={props.showSettings ? "settings" : "disappear"}>
            <div className="settingsbox">
                <p className="optiontitle">Settings</p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
            </div>
        </div>
    )
}

export default Settings;