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

  const handleForwardClick = () => {
    setIsMovingForward(true);
  };

  const handleBackwardClick = () => {
    setIsMovingBackward(true);
  };

  const handleLeftwardClick = () => {
    setIsMovingLeftward(true);
  };

  const handleRightwardClick = () => {
    setIsMovingRightward(true);
  };

  const handleJumpClick = () => {
    setIsJumping(true);
  };

  const handleControlButtonRelease = () => {
    setIsMovingForward(false);
    setIsMovingBackward(false);
    setIsMovingLeftward(false);
    setIsMovingRightward(false);
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
    // Your game logic using the movement states
    // For example:
    if (isMovingForward) {
      // Move player forward
    } else if (isMovingBackward) {
      // Move player backward
    } else if (isMovingLeftward) {
      // Move player leftward
    } else if (isMovingRightward) {
      // Move player rightward
    }

    if (isJumping) {
      // Perform player jump
    }
  }, [
    isMovingForward,
    isMovingBackward,
    isMovingLeftward,
    isMovingRightward,
    isJumping,
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
            onClick={handleForwardClick}
            onMouseUp={handleControlButtonRelease}
            onMouseLeave={handleControlButtonRelease}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key ${isMovingLeftward ? 'active' : ''}`}
            onClick={handleLeftwardClick}
            onMouseUp={handleControlButtonRelease}
            onMouseLeave={handleControlButtonRelease}
          ></div>
          <div
            className={`key ${isMovingBackward ? 'active' : ''}`}
            onClick={handleBackwardClick}
            onMouseUp={handleControlButtonRelease}
            onMouseLeave={handleControlButtonRelease}
          ></div>
          <div
            className={`key ${isMovingRightward ? 'active' : ''}`}
            onClick={handleRightwardClick}
            onMouseUp={handleControlButtonRelease}
            onMouseLeave={handleControlButtonRelease}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key large ${isJumping ? 'active' : ''}`}
            onClick={handleJumpClick}
            onMouseUp={handleControlButtonRelease}
            onMouseLeave={handleControlButtonRelease}
          ></div>
        </div>
      </div>
    </div>
  );
}
