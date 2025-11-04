import React, { useState } from 'react';
import './ForgotPassword.css';
import { authService } from '../../services';

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const message = await authService.forgotPassword(email);
      setSuccess(message);
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      setError(typeof error === 'string' ? error : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-modal">
        <div className="modal-header">
            <h2>Reset Your Password</h2>
          <button className="close-btn" onClick={onClose} type="button">×</button>
        </div>
        
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="forgot-password-step">
            <p>Enter your email address and we'll send you instructions</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="form-input"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
