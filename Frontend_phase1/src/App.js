import React from 'react';
import './styles/App.css';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SignUp from './components/SignUp/SignUp';
import rootReducer from './reducers/rootReducer';
import { handleForgotPasswordClick, handleCloseForgotPassword } from './components/ForgotPassword/action';
import { handleSignUpClick, handleCloseSignUp } from './components/SignUp/action';

function App() {
  const [state, dispatch] = React.useReducer(rootReducer, { 
    ForgotPassword: { showForgotPassword: false },
    signUp: { showSignUp: false }
  });

  return (
    <div className="App">
      <form action="action_page.php" method="post">
        
    <h1>Welcome to ABC School Equipment Lending Portal</h1>
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
            <button type="submit">Sign In</button>
          </div>
          
          <div className="form-row">
            <label>
              <input type="checkbox"  /> Remember me
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