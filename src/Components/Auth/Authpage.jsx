import React, { useState } from 'react';
import './Authpage.css';

function Authpage({ onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const API_URL = 'https://6a1873051878294b597d2750.mockapi.io/users';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (viewMode === 'login') {

        const response = await fetch(API_URL);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('API Endpoint path mismatch. Please check your MockAPI resource.');
          }
          throw new Error('Database server connection error.');
        }
        
        const serverUsers = await response.json();
        const safeLoginUsers = Array.isArray(serverUsers) ? serverUsers : [];

        const matchedUser = safeLoginUsers.find(user => 
          (user.email === email || user.username === email) && user.password === password
        );

        const isDemoUser = (email === 'sairam@gmail.com' || email === 'sairam') && password === '123456';

        if (matchedUser || isDemoUser) {
          onLoginSuccess();
        } else {
          setErrorMessage('Invalid credentials. Check your username/email and password.');
        }

      } else {

        let safeRegisterUsers = [];
        
        try {
          const checkResponse = await fetch(API_URL);
          if (checkResponse.ok) {
            const currentUsers = await checkResponse.json();
            if (Array.isArray(currentUsers)) {
              safeRegisterUsers = currentUsers;
            }
          }
        } catch (fetchErr) {
          console.log("Database is empty or first user sign-up setup:", fetchErr);
          safeRegisterUsers = [];
        }

        const duplicateExists = safeRegisterUsers.some(user => user.email === email || user.username === username);

        if (duplicateExists) {
          setErrorMessage('Username or Email is already registered.');
          setIsLoading(false);
          return;
        }

        const newUser = { username, email, password };

        const saveResponse = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        if (saveResponse.ok) {
          alert('Account created and saved in cloud database successfully!');
          setViewMode('login');
          setUsername('');
          setEmail(''); 
          setPassword('');
        } else {
          setErrorMessage('Failed to register user to the cloud database. Check endpoint config.');
        }
      }
    } catch (error) {
      console.error("Main API Error Log: ", error);
      setErrorMessage(error.message || 'Cloud database integration processing error.');
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Connecting Cloud...' : (viewMode === 'login' ? 'Sign In & Explore' : 'Register & Log In')}
          </button>
        </form>

        <div className="switch-container">
          {viewMode === 'login' ? (
            <span className="switch-text">
              New here? 
              <button type="button" className="smart-switch-btn" onClick={() => setViewMode('register')} disabled={isLoading}>
                Create an account
              </button>
            </span>
          ) : (
            <span className="switch-text">
              Have an account? 
              <button type="button" className="smart-switch-btn" onClick={() => setViewMode('login')} disabled={isLoading}>
                Sign In instead
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
export default Authpage;