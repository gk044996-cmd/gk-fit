import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExerciseVideoPlayer({ videoUrl, exerciseName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset states instantly when exercise video changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [videoUrl]);

  return (
    <div className="relative w-full aspect-video rounded-2xl border border-white/10 bg-[#0d0d14] overflow-hidden shadow-2xl group">
      
      {/* 1. Glassmorphism Loading Skeleton Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#09090e] z-20"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
            </div>
            <p className="text-xs font-mono tracking-widest text-slate-400 mt-4 uppercase">
              Loading Verified Module...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Network Block/Iframe Failure Fallback UI */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0e16] border border-red-500/20 p-6 text-center z-30">
          <span className="text-3xl mb-2">⚠️</span>
          <h4 className="text-sm font-bold text-slate-200">Embed Playback Blocked</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
            Your browser configuration or ad-blocker dropped the YouTube frame interface connections.
          </p>
          <a 
            href={videoUrl.replace("/embed/", "/watch?v=")} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white shadow-lg hover:brightness-110 transition-all"
          >
            Stream On YouTube ↗
          </a>
        </div>
      )}

      {/* 3. Fully Responsive Core Iframe Component */}
      <iframe
        key={videoUrl} // Enforces hardware unmount and remount on exercise swap
        width="100%"
        height="100%"
        src={`${videoUrl}?modestbranding=1&rel=0&autoplay=0&showinfo=0&iv_load_policy=3`}
        title={`${exerciseName} Tutorial Guide`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full transition-opacity duration-500 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
