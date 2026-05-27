import React from 'react';
import Card from '../Common/Card.jsx';

const WorkoutStreak = ({ streak = 1, weeklyLogs = [] }) => {
  return (
    <Card className="flex flex-col gap-5 h-full justify-between">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">Consistency Streak</h3>
        <span className="text-xs text-orange-500 font-semibold bg-orange-550/10 px-2.5 py-1 rounded-full flex items-center gap-1 border border-orange-500/20">
          🔥 Active
        </span>
      </div>

      <div className="flex items-center gap-4 py-1">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white text-3xl shadow-lg shadow-orange-500/20 select-none">
          {streak}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-semibold text-white">Daily Consistency</span>
          <p className="text-xs text-gray-500 leading-normal">
            {streak > 1 ? `You logged progress ${streak} days in a row! Keep crushing it!` : 'Log your workouts or water daily to build a streak.'}
          </p>
        </div>
      </div>

      {/* Week Grid representation */}
      <div className="grid grid-cols-7 gap-2 pt-2 border-t border-white/[0.04] text-center">
        {weeklyLogs.map((day) => {
          // If duration > 0 or water > 0 or calories > 0, consider it logged
          const active = day.duration > 0 || day.water > 0 || day.calories > 0;
          return (
            <div key={day.date} className="flex flex-col gap-1.5 items-center">
              <span className="text-[10px] font-semibold text-gray-500 uppercase">{day.day}</span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-br from-purple-500 to-orange-500 text-white shadow-md shadow-purple-500/10'
                    : 'bg-[#141420] text-gray-500 border border-white/[0.04]'
                }`}
              >
                {active ? '✓' : '•'}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WorkoutStreak;
