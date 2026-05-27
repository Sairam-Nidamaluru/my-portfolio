import React, { useState } from 'react';
import Authpage from './Components/Auth/Authpage'; 
import Homepage from './Components/Home/Homepage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isUserLoggedIn') === 'true';
  });

  const [initialAuthView, setInitialAuthView] = useState('login');

  const handleLoginSuccess = () => {
    localStorage.setItem('isUserLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    setInitialAuthView('login'); 
    setIsAuthenticated(false);
  };

  const handleRedirectToRegister = () => {
    localStorage.removeItem('isUserLoggedIn'); 
    setInitialAuthView('register');         
    setIsAuthenticated(false);                
  };

  return (
    <div>
      {isAuthenticated ? (
        <Homepage 
          onLogout={handleLogout} 
          onRegisterRedirect={handleRedirectToRegister} 
        />
      ) : (
        /* ఇప్పుడు ఈ Authpage కంపోనెంట్ ఎర్రర్ లేకుండా పర్ఫెక్ట్‌గా లోడ్ అవుతుంది */
        <Authpage 
          onLoginSuccess={handleLoginSuccess} 
          forcedView={initialAuthView} 
        />
      )}
    </div>
  );
}

export default App;