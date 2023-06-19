import React from 'react';

import './About.css';

const About = props => {
    const clickedExit = () => {
        props.onClickedExit();
    }

    return (
        <div className={props.showAbout ? "about" : "disappear"}>
            <div className="aboutbox">
                <p className="optiontitle">About</p>
                <p className="aboutcontent">Hi, Im David, the creator of More or Less! I made More or Less to scratch my trivia itch and have some creative fun.
                    I hope you enjoy playing it as much as I did making it. </p>
                <p className="aboutcontent">To see my other projects check out my portfolio. I make other fun games and websites.
                    To see the source code for this project, the Github link is below. Finally,
                    if you would like to connect with me, check out my LinkedIn!
                </p>
                <div className="aboutlinks">
                    <a className="aboutlink" href="https://dvdhlee.github.io/Portfolio/" title="" target="_blank" rel="noreferrer noopener">
                        <img className="aboutlinkimg" src="/assets/bag.png" alt="portfolio icon"></img>
                    </a>
                    <a className="aboutlink" href="https://github.com/DvdHLee/Moreorless" title="" target="_blank" rel="noreferrer noopener">
                        <img className="aboutlinkimg" src="/assets/github.png" alt="linkedin icon"></img>
                    </a>
                    <a className="aboutlink" href="https://www.linkedin.com/in/dvdhyelee/" title="" target="_blank" rel="noreferrer noopener">
                        <img className="aboutlinkimg" src="/assets/linkedin.png" alt="linkedin icon"></img>
                    </a>
                </div>
                <button className="optionsexit" onClick={clickedExit}>
                    <img className="optionsexitimg" src="/assets/x.png" alt="x"></img>
                </button>
            </div>
        </div>
    )
}

export default About;