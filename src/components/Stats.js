import React from 'react';

import './Stats.css';

const Stats = props => {
    return (
        <div className={props.showStats ? "stats" : "disappear"}>
            <div className="statsbox">stats</div>
        </div>
    )
}

export default Stats;