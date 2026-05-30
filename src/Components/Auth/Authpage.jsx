import React, { useState, useEffect, useRef } from 'react';
import './Authpage.css';

function Authpage({ onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('login'); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const [showWelcome, setShowWelcome] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // 🎯 1. మల్టిపుల్ టైమర్స్ మెమరీ లీక్స్ రాకుండా కంట్రోల్ చేసే రిఫరెన్స్ buddy
  const passwordTimerRef = useRef(null);

  const API_URL = 'https://6a1873051878294b597d2750.mockapi.io/users';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  // 🎯 2. వ్యూ మోడ్ మారినప్పుడు పాస్‌వర్డ్ హైడ్ అవ్వడంతో పాటు రన్నింగ్ టైమర్‌ను క్లియర్ చేస్తున్నాం g
  useEffect(() => {
    setShowPassword(false);
    if (passwordTimerRef.current) {
      clearTimeout(passwordTimerRef.current);
    }
  }, [viewMode]);

  // 🎯 3. కంపొనెంట్ అన్‌మౌంట్ అయినప్పుడు టైమర్ క్లీనప్ buddy
  useEffect(() => {
    return () => {
      if (passwordTimerRef.current) clearTimeout(passwordTimerRef.current);
    };
  }, []);

  // 🎯 4. ఐకాన్ క్లిక్ చేసినప్పుడు రన్ అయ్యే స్మార్ట్ 2-సెకండ్స్ ఆటో హైడ్ ఫంక్షన్ g
  const togglePasswordVisibility = () => {
    // ఒకవేళ ఆల్రెడీ రన్నింగ్ టైమర్ ఉంటే దాన్ని ముందే క్లియర్ చేస్తాం
    if (passwordTimerRef.current) {
      clearTimeout(passwordTimerRef.current);
    }

    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
      // కరెక్ట్‌గా 2 సెకన్ల (2000ms) తర్వాత ఆటోమేటిక్‌గా హైడ్ అయిపోతుంది buddy
      passwordTimerRef.current = setTimeout(() => {
        setShowPassword(false);
      }, 1000);
    }
  };

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

        if (matchedUser) {
          onLoginSuccess(matchedUser.username); 
        } else if (isDemoUser) {
          onLoginSuccess('sairam'); 
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
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                style={{ paddingRight: '45px', width: '100%' }} 
              />
              
              {/* 🎯 5. కొత్త టోగుల్ క్లిక్ ఫంక్షన్ యాడ్ చేసిన ఐకాన్ బటన్ buddy */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  userSelect: 'none'
                }}
                title="Show password briefly"
              >
                {showPassword ? '👁️' : '🙈'} 
              </button>
            </div>
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