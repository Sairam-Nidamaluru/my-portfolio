// src/components/Auth.jsx
import React, { useState } from 'react';
import './Authpage.css';

export default function Auth({ onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = 'http://localhost:5000/users';

  const handleSubmit = async (e) => {
    // FIX FOR BUG 2: This completely stops the browser from refreshing the page!
    e.preventDefault();
    setErrorMessage('');

    try {
      if (viewMode === 'login') {
        // --- FIXED LOGIN FLOW (BUG 1) ---
        // We fetch all users to safely check if what you typed matches EITHER their email OR their username
        const response = await fetch(API_URL);
        const allUsers = await response.json();

        // Look through the database array for a match
        const matchedUser = allUsers.find(user => 
          (user.email === email || user.username === email) && user.password === password
        );

        if (matchedUser) {
          // Success! This updates App.jsx state without triggering a page reload
          onLoginSuccess();
        } else {
          setErrorMessage('Invalid credentials. Check your username/email and password.');
        }

      } else {
        // --- REGISTER FLOW ---
        // Verify if username or email already exists before writing to database
        const checkResponse = await fetch(API_URL);
        const allUsers = await checkResponse.json();

        const duplicateExists = allUsers.some(user => user.email === email || user.username === username);

        if (duplicateExists) {
          setErrorMessage('Username or Email is already registered.');
          return;
        }

        const newUser = { username, email, password };

        const saveResponse = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        if (saveResponse.ok) {
          alert('Account created and saved in db.json successfully!');
          onLoginSuccess();
        } else {
          setErrorMessage('Failed to register user.');
        }
      }
    } catch (error) {
      setErrorMessage('Database offline. Make sure "npx json-server db.json --port 5000" is running.');
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
              placeholder={viewMode === 'login' ? "sairam_developer or you@domain.com" : "you@domain.com"}
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