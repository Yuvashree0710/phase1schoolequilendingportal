import React, { useState, useEffect } from 'react';
import { equipmentService, requestService } from '../../services';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [equipment, setEquipment] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [equipmentData, requestsData] = await Promise.all([
        equipmentService.getAllEquipment(),
        requestService.getAllRequests()
      ]);
      
      setEquipment(equipmentData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Loading Your Dashboard...</h2>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.available > 0).length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(req => req.status === 'Pending').length;
  const approvedRequests = requests.filter(req => req.status === 'Approved').length;
  const rejectedRequests = requests.filter(req => req.status === 'Rejected').length;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Welcome back, {user.fullName}!</h1>
            <p>{user.role} Control Center</p>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Statistics Cards - 6 Columns */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <span className="stat-number">{totalEquipment}</span>
            <span className="stat-label">Total Equipment</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <span className="stat-number">{availableEquipment}</span>
            <span className="stat-label">Available Now</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">��</span>
            <span className="stat-number">{totalRequests}</span>
            <span className="stat-label">Total Requests</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <span className="stat-number">{pendingRequests}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎯</span>
            <span className="stat-number">{approvedRequests}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">❌</span>
            <span className="stat-number">{rejectedRequests}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>

        {/* Main Content Grid - 3 Columns */}
        <div className="content-grid">
          {/* Equipment Section - Takes 2/3 width */}
          <div className="equipment-section">
            <div className="section-header">
              <h2 className="section-title">
                🏢 Equipment Inventory Management
              </h2>
            </div>
            <div className="section-content">
              {equipment.length === 0 ? (
                <div className="empty-state">
                  📦 No equipment available in the system
                </div>
              ) : (
                equipment.map((item) => (
                  <div key={item._id} className="equipment-item">
                    <div className="equipment-name">{item.name}</div>
                    <div className="equipment-details">
                      <span className="equipment-category">{item.category}</span>
                      <span className={`equipment-availability ${item.available > 0 ? 'available' : 'unavailable'}`}>
                        {item.available}/{item.quantity} units available
                      </span>
                    </div>
                    <div className="equipment-description">{item.description}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Requests Section */}
          <div className="requests-section">
            <div className="section-header">
              <h2 className="section-title">
                📋 {user.role === 'student' ? 'My Requests' : 'All Requests'}
              </h2>
            </div>
            <div className="section-content">
              {requests.length === 0 ? (
                <div className="empty-state">
                  📝 No requests in the system
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request._id} className="request-item">
                    <div className="request-equipment">{request.equipment.name}</div>
                    <div className="request-student">👤 {request.student.fullName}</div>
                    <div className="request-status-row">
                      <span className={`request-status status-${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="request-purpose">📝 {request.purpose}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="requests-section">
            <div className="section-header">
              <h2 className="section-title">
                🚀 System Tools
              </h2>
            </div>
            <div className="section-content">
              <div style={{padding: '20px'}}>
                <div style={{marginBottom: '20px'}}>
                  <h3 style={{color: '#1a202c', marginBottom: '15px', fontSize: '18px'}}>User Information</h3>
                  <div style={{background: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '15px'}}>
                    <p><strong>Name:</strong> {user.fullName}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                  </div>
                </div>
                
                <div style={{marginBottom: '20px'}}>
                  <h3 style={{color: '#1a202c', marginBottom: '15px', fontSize: '18px'}}>Quick Stats</h3>
                  <div style={{background: '#f8fafc', padding: '15px', borderRadius: '10px'}}>
                    <p><strong>Active Equipment:</strong> {availableEquipment}</p>
                    <p><strong>Total Categories:</strong> {[...new Set(equipment.map(e => e.category))].length}</p>
                    <p><strong>Request Rate:</strong> {totalRequests > 0 ? Math.round((approvedRequests/totalRequests)*100) : 0}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Row - 6 Columns */}
        <div className="actions-row">
          <h2 className="section-title" style={{marginBottom: '0', textAlign: 'center'}}>
            🎯 Quick Actions & System Management
          </h2>
          <div className="actions-grid">
            <button className="action-button primary">
              <span className="action-icon">➕</span>
              Add Equipment
            </button>
            <button className="action-button success">
              <span className="action-icon">📝</span>
              New Request
            </button>
            <button className="action-button warning">
              <span className="action-icon">📊</span>
              View Reports
            </button>
            <button className="action-button info">
              <span className="action-icon">⚙️</span>
              Settings
            </button>
            <button className="action-button primary">
              <span className="action-icon">👥</span>
              Manage Users
            </button>
            <button className="action-button success">
              <span className="action-icon">📈</span>
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
