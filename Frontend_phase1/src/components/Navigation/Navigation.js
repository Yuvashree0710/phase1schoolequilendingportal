import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {
  handleNavClick = (page) => {
    this.props.onNavigate(page);
  }

  render() {
    const { currentPage, userRole, userInfo } = this.props;

    return (
      <nav className="navigation">
        <div className="nav-container">
          {/* Logo/Brand */}
          <div className="nav-brand">
            <h2> ABC School Equipment Portal</h2>
          </div>

          {/* Navigation Menu */}
          <div className="nav-menu">
            <div className="nav-links">
              <button
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={() => this.handleNavClick('dashboard')}
              >
                 Dashboard
              </button>

              <button
                className={`nav-link ${currentPage === 'borrowing' ? 'active' : ''}`}
                onClick={() => this.handleNavClick('borrowing')}
              >
                 {userRole === 'student' ? 'My Requests' : 'Borrowing Requests'}
              </button>

              {(userRole === 'admin' || userRole === 'staff') && (
                <button
                  className={`nav-link ${currentPage === 'equipment' ? 'active' : ''}`}
                  onClick={() => this.handleNavClick('equipment')}
                >
                   Equipment Management
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="nav-user">
              <div className="user-info">
                <span className="user-name">{userInfo?.name || 'User'}</span>
              </div>
              <button
                className="logout-btn"
                onClick={() => this.props.onLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;