import React, { useState } from 'react';
import Card from '../Common/Card.jsx';
import Button from '../Common/Button.jsx';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const WaterTracker = ({ intake = 0, onLog }) => {
  const target = 3000; // 3L
  const percentage = Math.min((intake / target) * 100, 100);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (amount) => {
    setLoading(true);
    await onLog(amount);
    setLoading(false);
  };

  return (
    <Card className="flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">Water Balance</h3>
        <span className="text-xs text-gray-400 font-medium">Target: 3.0 L</span>
      </div>

      <div className="flex items-center gap-6 flex-1 py-2">
        {/* Animated liquid tank */}
        <div className="relative w-20 h-36 bg-[#161624] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col justify-end">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="w-full bg-gradient-to-t from-blue-600 to-blue-450 relative"
          >
            {/* Liquid surface wave ripple mock */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 animate-pulse" />
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-white select-none z-10">
            {percentage.toFixed(0)}%
          </div>
        </div>

        {/* Text and Actions */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl font-extrabold text-white">
              {((intake || 0) / 1000).toFixed(2)} <span className="text-sm font-normal text-gray-400">L / 3.0L</span>
            </span>
            <span className="text-xs text-gray-500 leading-relaxed">Stay hydrated to sustain muscle hydration and metabolism.</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleAdd(250)}
              className="py-2.5 px-3.5 text-xs flex items-center gap-1 flex-1"
            >
              <FiPlus /> 250ml
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleAdd(500)}
              className="py-2.5 px-3.5 text-xs flex items-center gap-1 flex-1"
            >
              <FiPlus /> 500ml
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterTracker;
