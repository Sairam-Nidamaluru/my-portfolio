import React, { useState, useEffect } from 'react';
import Authpage from './Components/Auth/Authpage'; 
import Homepage from './Components/Home/Homepage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isUserLoggedIn') === 'true';
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    return localStorage.getItem('loggedInUsername') || '';
  });

  const [initialAuthView, setInitialAuthView] = useState('login');

  const [showHomeWelcome, setShowHomeWelcome] = useState(false);

  const handleLoginSuccess = (username) => {
    localStorage.setItem('isUserLoggedIn', 'true');
    localStorage.setItem('loggedInUsername', username);
    setLoggedInUser(username);
    setIsAuthenticated(true);
    setShowHomeWelcome(true); 
  };

  useEffect(() => {
    if (showHomeWelcome) {
      const timer = setTimeout(() => {
        setShowHomeWelcome(false); 
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [showHomeWelcome]);

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('loggedInUsername');
    setLoggedInUser('');
    setInitialAuthView('login'); 
    setIsAuthenticated(false);
    setShowHomeWelcome(false);
  };

  const handleRedirectToRegister = () => {
    localStorage.removeItem('isUserLoggedIn'); 
    localStorage.removeItem('loggedInUsername');
    setLoggedInUser('');
    setInitialAuthView('register');         
    setIsAuthenticated(false);                
    setShowHomeWelcome(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        showHomeWelcome ? (

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#1e3a8a', 
            color: '#ffffff',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            padding: '20px'
          }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', animation: 'bounce 2s infinite' }}>
              Hello {loggedInUser || 'Buddy'} 👋
            </h1>
            <p style={{ fontSize: '1.6rem', fontWeight: '400', maxWidth: '700px', lineHeight: '1.6', opacity: '0.95' }}>
              Thanks for visiting Sairam portfolio. Let's see the Homepage!
            </p>
            <div style={{ marginTop: '30px', width: '50px', height: '50px', border: '5px solid rgba(255,255,255,0.2)', borderTop: '5px solid #ffffff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
          </div>
        ) : (
          
          <Homepage 
            onLogout={handleLogout} 
            onRegisterRedirect={handleRedirectToRegister} 
            username={loggedInUser} 
          />
        )
      ) : (
        <Authpage 
          onLoginSuccess={handleLoginSuccess} 
          forcedView={initialAuthView} 
        />
      )}
    </div>
  );
}

export default App;