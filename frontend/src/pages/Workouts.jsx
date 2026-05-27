import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as workoutService from '../services/workoutService.js';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import { FiSearch, FiClock, FiZap, FiChevronRight } from 'react-icons/fi';

const Workouts = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial category from search query parameter
  const categoryParam = searchParams.get('category') || 'All';

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const categories = ['All', 'Beginner', 'Muscle Gain', 'Fat Loss', 'Home Workout'];

  const fetchWorkouts = async (cat, searchStr) => {
    setLoading(true);
    try {
      const data = await workoutService.getWorkouts(cat, searchStr);
      setWorkouts(data);
    } catch (error) {
      console.error('Failed to fetch workouts:', error.message);
      showToast('Failed to load workouts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts(activeCategory, search);
  }, [activeCategory, search]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Workout Plans</h2>
        <p className="text-sm text-gray-400">Choose a program tailored to your fitness level and goal.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Input
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <FiSearch className="absolute right-3.5 text-gray-400 text-lg pointer-events-none" />
        </div>

        {/* Categories list */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide border transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-650/20'
                  : 'bg-[#0f0f16]/60 border-white/[0.06] text-gray-300 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid container */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : workouts.length === 0 ? (
        <Card className="p-12 text-center text-gray-400 border border-white/[0.04] mt-4">
          No workouts found matching your criteria. Try adjusting your filters.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => {
            const diffColor =
              workout.difficulty === 'Easy'
                ? 'text-emerald-450 bg-emerald-500/10 border-emerald-550/20'
                : workout.difficulty === 'Hard'
                ? 'text-red-400 bg-red-500/10 border-red-550/20'
                : 'text-purple-400 bg-purple-500/10 border-purple-550/20';
            
            return (
              <Card key={workout._id} hoverEffect className="flex flex-col h-[400px] overflow-hidden p-0 border border-white/[0.06]">
                {/* Banner image */}
                <div className="h-44 w-full relative overflow-hidden">
                  <img
                    src={workout.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600'}
                    alt={workout.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] to-transparent" />
                  <span className={`absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${diffColor}`}>
                    {workout.difficulty}
                  </span>
                </div>

                {/* Info details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-purple-400 leading-tight">
                      {workout.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {workout.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Stats strip */}
                    <div className="flex gap-4 border-t border-white/[0.04] pt-3 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <FiClock /> {workout.duration} mins
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiZap className="text-orange-500" /> {workout.caloriesBurned} kcal
                      </span>
                    </div>

                    <Button
                      onClick={() => navigate(`/workouts/${workout._id}`)}
                      className="py-2.5 text-xs font-bold w-full gap-1"
                    >
                      Start Workout <FiChevronRight />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Workouts;
