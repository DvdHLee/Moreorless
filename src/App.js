import './App.css';

import { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Header from './components/Header';
import Options from './components/Options';
import Content from './components/Content';

function App() {
  const [showOptions, setShowOptions] = useState(false);
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
  }

  return (
    <div className="App">
      <Header onClickedMore={onClickedMore}></Header>
      <div className="optionscontainer">
        {transition((style, item) =>
          item ? <animated.div style={style}>
            <Options onClickedExit={onClickedExit}></Options>
          </animated.div> : ''
        )}
      </div>
      <Content></Content>
    </div>
  );
}

export default App;
