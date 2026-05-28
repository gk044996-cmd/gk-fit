import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';

const Signup = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'Male',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: 'Get Fit',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Must be at least 6 characters';
    }
    if (formData.age && (isNaN(formData.age) || Number(formData.age) <= 0)) {
      tempErrors.age = 'Invalid age';
    }
    if (formData.height && (isNaN(formData.height) || Number(formData.height) <= 0)) {
      tempErrors.height = 'Invalid height';
    }
    if (formData.weight && (isNaN(formData.weight) || Number(formData.weight) <= 0)) {
      tempErrors.weight = 'Invalid weight';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        ...formData,
        age: formData.age ? Number(formData.age) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
      });
      showToast('Account created successfully! Welcome!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err.message);
      showToast(err.response?.data?.message || 'Failed to register account', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 w-full border border-white/[0.08] relative">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
        <p className="text-xs text-gray-500">Join GK FIT to start building consistency</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            disabled={loading}
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            disabled={loading}
            autoComplete="new-password"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="glass-input w-full bg-[#151522]"
              disabled={loading}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Input
            label="Age (Years)"
            id="age"
            type="number"
            placeholder="22"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            error={errors.age}
            disabled={loading}
          />

          <Input
            label="Height (cm)"
            id="height"
            type="number"
            placeholder="170"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            error={errors.height}
            disabled={loading}
          />

          <Input
            label="Weight (kg)"
            id="weight"
            type="number"
            placeholder="65"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            error={errors.weight}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Fitness Goal
          </label>
          <select
            value={formData.fitnessGoal}
            onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
            className="glass-input w-full bg-[#151522]"
            disabled={loading}
          >
            <option value="Get Fit">Get Fit / General Health</option>
            <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
            <option value="Fat Loss">Fat Loss / Conditioning</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <Button type="submit" isLoading={loading} className="w-full h-11 text-sm font-semibold mt-4">
          Register Account
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
          Sign In
        </Link>
      </div>
    </Card>
  );
};

export default Signup;
