import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Common/Button.jsx';
import Card from '../components/Common/Card.jsx';
import { FiTrendingUp, FiCompass, FiActivity, FiClock, FiPercent, FiArrowRight } from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Workout Plans',
      desc: 'Expert-built routines for beginners, muscle gain, fat loss, and home exercise.',
      icon: FiCompass,
      color: 'text-purple-400 bg-purple-500/10 border-purple-550/20'
    },
    {
      title: 'Diet Guide',
      desc: 'Nutrition regimes tailored to goals, featuring specialized Indian healthy foods.',
      icon: FiActivity,
      color: 'text-orange-500 bg-orange-500/10 border-orange-550/20'
    },
    {
      title: 'BMI Calculator',
      desc: 'Calculate body mass index instantly and receive professional recommendations.',
      icon: FiPercent,
      color: 'text-blue-400 bg-blue-400/10 border-blue-450/20'
    },
    {
      title: 'Progress Tracking',
      desc: 'Log weight updates, water intake, workouts, and earn consistency badges.',
      icon: FiTrendingUp,
      color: 'text-emerald-450 bg-emerald-500/10 border-emerald-550/20'
    },
    {
      title: 'Workout Timer',
      desc: 'Active circular progress timer to track rest intervals and exercise duration.',
      icon: FiClock,
      color: 'text-pink-400 bg-pink-500/10 border-pink-550/20'
    }
  ];

  const categories = [
    { name: 'Beginner', desc: 'Routines to build strength foundations.', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500' },
    { name: 'Muscle Gain', desc: 'Hypertrophy schedules to build size.', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500' },
    { name: 'Fat Loss', desc: 'Conditioning circuits to burn fat.', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500' },
    { name: 'Home Workout', desc: 'No gear required bodyweight drills.', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500' }
  ];

  return (
    <div className="flex flex-col w-full relative z-10 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#060609_100%)] z-0" />
        <div className="max-w-5xl mx-auto text-center z-10 space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 text-xs font-semibold tracking-wider uppercase"
          >
            🔥 Premium Intelligent Fitness Guide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-4xl"
          >
            Transform Your Body With{' '}
            <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-purple-400 bg-clip-text text-transparent bg-[size:200%] animate-pulse">
              Smart Fitness Guidance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-base sm:text-xl max-w-2xl font-light leading-relaxed"
          >
            GK FIT is a sleek SaaS-level companion providing curated exercise plans, detailed nutrition charts, interactive tracking metrics, and an active workout timer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center max-w-md"
          >
            <Button onClick={() => navigate('/signup')} className="flex-1 text-sm font-semibold h-12 flex items-center justify-center gap-2">
              Start Journey <FiArrowRight />
            </Button>
            <Button onClick={() => navigate('/workouts')} variant="outline" className="flex-1 text-sm font-semibold h-12 flex items-center justify-center">
              Explore Workouts
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full relative">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">Built For Ultimate Progress</h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
            Everything you need to plan, execute, and analyze your lifestyle transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} hoverEffect className="flex flex-col gap-4 text-left">
                <div className={`p-3 rounded-xl border w-fit ${feat.color}`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. WORKOUT CATEGORIES PREVIEW */}
      <section className="py-20 px-6 bg-[#0b0b12]/40 w-full border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white tracking-tight">Structured Categories</h2>
              <p className="text-gray-400 text-sm max-w-md">
                Pre-loaded routines designed specifically to support your individual target outcomes.
              </p>
            </div>
            <Button onClick={() => navigate('/workouts')} variant="outline" className="text-xs h-10 px-4 flex items-center gap-1">
              View All Routines <FiArrowRight />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/workouts?category=${cat.name}`)}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/[0.06] hover:border-purple-500/40 transition-all duration-300"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-20 px-6 max-w-5xl mx-auto w-full text-center">
        <div className="mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">User Transformations</h2>
          <p className="text-gray-400 text-sm">Real stories from individuals who achieved their goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="flex flex-col gap-4 text-left">
            <p className="text-gray-300 italic text-sm leading-relaxed">
              "GK FIT completely changed my routine. The workouts are super easy to track on my phone, and the Indian healthy food segment made formatting my meals simple."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-sm">
                R
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Rahul Sharma</h4>
                <p className="text-xs text-gray-500">Lost 12kg in 4 months (Fat Loss Goal)</p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col gap-4 text-left">
            <p className="text-gray-300 italic text-sm leading-relaxed">
              "The interface is gorgeous and smooth. Having the workout timer integrated with the exercise instructions makes my weightlifting sessions highly efficient."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-sm">
                A
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Aishwarya Sen</h4>
                <p className="text-xs text-gray-500">Gained 4kg muscle mass (Muscle Gain Goal)</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto w-full mb-12">
        <Card className="bg-gradient-to-br from-[#121220]/80 to-[#1d1410]/40 border border-purple-500/20 p-10 sm:p-14 flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px]" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight relative z-10">
            Ready to Take Control of Your Fitness?
          </h2>
          <p className="text-gray-400 max-w-lg text-sm leading-relaxed relative z-10">
            Register your profile, compute your BMI targets, and begin logging workouts on GK FIT today.
          </p>
          <Button onClick={() => navigate('/signup')} className="px-8 h-12 text-sm font-bold relative z-10">
            Start Your Journey Free
          </Button>
        </Card>
      </section>

    </div>
  );
};

export default Landing;
