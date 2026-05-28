import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('gk_fit_token');
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
        } catch (error) {
          console.error('Failed to load profile on mount:', error.message);
          localStorage.removeItem('gk_fit_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('gk_fit_token', data.token);
      localStorage.setItem('token', data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        fitnessGoal: data.fitnessGoal,
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      localStorage.setItem('gk_fit_token', data.token);
      localStorage.setItem('token', data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        gender: data.gender,
        age: data.age,
        height: data.height,
        weight: data.weight,
        fitnessGoal: data.fitnessGoal,
      });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('gk_fit_token');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfileUser = async (userData) => {
    const data = await authService.updateProfile(userData);
    if (data.token) {
      localStorage.setItem('gk_fit_token', data.token);
    }
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      age: data.age,
      height: data.height,
      weight: data.weight,
      fitnessGoal: data.fitnessGoal,
    });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        updateProfile: updateProfileUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
