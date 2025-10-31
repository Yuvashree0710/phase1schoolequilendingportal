import React, { Component } from 'react';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userType: '',
      idNumber: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: '',
      success: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, userType, idNumber, password, confirmPassword } = this.state;
    
    // Validation
    if (!name.trim()) {
      this.setState({ error: 'Enter your name' });
      return;
    }

    if (!userType) {
      this.setState({ error: 'Select a user type' });
      return;
    }

    if (!idNumber.trim()) {
      this.setState({ error: 'Enter your ID number' });
      return;
    }

    if (idNumber.length < 3) {
      this.setState({ error: 'ID number must be at least 3 characters long' });
      return;
    }

    if (!password) {
      this.setState({ error: 'Enter a password' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters long' });
      return;
    }

    if (!confirmPassword) {
      this.setState({ error: 'Please confirm your password' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    this.setState({ isLoading: true, error: '' });

    // Simulate API call for user registration
    setTimeout(() => {
      this.setState({
        isLoading: false,
        success: 'Account created successfully!'
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        this.props.onClose();
      }, 2000);
    }, 1500);
  }

  handleCancel = () => {
    this.props.onClose();
  }

  render() {
    const { name, userType, idNumber, password, confirmPassword, isLoading, error, success } = this.state;
    
    return (
      <div className="signup-overlay">
        <div className="signup-modal">
          <div className="modal-header">
            <h1>Sign Up</h1>
            <button 
              className="close-btn" 
              onClick={this.props.onClose}
              type="button"
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  placeholder="Enter your full name"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType">User Type*</label>
                <select
                  id="userType"
                  name="userType"
                  value={userType}
                  onChange={this.handleInputChange}
                  className="form-select"
                  disabled={isLoading}
                  required
                >
                  <option value="">Select user type</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="idNumber">ID Number*</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={idNumber}
                  onChange={this.handleInputChange}
                  placeholder="Enter your ID number"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Create Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  placeholder="Create a password"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                  placeholder="Confirm your password"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="button-group">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={this.handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-confirm"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;