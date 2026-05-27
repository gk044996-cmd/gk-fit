import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      showToast('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.message);
      showToast(err.response?.data?.message || 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 w-full border border-white/[0.08] relative">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-gray-500">Sign in to your premium fitness companion</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={loading}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={loading}
        />

        <div className="text-right">
          <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 font-medium">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isLoading={loading} className="w-full h-11 text-sm font-semibold mt-2">
          Sign In
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
          Create Account
        </Link>
      </div>
    </Card>
  );
};

export default Login;
