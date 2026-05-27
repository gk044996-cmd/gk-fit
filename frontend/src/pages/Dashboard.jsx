import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as progressService from '../services/progressService.js';
import * as workoutService from '../services/workoutService.js';
import * as nutritionService from '../services/nutritionService.js';
import StatsGrid from '../components/Dashboard/StatsGrid.jsx';
import ActivityChart from '../components/Dashboard/ActivityChart.jsx';
import WaterTracker from '../components/Dashboard/WaterTracker.jsx';
import WorkoutStreak from '../components/Dashboard/WorkoutStreak.jsx';
import Card from '../components/Common/Card.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [recommendedWorkout, setRecommendedWorkout] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Targets calculation helper
  const getTargets = (goal) => {
    switch (goal) {
      case 'Fat Loss':
        return { calories: 1700, protein: 150, carbs: 160, fats: 50 };
      case 'Muscle Gain':
        return { calories: 2700, protein: 170, carbs: 340, fats: 80 };
      case 'Get Fit':
      case 'Maintenance':
      default:
        return { calories: 2000, protein: 130, carbs: 230, fats: 60 };
    }
  };

  const getNutritionTotals = (intakeLog) => {
    const sums = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    if (!intakeLog || !intakeLog.meals) return sums;

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
    mealTypes.forEach((meal) => {
      const items = intakeLog.meals[meal] || [];
      items.forEach((item) => {
        sums.calories += item.calories || 0;
        sums.protein += item.protein || 0;
        sums.carbs += item.carbs || 0;
        sums.fats += item.fats || 0;
      });
    });

    return {
      calories: Math.round(sums.calories),
      protein: Math.round(sums.protein),
      carbs: Math.round(sums.carbs),
      fats: Math.round(sums.fats)
    };
  };

  const getLocalTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchDashboardData = async () => {
    try {
      const stats = await progressService.getDashboardStats();
      setDashboardData(stats);

      // Fetch recommended workout based on fitness goal
      let workoutCategory = 'Beginner';
      if (user.fitnessGoal === 'Muscle Gain') workoutCategory = 'Muscle Gain';
      if (user.fitnessGoal === 'Fat Loss') workoutCategory = 'Fat Loss';
      
      const workouts = await workoutService.getWorkouts(workoutCategory);
      if (workouts && workouts.length > 0) {
        setRecommendedWorkout(workouts[0]);
      }

      // Fetch today's nutrition log
      const todayStr = getLocalTodayDateString();
      const nutrition = await nutritionService.getDailyIntake(todayStr);
      setDietPlan(nutrition);

    } catch (error) {
      console.error('Failed to load dashboard data:', error.message);
      showToast('Could not fetch analytics updates', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user.fitnessGoal]);

  const handleLogWater = async (amount) => {
    try {
      const todayStr = getLocalTodayDateString();
      await progressService.logProgress({
        date: todayStr,
        waterIntake: amount,
        isAdditive: true
      });
      showToast(`Added ${amount}ml water!`);
      // Reload stats
      const stats = await progressService.getDashboardStats();
      setDashboardData(stats);
    } catch (error) {
      console.error('Error logging water:', error.message);
      showToast('Failed to log water', 'error');
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const { todayStats, weeklyData, achievements, quote } = dashboardData;
  const targets = getTargets(user?.fitnessGoal);
  const totals = getNutritionTotals(dietPlan);

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Welcome header */}
      <div className="flex flex-col gap-1 text-left">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome back, {user.name}!
        </h2>
        <p className="text-sm text-gray-400">
          Here is your fitness dashboard. You are on track to meet your <span className="text-purple-400 font-semibold">{user.fitnessGoal}</span> target.
        </p>
      </div>

      {/* Stats Cards Row */}
      <StatsGrid stats={todayStats} />

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Chart & Streaks (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ActivityChart data={weeklyData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WorkoutStreak streak={todayStats.streak} weeklyLogs={weeklyData} />
            
            {/* Motivational Quote & Badges summary */}
            <Card className="flex flex-col justify-between gap-4">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-purple-400 text-lg" />
                <h3 className="font-semibold text-white">Daily Inspiration</h3>
              </div>
              <p className="text-sm text-gray-350 italic leading-relaxed py-2">
                "{quote}"
              </p>
              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Achievements Unlocked</span>
                <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                  {achievements?.length || 0} badges
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Water, Workout, Diet Previews (1/3 width) */}
        <div className="flex flex-col gap-6">
          {/* Water widget */}
          <WaterTracker intake={todayStats.waterIntake} onLog={handleLogWater} />

          {/* Recommended Workout Card */}
          {recommendedWorkout && (
            <Card className="flex flex-col gap-4 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  Today's Workout
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {recommendedWorkout.duration} mins
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">{recommendedWorkout.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{recommendedWorkout.description}</p>
              </div>
              <Button
                onClick={() => navigate(`/workouts/${recommendedWorkout._id}`)}
                className="py-2 text-xs font-bold w-full mt-2"
              >
                Start Workout <FiArrowRight className="ml-1" />
              </Button>
            </Card>
          )}

          {/* Diet Tracker Card */}
          {dietPlan && (
            <Card className="flex flex-col gap-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                  Today's Calories
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Target: {targets.calories} kcal
                </span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white">{totals.calories} kcal logged</span>
                    <span className="text-gray-400">{Math.max(0, targets.calories - totals.calories)} remaining</span>
                  </div>
                  <div className="w-full bg-white/[0.04] h-2 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(100, (totals.calories / targets.calories) * 100)}%` }}
                      className="bg-orange-500 h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center bg-[#151522]/50 p-2.5 rounded-xl border border-white/[0.04] text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Protein</span>
                    <span className="text-white font-bold">{totals.protein}g / {targets.protein}g</span>
                  </div>
                  <div className="flex flex-col border-x border-white/[0.04]">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Carbs</span>
                    <span className="text-white font-bold">{totals.carbs}g / {targets.carbs}g</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Fats</span>
                    <span className="text-white font-bold">{totals.fats}g / {targets.fats}g</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/diet')}
                className="py-2 text-xs font-bold w-full"
              >
                Log Today's Meals
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
