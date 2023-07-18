import { useState, useEffect, useRef } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame.js';
import { addEffect } from '@react-three/fiber';

export default function Interface() {
  const time = useRef();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const [isMovingForward, setIsMovingForward] = useState(false);
  const [isMovingBackward, setIsMovingBackward] = useState(false);
  const [isMovingLeftward, setIsMovingLeftward] = useState(false);
  const [isMovingRightward, setIsMovingRightward] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const handleForwardButtonPress = () => {
    setIsMovingForward(true);
  };

  const handleForwardButtonRelease = () => {
    setIsMovingForward(false);
  };

  const handleBackwardButtonPress = () => {
    setIsMovingBackward(true);
  };

  const handleBackwardButtonRelease = () => {
    setIsMovingBackward(false);
  };

  const handleLeftwardButtonPress = () => {
    setIsMovingLeftward(true);
  };

  const handleLeftwardButtonRelease = () => {
    setIsMovingLeftward(false);
  };

  const handleRightwardButtonPress = () => {
    setIsMovingRightward(true);
  };

  const handleRightwardButtonRelease = () => {
    setIsMovingRightward(false);
  };

  const handleJumpButtonPress = () => {
    setIsJumping(true);
  };

  const handleJumpButtonRelease = () => {
    setIsJumping(false);
  };

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime;
      else if (state.phase === 'ended') elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp') setIsMovingForward(true);
      else if (event.key === 'ArrowDown') setIsMovingBackward(true);
      else if (event.key === 'ArrowLeft') setIsMovingLeftward(true);
      else if (event.key === 'ArrowRight') setIsMovingRightward(true);
      else if (event.key === ' ') setIsJumping(true);
    };

    const handleKeyRelease = (event) => {
      if (event.key === 'ArrowUp') setIsMovingForward(false);
      else if (event.key === 'ArrowDown') setIsMovingBackward(false);
      else if (event.key === 'ArrowLeft') setIsMovingLeftward(false);
      else if (event.key === 'ArrowRight') setIsMovingRightward(false);
      else if (event.key === ' ') setIsJumping(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, []);

  useEffect(() => {
    // Your game logic using the movement states
    // For example:
    if (isMovingForward || forward) {
      // Move player forward
    } else if (isMovingBackward || backward) {
      // Move player backward
    } else if (isMovingLeftward || leftward) {
      // Move player leftward
    } else if (isMovingRightward || rightward) {
      // Move player rightward
    }

    if (isJumping || jump) {
      // Perform player jump
    }
  }, [
    isMovingForward,
    isMovingBackward,
    isMovingLeftward,
    isMovingRightward,
    isJumping,
    forward,
    backward,
    leftward,
    rightward,
    jump,
  ]);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart */}
      {phase === 'ended' && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div
            className={`key ${isMovingForward ? 'active' : ''}`}
            onMouseDown={handleForwardButtonPress}
            onMouseUp={handleForwardButtonRelease}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key ${isMovingLeftward ? 'active' : ''}`}
            onMouseDown={handleLeftwardButtonPress}
            onMouseUp={handleLeftwardButtonRelease}
          ></div>
          <div
            className={`key ${isMovingBackward ? 'active' : ''}`}
            onMouseDown={handleBackwardButtonPress}
            onMouseUp={handleBackwardButtonRelease}
          ></div>
          <div
            className={`key ${isMovingRightward ? 'active' : ''}`}
            onMouseDown={handleRightwardButtonPress}
            onMouseUp={handleRightwardButtonRelease}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key large ${isJumping ? 'active' : ''}`}
            onMouseDown={handleJumpButtonPress}
            onMouseUp={handleJumpButtonRelease}
          ></div>
        </div>
      </div>
    </div>
  );
}
