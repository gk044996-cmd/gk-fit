import React, { useState, useEffect, useRef } from 'react';
import Button from '../Common/Button.jsx';
import { FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';

const WorkoutTimer = ({ durationSeconds = 60, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Sync state if duration changes
  useEffect(() => {
    setTimeLeft(durationSeconds);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [durationSeconds]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, onComplete]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setTimeLeft(durationSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Progress circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / durationSeconds;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center gap-5 p-6 rounded-2xl bg-[#141420]/60 border border-white/[0.05] w-full max-w-xs mx-auto">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Exercise Timer</span>

      {/* Circular clock face */}
      <div className="relative flex items-center justify-center w-36 h-36">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-white/[0.04]"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-purple-500"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center select-none">
          <span className="text-3xl font-bold text-white font-mono tracking-tight">{formattedTime}</span>
          <span className="text-[10px] text-gray-400 font-medium">remaining</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 w-full">
        <Button variant="outline" onClick={reset} className="flex-1 py-2 px-3 text-xs gap-1.5">
          <FiRotateCcw /> Reset
        </Button>
        
        <Button
          variant={isActive ? 'outline' : 'primary'}
          onClick={toggle}
          className="flex-1 py-2 px-3 text-xs gap-1.5"
        >
          {isActive ? (
            <>
              <FiPause /> Pause
            </>
          ) : (
            <>
              <FiPlay /> Start
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WorkoutTimer;
