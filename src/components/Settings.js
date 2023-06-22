import React from 'react';

import { useState } from 'react';
import './Settings.css';

const Settings = props => {
    const [showDarkNotImplemented, setDarkShowNotImplemented] = useState(false);
    const [showHardNotImplemented, setHardShowNotImplemented] = useState(false);
    const clickedExit = () => {
        props.onClickedExit();
    }

    const clickedDarkNotImplementedYet = () => {
        setDarkShowNotImplemented(!showDarkNotImplemented);
        if (!showDarkNotImplemented) {
            alert("This feature has not been added yet :(");
        }
    }

    const clickedHardNotImplementedYet = () => {
        setHardShowNotImplemented(!showHardNotImplemented);
        if (!showHardNotImplemented) {
            alert("This feature has not been added yet :(");
        }
    }

    return (
        <div className={props.showSettings ? "settings" : "disappear"}>
            <div className="settingsbox">
                <p className="optiontitle">Settings</p>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="./assets/x.png" alt="x"></img>
                </button>
                <div className="settingoption">
                    <label className="switch">
                        <input type="checkbox" onClick={clickedDarkNotImplementedYet}></input>
                        <span className="slider"></span>
                    </label>
                    <p className="settingoptiontext">Dark Theme (coming soon)</p>
                </div>
                <div className="settingoption">
                    <label className="switch">
                        <input type="checkbox" onClick={clickedHardNotImplementedYet}></input>
                        <span className="slider"></span>
                    </label>
                    <p className="settingoptiontext">Hard Mode (coming soon)</p>
                </div>
            </div>
        </div>
    )
}

export default Settings;