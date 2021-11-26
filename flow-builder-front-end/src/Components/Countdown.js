import React from 'react';
import Countdown from 'react-countdown';
import Alarm from '../static/Alarm.m4a'


export default function Timer(props) {
    const {
        handleNext,
        timerSound,
        setTimer,
        timePerSequence,
        combos,
        activeStep
    } = props
    // Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed && activeStep < combos.length - 1) {
    // Render a completed state
    setTimer(false)

    handleNext()
    return <Completionist />;
  } 
  else if(completed && activeStep >= combos.length-1) {
    setTimer(false)
    timerSound.play()
    setTimeout(()=> timerSound.pause(),10000)
    return <Completionist />;
  }
  else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};
    return (
        <Countdown
            date={Date.now() + timePerSequence*1000}
            renderer={renderer}
        />
    )
}