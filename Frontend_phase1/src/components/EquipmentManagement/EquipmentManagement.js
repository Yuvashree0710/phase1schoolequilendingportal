import React, { Component } from 'react';
import './EquipmentManagement.css';

class EquipmentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // List of all equipment
      equipmentList: [
        {
          id: 1,
          name: 'Laptop',
          category: 'Electronics',
          condition: 'Good',
          quantity: 10,
          availability: 'Available'
        },
        {
          id: 2,
          name: 'Projector',
          category: 'Electronics',
          condition: 'Excellent',
          quantity: 5,
          availability: 'Available'
        },
        {
          id: 3,
          name: 'Whiteboard',
          category: 'Classroom',
          condition: 'Good',
          quantity: 15,
          availability: 'Available'
        }
      ],
      
      // Form data for adding/editing
      formData: {
        name: '',
        category: '',
        condition: '',
        quantity: '',
        availability: 'Available'
      },
      
      // Control states
      isEditing: false,
      editingId: null,
      showForm: false
    };
  }

  // Handle input changes in the form
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  }

  // Show the add form
  showAddForm = () => {
    this.setState({
      showForm: true,
      isEditing: false,
      formData: {
        name: '',
        category: '',
        condition: '',
        quantity: '',
        availability: 'Available'
      }
    });
  }

  // Hide the form
  hideForm = () => {
    this.setState({
      showForm: false,
      isEditing: false,
      editingId: null,
      formData: {
        name: '',
        category: '',
        condition: '',
        quantity: '',
        availability: 'Available'
      }
    });
  }

  // Add new equipment
  addEquipment = (e) => {
    e.preventDefault();
    const { formData, equipmentList } = this.state;
    
    // Simple validation
    if (!formData.name || !formData.category || !formData.condition || !formData.quantity) {
      alert('Please fill in all fields');
      return;
    }

    // Create new equipment with unique ID
    const newEquipment = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      category: formData.category,
      condition: formData.condition,
      quantity: parseInt(formData.quantity),
      availability: formData.availability
    };

    // Add to list
    this.setState({
      equipmentList: [...equipmentList, newEquipment]
    });

    // Hide form and reset
    this.hideForm();
    alert('Equipment added successfully!');
  }

  // Edit equipment
  editEquipment = (equipment) => {
    this.setState({
      showForm: true,
      isEditing: true,
      editingId: equipment.id,
      formData: {
        name: equipment.name,
        category: equipment.category,
        condition: equipment.condition,
        quantity: equipment.quantity.toString(),
        availability: equipment.availability
      }
    });
  }

  // Update equipment
  updateEquipment = (e) => {
    e.preventDefault();
    const { formData, equipmentList, editingId } = this.state;
    
    // Simple validation
    if (!formData.name || !formData.category || !formData.condition || !formData.quantity) {
      alert('Please fill in all fields');
      return;
    }

    // Update the equipment in the list
    const updatedList = equipmentList.map(item => {
      if (item.id === editingId) {
        return {
          ...item,
          name: formData.name,
          category: formData.category,
          condition: formData.condition,
          quantity: parseInt(formData.quantity),
          availability: formData.availability
        };
      }
      return item;
    });

    this.setState({
      equipmentList: updatedList
    });

    // Hide form and reset
    this.hideForm();
    alert('Equipment updated successfully!');
  }

  // Delete equipment
  deleteEquipment = (id) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      const { equipmentList } = this.state;
      const updatedList = equipmentList.filter(item => item.id !== id);
      
      this.setState({
        equipmentList: updatedList
      });
      
      alert('Equipment deleted successfully!');
    }
  }

  render() {
    const { equipmentList, formData, showForm, isEditing } = this.state;

    return (
      <div className="equipment-management">
        <div className="header">
          <h1>Equipment Management</h1>
          <button className="btn-add" onClick={this.showAddForm}>
            Add New Equipment
          </button>
        </div>

        {/* Equipment List */}
        <div className="equipment-list">
          <table className="equipment-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Quantity</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map(equipment => (
                <tr key={equipment.id}>
                  <td>{equipment.name}</td>
                  <td>{equipment.category}</td>
                  <td>{equipment.condition}</td>
                  <td>{equipment.quantity}</td>
                  <td>
                    <span className={`status ${equipment.availability.toLowerCase()}`}>
                      {equipment.availability}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => this.editEquipment(equipment)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => this.deleteEquipment(equipment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {equipmentList.length === 0 && (
            <div className="no-equipment">
              <p>No equipment found. Add some equipment to get started!</p>
            </div>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="form-overlay">
            <div className="form-container">
              <h2>{isEditing ? 'Edit Equipment' : 'Add New Equipment'}</h2>
              
              <form onSubmit={isEditing ? this.updateEquipment : this.addEquipment}>
                <div className="form-group">
                  <label>Equipment Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={this.handleInputChange}
                    placeholder="Enter equipment name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Sports">Sports</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Audio/Visual">Audio/Visual</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Condition:</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={this.handleInputChange}
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Availability:</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={this.handleInputChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div className="form-buttons">
                  <button type="button" className="btn-cancel" onClick={this.hideForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    {isEditing ? 'Update' : 'Add'} Equipment
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

export default EquipmentManagement;