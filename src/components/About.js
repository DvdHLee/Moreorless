import React from 'react';

import './About.css';

const About = props => {
    return (
        <div className={props.showAbout ? "about" : "disappear"}>
            <div className="aboutbox">about</div>
        </div>
    )
}

export default About;