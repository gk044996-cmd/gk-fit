import React, { useState, useEffect } from 'react';
import * as progressService from '../services/progressService.js';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FiTrendingUp, FiAward, FiCalendar } from 'react-icons/fi';

const Progress = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [logging, setLogging] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [history, setHistory] = useState([]);
  
  const [logForm, setLogForm] = useState({
    weight: '',
    waterIntake: '',
    workoutDuration: '',
    caloriesBurned: '',
  });

  const fetchData = async () => {
    try {
      const stats = await progressService.getDashboardStats();
      setDashboardData(stats);

      const hist = await progressService.getProgressHistory();
      setHistory(hist);
      
      // Auto pre-fill today's logged weight if exists
      if (stats.todayStats && stats.todayStats.weight) {
        setLogForm((prev) => ({ ...prev, weight: stats.todayStats.weight }));
      }
    } catch (error) {
      console.error('Failed to load progress data:', error.message);
      showToast('Failed to load progress details', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogProgress = async (e) => {
    e.preventDefault();
    setLogging(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const payload = {
        date: todayStr,
      };
      if (logForm.weight) payload.weight = Number(logForm.weight);
      if (logForm.waterIntake) payload.waterIntake = Number(logForm.waterIntake);
      if (logForm.workoutDuration) payload.workoutDuration = Number(logForm.workoutDuration);
      if (logForm.caloriesBurned) payload.caloriesBurned = Number(logForm.caloriesBurned);

      await progressService.logProgress(payload);
      showToast('Daily stats logged successfully!');
      
      // Clear form inputs (except weight which stays pre-filled)
      setLogForm((prev) => ({
        ...prev,
        waterIntake: '',
        workoutDuration: '',
        caloriesBurned: '',
      }));

      // Reload
      await fetchData();
    } catch (error) {
      console.error('Error logging daily progress:', error.message);
      showToast('Failed to save metrics', 'error');
    } finally {
      setLogging(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const { achievements } = dashboardData;

  // Prepare Weight history chart data
  const weightChartData = history
    .filter((h) => h.weight)
    .map((h) => ({
      date: h.date.substring(5), // MM-DD
      Weight: h.weight,
    }));

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Progress Tracking</h2>
        <p className="text-sm text-gray-400">Log metrics and view long-term body adjustment charts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* Left: Log Form (1/3) */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 border border-white/[0.05]">
            <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3 mb-4">
              <FiCalendar className="text-purple-400 text-lg" />
              <h3 className="font-semibold text-white text-base">Log Today's Stats</h3>
            </div>

            <form onSubmit={handleLogProgress} className="flex flex-col gap-4">
              <Input
                label="Body Weight (kg)"
                type="number"
                step="0.1"
                placeholder="e.g. 70.5"
                value={logForm.weight}
                onChange={(e) => setLogForm({ ...logForm, weight: e.target.value })}
              />
              <Input
                label="Water Intake (ml)"
                type="number"
                placeholder="e.g. 500"
                value={logForm.waterIntake}
                onChange={(e) => setLogForm({ ...logForm, waterIntake: e.target.value })}
              />
              <Input
                label="Workout Duration (mins)"
                type="number"
                placeholder="e.g. 45"
                value={logForm.workoutDuration}
                onChange={(e) => setLogForm({ ...logForm, workoutDuration: e.target.value })}
              />
              <Input
                label="Calories Burned (kcal)"
                type="number"
                placeholder="e.g. 300"
                value={logForm.caloriesBurned}
                onChange={(e) => setLogForm({ ...logForm, caloriesBurned: e.target.value })}
              />

              <Button type="submit" isLoading={logging} className="w-full h-10 text-xs font-bold mt-2">
                Log Metrics
              </Button>
            </form>
          </Card>
        </div>

        {/* Right: Charts & Badges (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          {/* Weight trend LineChart */}
          <Card className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-purple-400 text-lg" />
                <h3 className="font-semibold text-white">Weight Adjustment Curve</h3>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Long-Term Log</span>
            </div>

            <div className="h-64 w-full mt-2">
              {weightChartData.length < 2 ? (
                <div className="h-full flex items-center justify-center text-xs text-gray-500 italic border border-dashed border-white/[0.05] rounded-xl">
                  Log your weight on multiple days to view your progression curve.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightChartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#12121f',
                        borderColor: 'rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        fontSize: 12,
                        color: '#fff',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Weight"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2, fill: '#0c0c14' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Achievements Grid */}
          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3">
              <FiAward className="text-orange-400 text-lg" />
              <h3 className="font-semibold text-white">Earned Badges</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements?.map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-white/[0.05] bg-white/[0.01]"
                >
                  <div className="text-2xl w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center select-none">
                    {ach.icon}
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <h4 className="text-sm font-semibold text-white">{ach.title}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
