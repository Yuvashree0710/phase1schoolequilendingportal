import React, { Component } from 'react';
import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1, // 1: Choose method, 2: Enter email/mobile, 3: Enter OTP, 4: Reset password
      authMethod: '', // 'email' or 'mobile'
      emailOrMobile: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      isLoading: false,
      error: '',
      success: ''
    };
  }


  handleMethodSelect = (method) => {
    this.setState({
      authMethod: method,
      step: 2,
      error: '',
      success: ''
    });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleSendOTP = (e) => {
    e.preventDefault();
    const { emailOrMobile, authMethod } = this.state;
    
    if (!emailOrMobile) {
      this.setState({ error: `Please enter your ${authMethod}` });
      return;
    }

    // Validate email or mobile format
    if (authMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailOrMobile)) {
        this.setState({ error: 'Please enter a valid email address' });
        return;
      }
    } else if (authMethod === 'mobile') {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(emailOrMobile)) {
        this.setState({ error: 'Please enter a valid 10-digit mobile number' });
        return;
      }
    }

    this.setState({ isLoading: true });

    // Simulate API call for sending OTP
    setTimeout(() => {
      this.setState({
        isLoading: false,
        step: 3,
        success: `OTP sent to your ${authMethod}: ${emailOrMobile}`
      });
    }, 2000);
  }

  handleVerifyOTP = (e) => {
    e.preventDefault();
    const { otp } = this.state;
    
    if (!otp || otp.length !== 6) {
      this.setState({ error: 'Please enter a valid 6-digit OTP' });
      return;
    }

    this.setState({ isLoading: true });

    // Simulate API call for OTP verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP
      this.setState({
        isLoading: false,
        step: 4,
        success: 'OTP verified successfully!'
      });
    }, 1500);
  }

  handleResetPassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = this.state;
    
    if (!newPassword || !confirmPassword) {
      this.setState({ error: 'Please fill in both password fields' });
      return;
    }

    if (newPassword.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters long' });
      return;
    }

    if (newPassword !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    this.setState({ isLoading: true });

    // Simulate API call for password reset
    setTimeout(() => {
      this.setState({
        isLoading: false,
        success: 'Password reset successfully!'
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        this.props.onClose();
      }, 2000);
    }, 1500);
  }

  handleResendOTP = () => {
    this.setState({ isLoading: true });
    
    setTimeout(() => {
      this.setState({
        isLoading: false,
        success: `OTP resent to your ${this.state.authMethod}: ${this.state.emailOrMobile}`
      });
    }, 1000);
  }

  renderStep1() {
    return (
      <div className="forgot-password-step">
        <p>How would you like to reset your password?</p>
        
        <div className="method-buttons">
          <button 
            type="button" 
            className="method-btn email-btn"
            onClick={() => this.handleMethodSelect('email')}
          >
            <i className="icon-email"></i>
            Reset via Email
          </button>
          
          <button 
            type="button" 
            className="method-btn mobile-btn"
            onClick={() => this.handleMethodSelect('mobile')}
          >
            <i className="icon-mobile"></i>
            Reset via Mobile
          </button>
        </div>
      </div>
    );
  }

  renderStep2() {
    const { authMethod, emailOrMobile, isLoading } = this.state;
    
    return (
      <div className="forgot-password-step">
        <h2>Enter Your {authMethod === 'email' ? 'Email' : 'Mobile Number'}</h2>
        <p>We'll send you an OTP to verify your identity</p>
        
        <form onSubmit={this.handleSendOTP}>
          <div className="form-group">
            <input
              type={authMethod === 'email' ? 'email' : 'tel'}
              name="emailOrMobile"
              value={emailOrMobile}
              onChange={this.handleInputChange}
              placeholder={authMethod === 'email' ? 'Enter your email' : 'Enter your mobile number'}
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    );
  }

  renderStep3() {
    const { otp, isLoading, authMethod, emailOrMobile } = this.state;
    
    return (
      <div className="forgot-password-step">
        <h2>Enter OTP</h2>
        <p>Enter the 6-digit OTP sent to your {authMethod}: {emailOrMobile}</p>
        
        <form onSubmit={this.handleVerifyOTP}>
          <div className="form-group">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={this.handleInputChange}
              placeholder="Enter 6-digit OTP"
              className="form-input otp-input"
              maxLength="6"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          
          <button 
            type="button" 
            className="btn-link"
            onClick={this.handleResendOTP}
            disabled={isLoading}
          >
            Resend OTP
          </button>
        </form>
      </div>
    );
  }

  renderStep4() {
    const { newPassword, confirmPassword, isLoading } = this.state;
    
    return (
      <div className="forgot-password-step">
        <h2>Reset Your Password</h2>
        <p>Enter your new password</p>
        
        <form onSubmit={this.handleResetPassword}>
          <div className="form-group">
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={this.handleInputChange}
              placeholder="Enter new password"
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleInputChange}
              placeholder="Confirm new password"
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { step, error, success } = this.state;
    
    return (
      <div className="forgot-password-overlay">
        <div className="forgot-password-modal">
          <div className="modal-header">
            <h1>Forgot Password</h1>
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
            
            {step === 1 && this.renderStep1()}
            {step === 2 && this.renderStep2()}
            {step === 3 && this.renderStep3()}
            {step === 4 && this.renderStep4()}
          </div>
          
          <div className="modal-footer">
            {step > 1 && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => this.setState({ step: step - 1, error: '', success: '' })}
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
