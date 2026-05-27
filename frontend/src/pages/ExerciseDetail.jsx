import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as workoutService from '../services/workoutService.js';
import * as progressService from '../services/progressService.js';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import WorkoutTimer from '../components/Workouts/WorkoutTimer.jsx';
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [loggingProgress, setLoggingProgress] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await workoutService.getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error('Failed to load workout details:', error.message);
        showToast('Failed to load workout details', 'error');
        navigate('/workouts');
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!workout) return null;

  const exercises = workout.exercises || [];
  const currentExercise = exercises[selectedIdx];

  const handleToggleComplete = (idx) => {
    if (completedExercises.includes(idx)) {
      setCompletedExercises(completedExercises.filter((i) => i !== idx));
    } else {
      setCompletedExercises([...completedExercises, idx]);
    }
  };

  const handleFinishWorkout = async () => {
    setLoggingProgress(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      await progressService.logProgress({
        date: todayStr,
        workoutDuration: workout.duration,
        caloriesBurned: workout.caloriesBurned,
        workoutCompleted: workout.title,
        isAdditive: true,
      });
      showToast(`Congratulations! Logged workout: ${workout.title}`);
      setWorkoutFinished(true);
    } catch (error) {
      console.error('Error saving workout progress:', error.message);
      showToast('Failed to save progress to server', 'error');
    } finally {
      setLoggingProgress(false);
    }
  };

  if (workoutFinished) {
    return (
      <div className="max-w-md mx-auto py-12 flex flex-col gap-6 text-center select-none">
        <Card className="p-8 border border-purple-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Workout Completed!</h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Awesome job! You finished <span className="text-white font-semibold">{workout.title}</span>.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8 bg-[#12121e]/60 p-4 rounded-xl border border-white/[0.04]">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase">Calories Burned</span>
              <span className="text-xl font-bold text-orange-400 mt-1">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex flex-col border-l border-white/[0.04]">
              <span className="text-xs text-gray-500 font-semibold uppercase">Total Time</span>
              <span className="text-xl font-bold text-purple-400 mt-1">{workout.duration} mins</span>
            </div>
          </div>

          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full h-11 text-sm font-semibold mt-8"
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      {/* Back navigation */}
      <div>
        <button
          onClick={() => navigate('/workouts')}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white uppercase tracking-wider transition-colors"
        >
          <FiArrowLeft className="text-sm" /> Back to Workouts
        </button>
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{workout.title}</h2>
          <p className="text-sm text-gray-400 mt-1">{workout.description}</p>
        </div>
        <Button
          onClick={handleFinishWorkout}
          isLoading={loggingProgress}
          className="py-2.5 px-5 text-xs font-semibold select-none flex items-center gap-1.5"
        >
          Finish Workout
        </Button>
      </div>

      {/* Main Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Exercises List (1/3 width) */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest pl-1">
            Exercises ({exercises.length})
          </span>
          <div className="flex flex-col gap-2.5">
            {exercises.map((ex, idx) => {
              const isSelected = idx === selectedIdx;
              const isCompleted = completedExercises.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#151522]/80 border-purple-500/30'
                      : 'bg-[#0f0f16]/60 border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-sm font-semibold text-white tracking-tight">{ex.name}</span>
                    <span className="text-xs text-gray-400 font-medium">
                      {ex.sets} sets • {ex.reps}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(idx);
                    }}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20'
                        : 'border-white/[0.12] text-transparent hover:border-purple-500/40 hover:bg-purple-500/5'
                    }`}
                  >
                    ✓
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Exercise detail sheet (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col md:flex-row gap-6 items-start w-full">
          <div className="flex-1 flex flex-col gap-6 w-full">
            <Card className="flex flex-col gap-5 text-left border border-white/[0.06] relative">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">{currentExercise?.name}</h3>
                  <span className="text-xs text-gray-500 font-medium">
                    Target Muscle: <span className="text-purple-400 font-semibold">{currentExercise?.targetMuscle}</span>
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-semibold bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.05]">
                  {currentExercise?.sets} Sets x {currentExercise?.reps}
                </span>
              </div>

              {/* Instructions steps */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest border-b border-white/[0.03] pb-1 block">
                  Instructions
                </span>
                <ol className="space-y-2 text-sm text-gray-300 list-decimal pl-4 leading-relaxed">
                  {currentExercise?.instructions.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Common mistakes */}
              {currentExercise?.commonMistakes && currentExercise.commonMistakes.length > 0 && (
                <div className="space-y-2 bg-red-500/[0.03] border border-red-500/10 p-4 rounded-xl">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiAlertTriangle /> Common Mistakes
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-450 list-disc pl-4 leading-relaxed">
                    {currentExercise.commonMistakes.map((mistake, mIdx) => (
                      <li key={mIdx}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {currentExercise?.benefits && currentExercise.benefits.length > 0 && (
                <div className="space-y-2 bg-purple-500/[0.02] border border-purple-500/10 p-4 rounded-xl">
                  <span className="text-xs font-semibold text-purple-450 uppercase tracking-wider flex items-center gap-1.5">
                    <FiCheckCircle className="text-purple-400" /> Benefits
                  </span>
                  <ul className="space-y-1 text-xs text-gray-400 list-disc pl-4 leading-relaxed">
                    {currentExercise.benefits.map((benefit, bIdx) => (
                      <li key={bIdx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>

          {/* Floating timer column */}
          <div className="w-full md:w-auto flex-shrink-0">
            <WorkoutTimer
              durationSeconds={currentExercise?.durationSeconds || 60}
              onComplete={() => showToast(`Set complete for ${currentExercise?.name}!`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
