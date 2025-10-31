import React, { Component } from 'react';
import './BorrowingRequests.css';

class BorrowingRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Sample borrowing requests
      requests: [
        {
          id: 1,
          studentName: 'John Doe',
          studentId: 'STU001',
          equipmentName: 'Laptop',
          quantity: 1,
          borrowDate: '2025-11-01',
          returnDate: '2025-11-05',
          status: 'Pending',
          requestDate: '2025-10-30'
        },
        {
          id: 2,
          studentName: 'Jane Smith',
          studentId: 'STU002',
          equipmentName: 'Projector',
          quantity: 1,
          borrowDate: '2025-11-02',
          returnDate: '2025-11-03',
          status: 'Approved',
          requestDate: '2025-10-29'
        },
        {
          id: 3,
          studentName: 'Mike Johnson',
          studentId: 'STU003',
          equipmentName: 'Whiteboard',
          quantity: 1,
          borrowDate: '2025-11-01',
          returnDate: '2025-11-10',
          status: 'Returned',
          requestDate: '2025-10-25'
        }
      ],
      
      // New request form
      newRequest: {
        studentName: '',
        studentId: '',
        equipmentName: '',
        quantity: 1,
        borrowDate: '',
        returnDate: ''
      },
      
      showForm: false,
      availableEquipment: ['Laptop', 'Projector', 'Whiteboard', 'Camera', 'Microphone']
    };
  }

  // Handle input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newRequest: {
        ...this.state.newRequest,
        [name]: value
      }
    });
  }

  // Show new request form
  showRequestForm = () => {
    this.setState({
      showForm: true,
      newRequest: {
        studentName: '',
        studentId: '',
        equipmentName: '',
        quantity: 1,
        borrowDate: '',
        returnDate: ''
      }
    });
  }

  // Hide form
  hideForm = () => {
    this.setState({ showForm: false });
  }

  // Submit new request
  submitRequest = (e) => {
    e.preventDefault();
    const { newRequest, requests } = this.state;
    
    // Simple validation
    if (!newRequest.studentName || !newRequest.studentId || !newRequest.equipmentName || 
        !newRequest.borrowDate || !newRequest.returnDate) {
      alert('Please fill in all fields');
      return;
    }

    // Check if return date is after borrow date
    if (new Date(newRequest.returnDate) <= new Date(newRequest.borrowDate)) {
      alert('Return date must be after borrow date');
      return;
    }

    // Check for overlapping bookings
    const hasOverlap = requests.some(request => {
      if (request.equipmentName === newRequest.equipmentName && 
          (request.status === 'Approved' || request.status === 'Pending')) {
        const existingStart = new Date(request.borrowDate);
        const existingEnd = new Date(request.returnDate);
        const newStart = new Date(newRequest.borrowDate);
        const newEnd = new Date(newRequest.returnDate);
        
        return (newStart <= existingEnd && newEnd >= existingStart);
      }
      return false;
    });

    if (hasOverlap) {
      alert('This equipment is already booked for the selected dates. Please choose different dates.');
      return;
    }

    // Create new request
    const request = {
      id: Date.now(),
      ...newRequest,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0]
    };

    this.setState({
      requests: [...requests, request]
    });

    this.hideForm();
    alert('Request submitted successfully!');
  }

  // Approve request
  approveRequest = (id) => {
    const { requests } = this.state;
    const updatedRequests = requests.map(request => {
      if (request.id === id) {
        return { ...request, status: 'Approved' };
      }
      return request;
    });

    this.setState({ requests: updatedRequests });
    alert('Request approved!');
  }

  // Reject request
  rejectRequest = (id) => {
    if (window.confirm('Are you sure you want to reject this request?')) {
      const { requests } = this.state;
      const updatedRequests = requests.map(request => {
        if (request.id === id) {
          return { ...request, status: 'Rejected' };
        }
        return request;
      });

      this.setState({ requests: updatedRequests });
      alert('Request rejected!');
    }
  }

  // Mark as returned
  markAsReturned = (id) => {
    if (window.confirm('Mark this equipment as returned?')) {
      const { requests } = this.state;
      const updatedRequests = requests.map(request => {
        if (request.id === id) {
          return { ...request, status: 'Returned' };
        }
        return request;
      });

      this.setState({ requests: updatedRequests });
      alert('Equipment marked as returned!');
    }
  }

  // Get status color
  getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'pending';
      case 'Approved': return 'approved';
      case 'Rejected': return 'rejected';
      case 'Returned': return 'returned';
      default: return '';
    }
  }

  render() {
    const { requests, newRequest, showForm, availableEquipment } = this.state;
    const userRole = this.props.userRole || 'student'; // student, staff, or admin

    return (
      <div className="borrowing-requests">
        <div className="header">
          <h1>Borrowing & Return Requests</h1>
          {userRole === 'student' && (
            <button className="btn-request" onClick={this.showRequestForm}>
              Request Equipment
            </button>
          )}
        </div>

        {/* Requests Table */}
        <div className="requests-list">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Equipment</th>
                <th>Quantity</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Request Date</th>
                {(userRole === 'staff' || userRole === 'admin') && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.studentName}</td>
                  <td>{request.studentId}</td>
                  <td>{request.equipmentName}</td>
                  <td>{request.quantity}</td>
                  <td>{request.borrowDate}</td>
                  <td>{request.returnDate}</td>
                  <td>
                    <span className={`status ${this.getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>{request.requestDate}</td>
                  {(userRole === 'staff' || userRole === 'admin') && (
                    <td>
                      {request.status === 'Pending' && (
                        <>
                          <button 
                            className="btn-approve"
                            onClick={() => this.approveRequest(request.id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => this.rejectRequest(request.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <button 
                          className="btn-return"
                          onClick={() => this.markAsReturned(request.id)}
                        >
                          Mark Returned
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <div className="no-requests">
              <p>No borrowing requests found.</p>
            </div>
          )}
        </div>

        {/* New Request Form */}
        {showForm && (
          <div className="form-overlay">
            <div className="form-container">
              <h2>Request Equipment</h2>
              
              <form onSubmit={this.submitRequest}>
                <div className="form-group">
                  <label>Student Name:</label>
                  <input
                    type="text"
                    name="studentName"
                    value={newRequest.studentName}
                    onChange={this.handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Student ID:</label>
                  <input
                    type="text"
                    name="studentId"
                    value={newRequest.studentId}
                    onChange={this.handleInputChange}
                    placeholder="Enter your student ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Equipment:</label>
                  <select
                    name="equipmentName"
                    value={newRequest.equipmentName}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Equipment</option>
                    {availableEquipment.map(equipment => (
                      <option key={equipment} value={equipment}>
                        {equipment}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newRequest.quantity}
                    onChange={this.handleInputChange}
                    min="1"
                    max="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Borrow Date:</label>
                  <input
                    type="date"
                    name="borrowDate"
                    value={newRequest.borrowDate}
                    onChange={this.handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Return Date:</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={newRequest.returnDate}
                    onChange={this.handleInputChange}
                    min={newRequest.borrowDate || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn-cancel" onClick={this.hideForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BorrowingRequests;