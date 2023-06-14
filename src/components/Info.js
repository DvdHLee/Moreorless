import React from 'react';

import './Info.css';

const Info = props => {
    return (
        <div className={props.showInfo ? "info" : "disappear"}>
            <div className="infobox">info</div>
        </div>
    )
}

export default Info;