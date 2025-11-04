import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import rootReducer from './reducers/rootReducer';
import { handleForgotPasswordClick, handleCloseForgotPassword } from './components/ForgotPassword/action';
import { handleSignUpClick, handleCloseSignUp } from './components/SignUp/action';
import { authService } from './services';

function App() {
  // State for managing modals (ForgotPassword, SignUp)
  const [state, dispatch] = React.useReducer(rootReducer, { 
    ForgotPassword: { showForgotPassword: false },
    signUp: { showSignUp: false }
  });
  
  // State for authentication
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in when app starts
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const role = formData.get('role');

    try {
      const loggedInUser = await authService.login(username, password, role);
      setUser(loggedInUser);
      console.log('Login successful:', loggedInUser);
    } catch (error) {
      console.error('Login error:', error);
      setError(typeof error === 'string' ? error : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setError('');
  };

  // Show loading screen
  if (isLoading) {
    return (
      <div className="App">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show dashboard if user is logged in
  if (user) {
    return (
      <div className="App">
        <Dashboard user={user} onLogout={handleLogout} />
      </div>
    );
  }

  // Show login form if user is not logged in
  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <h1>Welcome to ABC School Equipment Lending Portal</h1>
        
        {error && (
          <div style={{ 
            color: 'red', 
            padding: '10px', 
            backgroundColor: '#ffebee', 
            border: '1px solid #e57373',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}
        
        <div className="container">
          <div className="form-row">
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required />
          </div>
          
          <div className="form-row">
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />
          </div>

          <div className="form-row">
            <label htmlFor="role"><b>Select Role</b></label>
            <select name="role" required>
              <option value="">Choose your role...</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-row">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          
          <div className="form-row">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>
        </div>

        <div className="container" style={{backgroundColor: "#f1f1f1"}}>
          <div className='form-row'>New? <a href="#" onClick={handleSignUpClick(dispatch)}>Sign up</a></div>
          <span className="psw"> <a href="#" onClick={handleForgotPasswordClick(dispatch)}> Forgot password?</a></span>
        </div>
      </form>
      
      {state.ForgotPassword.showForgotPassword && (
        <ForgotPassword onClose={handleCloseForgotPassword(dispatch)} />
      )}
      
      {state.signUp.showSignUp && (
        <SignUp onClose={handleCloseSignUp(dispatch)} />
      )}
    </div>
  );
}

export default App;