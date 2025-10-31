import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import EquipmentManagement from '../EquipmentManagement/EquipmentManagement';
import BorrowingRequests from '../BorrowingRequests/BorrowingRequests';
import './EquipmentDemo.css';

class EquipmentDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'dashboard',
      userRole: 'admin', // Change this to 'student', 'staff', or 'admin' to test different views
      userInfo: {
        name: 'Admin User',
        id: 'ADM001'
      }
    };
  }

  // Handle navigation between pages
  handleNavigation = (page) => {
    this.setState({ currentPage: page });
  }

  // Handle logout
  handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // In a real app, this would clear session and redirect to login
      window.location.reload();
    }
  }

  // Change user role for demo purposes
  changeUserRole = (role) => {
    const userInfo = {
      admin: { name: 'Admin User', id: 'ADM001' },
      staff: { name: 'Staff Member', id: 'STF001' },
      student: { name: 'John Student', id: 'STU001' }
    };

    this.setState({
      userRole: role,
      userInfo: userInfo[role],
      currentPage: 'dashboard' // Reset to dashboard when changing role
    });
  }

  // Render current page content
  renderPageContent = () => {
    const { currentPage, userRole } = this.state;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'borrowing':
        return <BorrowingRequests userRole={userRole} />;
      case 'equipment':
        return <EquipmentManagement userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  }

  render() {
    const { currentPage, userRole, userInfo } = this.state;

    return (
      <div className="equipment-demo">
        {/* Navigation */}
        <Navigation
          currentPage={currentPage}
          userRole={userRole}
          userInfo={userInfo}
          onNavigate={this.handleNavigation}
          onLogout={this.handleLogout}
        />

        {/* Demo Role Switcher */}
        <div className="demo-controls">
          <div className="role-switcher">
            <span>Demo Mode - Switch Role:</span>
            <button
              className={`role-btn ${userRole === 'student' ? 'active' : ''}`}
              onClick={() => this.changeUserRole('student')}
            >
              👨‍🎓 Student
            </button>
            <button
              className={`role-btn ${userRole === 'staff' ? 'active' : ''}`}
              onClick={() => this.changeUserRole('staff')}
            >
              👨‍🏫 Staff
            </button>
            <button
              className={`role-btn ${userRole === 'admin' ? 'active' : ''}`}
              onClick={() => this.changeUserRole('admin')}
            >
              👨‍💼 Admin
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {this.renderPageContent()}
        </div>
      </div>
    );
  }
}

export default EquipmentDemo;