import './App.css';

import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Header from './components/Header';
import Options from './components/Options';
import Content from './components/Content';
import Info from './components/Info';
import Stats from './components/Stats';
import About from './components/About';
import Settings from './components/Settings';

function App() {
  const [showOptions, setShowOptions] = useState(localStorage.getItem("score") === null);
  const [showInfo, setShowInfo] = useState(localStorage.getItem("score") === null);
  const [showStats, setShowStats] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const transition = useTransition(showOptions, {
    config: { mass: 0.1, friction: 7 },
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });

  const onClickedMore = () => {
    setShowOptions(true);
  }

  const onClickedExit = () => {
    setShowOptions(false);
    setShowInfo(false);
    setShowStats(false);
    setShowAbout(false);
    setShowSettings(false);
  }

  const onClickedInfo = () => {
    if (showInfo) {
      setShowInfo(false);
    } else {
      setShowInfo(true);
    }
    setShowStats(false);
    setShowAbout(false);
    setShowSettings(false);
  }

  const onClickedStats = () => {
    if (showStats) {
      setShowStats(false);
    } else {
      setShowStats(true);
    }
    setShowInfo(false);
    setShowAbout(false);
    setShowSettings(false);
  }

  const onClickedAbout = () => {
    if (showAbout) {
      setShowAbout(false);
    } else {
      setShowAbout(true);
    }
    setShowInfo(false);
    setShowStats(false);
    setShowSettings(false);
  }

  const onClickedSettings = () => {
    if (showSettings) {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
    setShowInfo(false);
    setShowStats(false);
    setShowAbout(false);
  }

  console.log(localStorage.getItem("finalscores"));

  return (
    <div className="App">
      <Header onClickedMore={onClickedMore}></Header>
      <div className="optionscontainer">
        {transition((style, item) =>
          item ? <animated.div style={style}>
            <Options onClickedExit={onClickedExit} onClickedInfo={onClickedInfo} onClickedStats={onClickedStats} onClickedAbout={onClickedAbout} onClickedSettings={onClickedSettings}></Options>
          </animated.div> : ''
        )}
      </div>
      <Content></Content>
      <Info showInfo={showInfo} onClickedExit={onClickedExit}></Info>
      <Stats showStats={showStats} onClickedExit={onClickedExit}></Stats>
      <About showAbout={showAbout} onClickedExit={onClickedExit}></About>
      <Settings showSettings={showSettings} onClickedExit={onClickedExit}></Settings>
    </div>
  );
}

export default App;
