import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';
import { FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const BmiCalculator = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    height: user?.height || '',
    weight: user?.weight || '',
    age: user?.age || '',
    gender: user?.gender || 'Male',
  });

  const [result, setResult] = useState(null);

  const calculateBmi = (e) => {
    e.preventDefault();
    const h = Number(formData.height) / 100; // to meters
    const w = Number(formData.weight);

    if (!h || !w || h <= 0 || w <= 0) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));

    let category = '';
    let color = '';
    let recommendation = '';
    let percent = 0; // for indicator position on the bar (0 to 100%)

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      recommendation = 'Focus on nutrient-dense foods, lean protein sources, and resistance training to build muscle mass safely.';
      percent = Math.min((bmi / 18.5) * 25, 25);
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      color = 'text-green-400 bg-green-500/10 border-green-500/20';
      recommendation = 'Great job! Maintain your current balanced lifestyle, hydration, and regular workouts.';
      percent = 25 + ((bmi - 18.5) / 6.5) * 25;
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-400 bg-orange-555/10 border-orange-500/20';
      recommendation = 'Incorporate structured cardio routines alongside a moderate calorie deficit and healthy diet to manage body weight.';
      percent = 50 + ((bmi - 25) / 5) * 25;
    } else {
      category = 'Obese';
      color = 'text-red-400 bg-red-500/10 border-red-500/20';
      recommendation = 'We recommend prioritizing high-intensity interval training, clean nutrition tracking, and consulting a health expert.';
      percent = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
    }

    setResult({ bmi, category, color, recommendation, percent });
  };

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">BMI Calculator</h2>
        <p className="text-sm text-gray-400">Calculate your Body Mass Index and check target weight metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        {/* Form panel */}
        <Card className="p-6 border border-white/[0.05]">
          <form onSubmit={calculateBmi} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Height (cm)"
                type="number"
                placeholder="e.g. 170"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                required
              />
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="e.g. 65"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Age (Years)"
                type="number"
                placeholder="e.g. 22"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="glass-input w-full bg-[#151522]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-sm font-semibold mt-2">
              Calculate BMI
            </Button>
          </form>
        </Card>

        {/* Results Panel */}
        {result ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card className="p-6 border border-white/[0.06] flex flex-col gap-6 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">Analysis Result</h3>
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${result.color}`}>
                  {result.category}
                </span>
              </div>

              <div className="flex items-center gap-6 py-2">
                {/* Visual circle score */}
                <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex flex-col items-center justify-center bg-purple-500/5 flex-shrink-0 select-none">
                  <span className="text-3xl font-extrabold text-white leading-none">{result.bmi}</span>
                  <span className="text-[10px] text-gray-400 uppercase mt-0.5">Score</span>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-bold text-white leading-tight">Body Mass Index (BMI)</span>
                  <p className="text-xs text-gray-450 leading-relaxed">
                    A key health indicator mapping weight relative to height.
                  </p>
                </div>
              </div>

              {/* Slider scale status bar */}
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-[9px] font-semibold text-gray-500 uppercase px-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="relative h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-red-500 w-full overflow-visible">
                  <motion.div
                    animate={{ left: `${result.percent}%` }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute -top-1 w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md transform -translate-x-1/2"
                  />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-gray-500 px-1">
                  <span>&lt; 18.5</span>
                  <span>18.5 - 24.9</span>
                  <span>25.0 - 29.9</span>
                  <span>30.0+</span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#151522]/60 border border-white/[0.04] p-4 rounded-xl mt-2 flex flex-col gap-1 text-left">
                <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <FiActivity className="text-purple-400" /> Recommendations
                </span>
                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                  {result.recommendation}
                </p>
              </div>
            </Card>
          </motion.div>
        ) : (
          <Card className="h-full flex items-center justify-center p-12 text-center text-gray-500 border border-white/[0.04]">
            Enter your metrics and press Calculate to view your BMI assessment.
          </Card>
        )}
      </div>
    </div>
  );
};

export default BmiCalculator;
