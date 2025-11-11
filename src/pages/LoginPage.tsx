import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/AuthPages.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual login logic with backend
    console.log('Login data:', formData);
    
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <Logo width={50} height={50} />
        <h2>Assemble</h2>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your renovation journey</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-footer">
              <a 
                href="/forgot-password" 
                className="forgot-password-link"
                onClick={(e) => { e.preventDefault(); alert('Password reset coming soon!'); }}
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>

            <p className="auth-footer-text">
              Don't have an account?{' '}
              <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
