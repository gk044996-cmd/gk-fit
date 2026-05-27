import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext.jsx';
import Card from '../components/Common/Card.jsx';
import Input from '../components/Common/Input.jsx';
import Button from '../components/Common/Button.jsx';

const ForgotPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setLoading(true);
    
    // Simulate sending recovery email
    setTimeout(() => {
      setLoading(false);
      showToast('Password recovery instructions sent to your email!', 'success');
      navigate('/login');
    }, 1500);
  };

  return (
    <Card className="p-8 w-full border border-white/[0.08] relative">
      <div className="flex flex-col gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
        <p className="text-xs text-gray-500">Enter your email to receive recovery instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          disabled={loading}
        />

        <Button type="submit" isLoading={loading} className="w-full h-11 text-sm font-semibold mt-2">
          Send Recovery Link
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-500">
        Remember your credentials?{' '}
        <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
          Back to Login
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPassword;
