import React, { useState } from 'react';
import Auth from './Components/Auth/Authpage';
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
        <Authpage 
          onLoginSuccess={handleLoginSuccess} 
          forcedView={initialAuthView} 
        />
      )}
    </div>
  );
}
export default App;