// src/components/Auth.jsx
import React, { useState } from 'react';
import './Authpage.css';

export default function Auth({ onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const localUsers = JSON.parse(localStorage.getItem('portfolio_database_users')) || [];

      if (viewMode === 'login') {
        const matchedUser = localUsers.find(user => 
          (user.email === email || user.username === email) && user.password === password
        );

        const isDemoUser = (email === 'sairam@gmail.com' || email === 'sairam') && password === '123456';

        if (matchedUser || isDemoUser) {
          // Success! 
          onLoginSuccess();
        } else {
          setErrorMessage('Invalid credentials. Check your username/email and password.');
        }

      } else {
        const duplicateExists = localUsers.some(user => user.email === email || user.username === username);

        if (duplicateExists) {
          setErrorMessage('Username or Email is already registered.');
          return;
        }

        const newUser = { username, email, password };
        
        localUsers.push(newUser);
        localStorage.setItem('portfolio_database_users', JSON.stringify(localUsers));

        alert('Account created and saved in local ecosystem successfully!');
        
        setViewMode('login');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setErrorMessage('Client ecosystem storage processing error.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {viewMode === 'login' ? (
          <>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in with Username or Email</p>
          </>
        ) : (
          <>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Register to unlock your profile ecosystem</p>
          </>
        )}

        {errorMessage && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {viewMode === 'register' && (
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                required 
                className="form-input" 
                placeholder="sairam_developer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>{viewMode === 'login' ? 'Username or Email' : 'Email Address'}</label>
            <input 
              type="text" 
              required 
              className="form-input" 
              placeholder={viewMode === 'login' ? "sairam or sairam@gmail.com" : "you@domain.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required 
              className="form-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {viewMode === 'login' ? 'Sign In & Explore' : 'Register & Log In'}
          </button>
        </form>

        <div className="switch-container">
          {viewMode === 'login' ? (
            <span className="switch-text">
              New here? 
              <button type="button" className="smart-switch-btn" onClick={() => setViewMode('register')}>
                Create an account
              </button>
            </span>
          ) : (
            <span className="switch-text">
              Have an account? 
              <button type="button" className="smart-switch-btn" onClick={() => setViewMode('login')}>
                Sign In instead
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}