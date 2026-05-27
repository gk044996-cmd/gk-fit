import React from 'react';
import Card from '../Common/Card.jsx';
import { FiZap, FiDroplet, FiClock, FiTrendingUp } from 'react-icons/fi';

const StatsGrid = ({ stats }) => {
  const cards = [
    {
      title: 'Calories Burned',
      value: `${stats?.caloriesBurned || 0} kcal`,
      sub: "Today's active logs",
      icon: FiZap,
      iconColor: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    },
    {
      title: 'Water Intake',
      value: `${((stats?.waterIntake || 0) / 1000).toFixed(2)} L`,
      sub: 'Target: 3.00 L',
      icon: FiDroplet,
      iconColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    },
    {
      title: 'Workout Duration',
      value: `${stats?.workoutDuration || 0} mins`,
      sub: 'Active tracking time',
      icon: FiClock,
      iconColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    },
    {
      title: 'Current Weight',
      value: `${stats?.weight || 0} kg`,
      sub: 'Synced with profile',
      icon: FiTrendingUp,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} hoverEffect className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{card.title}</span>
                <span className="text-2xl font-bold text-white tracking-tight">{card.value}</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${card.iconColor}`}>
                <Icon className="text-xl" />
              </div>
            </div>
            <span className="text-xs text-gray-400">{card.sub}</span>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsGrid;
