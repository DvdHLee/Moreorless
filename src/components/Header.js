import React from "react";

import "./Header.css";
import Options from './Options';

const Header = props => {

    return (
        <div className="header">
            <img className="logo" src="/assets/moreorlesslogo.png" alt="moreorless logo"></img>
            <header className="title">More or Less</header>
            <button className="more">
                <img className="moreimage" src="/assets/options.png" alt="options"></img>
            </button>
            <Options></Options>
        </div>
    );

}

export default Header;