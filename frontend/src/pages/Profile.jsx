import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';
import { FiUser, FiActivity } from 'react-icons/fi';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: user?.gender || 'Male',
    age: user?.age || '',
    height: user?.height || '',
    weight: user?.weight || '',
    fitnessGoal: user?.fitnessGoal || 'Get Fit',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (formData.password && formData.password.length < 6) {
      tempErrors.password = 'Must be at least 6 characters';
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
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

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        gender: formData.gender,
        fitnessGoal: formData.fitnessGoal,
        age: formData.age ? Number(formData.age) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      await updateProfile(payload);
      showToast('Profile updated successfully!');
      
      // Clear password fields
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  // BMI score helper
  const heightInMeters = (user?.height || 170) / 100;
  const bmi = parseFloat(((user?.weight || 70) / (heightInMeters * heightInMeters)).toFixed(1));

  return (
    <div className="flex flex-col gap-6 pb-12 w-full text-left">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Profile Settings</h2>
        <p className="text-sm text-gray-400">Update your metrics to refine your BMI targets and dashboards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* Left column: Profile overview card (1/3) */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 text-center border border-white/[0.05] relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            
            {/* User avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-3xl shadow-lg shadow-purple-500/20 mb-4 select-none">
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">{user?.name}</h3>
            <span className="text-xs text-gray-500 mt-0.5">{user?.email}</span>

            {/* Micro stats table */}
            <div className="grid grid-cols-3 gap-2 w-full mt-8 bg-[#12121e]/60 p-3 rounded-xl border border-white/[0.04]">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Height</span>
                <span className="text-sm font-bold text-white mt-0.5">{user?.height || 0} cm</span>
              </div>
              <div className="flex flex-col border-x border-white/[0.04]">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Weight</span>
                <span className="text-sm font-bold text-white mt-0.5">{user?.weight || 0} kg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">BMI</span>
                <span className="text-sm font-bold text-purple-400 mt-0.5">{bmi || 0}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: Edit forms card (2/3) */}
        <div className="lg:col-span-2">
          <Card className="p-6 border border-white/[0.05]">
            <div className="flex items-center gap-2 border-b border-white/[0.04] pb-3 mb-6">
              <FiUser className="text-purple-400 text-lg" />
              <h3 className="font-semibold text-white text-base">Edit Profile Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Display Name"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                  disabled={saving}
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="glass-input w-full bg-[#151522]"
                    disabled={saving}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Input
                  label="Age"
                  id="age"
                  type="number"
                  placeholder="22"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  error={errors.age}
                  disabled={saving}
                />

                <Input
                  label="Height (cm)"
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  error={errors.height}
                  disabled={saving}
                />

                <Input
                  label="Weight (kg)"
                  id="weight"
                  type="number"
                  placeholder="65"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  error={errors.weight}
                  disabled={saving}
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
                  disabled={saving}
                >
                  <option value="Get Fit">Get Fit / General Health</option>
                  <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
                  <option value="Fat Loss">Fat Loss / Conditioning</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Password update section */}
              <div className="mt-4 pt-5 border-t border-white/[0.04] space-y-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Change Password (Optional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="New Password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={errors.password}
                    disabled={saving}
                  />

                  <Input
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    error={errors.confirmPassword}
                    disabled={saving}
                  />
                </div>
              </div>

              <Button type="submit" isLoading={saving} className="w-full h-11 text-sm font-semibold mt-4">
                Save Profile Changes
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
