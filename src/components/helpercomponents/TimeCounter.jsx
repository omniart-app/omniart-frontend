import React from 'react'
import { useTimer } from 'react-timer-hook';

const TimeCounter = ({ expiryTimestamp }) => {
    
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    function leftPadText(text) {
        const paddedText = text.toString().padStart(2, '0');
        return paddedText;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='row'>
                <div className="col-3 counter">{leftPadText(days)}</div>
                <div className="col-3 counter">{leftPadText(hours)}</div>
                <div className="col-3 counter">{leftPadText(minutes)}</div>
                <div className="col-3 counter">{leftPadText(seconds)}</div>
            </div>
            <div className='row'>
                <div className="col-3">days</div>
                <div className="col-3">hours</div>
                <div className="col-3">mins</div>
                <div className="col-3">secs</div>
            </div>
        </div>
    );
}

export default TimeCounter