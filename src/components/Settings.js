import React from 'react';

import './Settings.css';

const Settings = props => {
    return (
        <div className={props.showSettings ? "settings" : "disappear"}>
            <div className="settingsbox">settings</div>
        </div>
    )
}

export default Settings;