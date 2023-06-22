import React from "react";

import "./Header.css";

const Header = props => {
    const clickedMore = () => {
        props.onClickedMore();
    }

    return (
        <div className="header">
            <img className="logo" src="./assets/moreorlesslogo.png" alt="moreorless logo"></img>
            <header className="title">More or Less</header>
            <button className="more" onClick={clickedMore}>
                <img className="moreimage" src="./assets/options.png" alt="options"></img>
            </button>
        </div>
    );

}

export default Header;