import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Equipment list
      equipmentList: [
        {
          id: 1,
          name: 'Laptop',
          category: 'Electronics',
          condition: 'Good',
          quantity: 10,
          available: 8,
        },
        {
          id: 2,
          name: 'Projector',
          category: 'Electronics',
          condition: 'Good',
          quantity: 5,
          available: 3,
        },
        {
          id: 3,
          name: 'Guitar',
          category: 'Musical Instruments',
          condition: 'Excellent',
          quantity: 15,
          available: 12,
         
        },
        {
          id: 4,
          name: 'Camera',
          category: 'Electronics',
          condition: 'Fair',
          quantity: 8,
          available: 5,
        
        },
        {
          id: 5,
          name: 'Microphone',
          category: 'Audio/Visual',
          condition: 'Good',
          quantity: 12,
          available: 10,
        },
        {
          id: 6,
          name: 'Basketball',
          category: 'Sports',
          condition: 'Excellent',
          quantity: 20,
          available: 18,
        },
        {
          id: 7,
          name: 'Microscope',
          category: 'Laboratory',
          condition: 'Good',
          quantity: 6,
          available: 4,
        },
        {
          id: 8,
          name: 'Printer',
          category: 'Electronics',
          condition: 'Fair',
          quantity: 4,
          available: 2,
        }
      ],
      
      // Search and filter states
      searchTerm: '',
      selectedCategory: '',
      availabilityFilter: 'all', // all, available, unavailable
      
      // Filtered list
      filteredEquipment: []
    };
  }

  componentDidMount() {
    this.setState({ filteredEquipment: this.state.equipmentList });
  }

  // Handle search input
  handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState({ searchTerm }, this.filterEquipment);
  }

  // Handle category filter
  handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    this.setState({ selectedCategory }, this.filterEquipment);
  }

  // Handle availability filter
  handleAvailabilityFilter = (e) => {
    const availabilityFilter = e.target.value;
    this.setState({ availabilityFilter }, this.filterEquipment);
  }

  // Filter equipment based on search and filters
  filterEquipment = () => {
    const { equipmentList, searchTerm, selectedCategory, availabilityFilter } = this.state;
    
    let filtered = equipmentList;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.condition.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by availability
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(item => item.available > 0);
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(item => item.available === 0);
    }

    this.setState({ filteredEquipment: filtered });
  }

  // Clear all filters
  clearFilters = () => {
    this.setState({
      searchTerm: '',
      selectedCategory: '',
      availabilityFilter: 'all',
      filteredEquipment: this.state.equipmentList
    });
  }

  // Get unique categories
  getCategories = () => {
    const { equipmentList } = this.state;
    const categories = [...new Set(equipmentList.map(item => item.category))];
    return categories.sort();
  }

  // Quick request function (simplified)
  quickRequest = (equipment) => {
    alert(`Quick request for ${equipment.name} submitted! (This would open a request form in a real app)`);
  }

  render() {
    const { filteredEquipment, searchTerm, selectedCategory, availabilityFilter } = this.state;
    const categories = this.getCategories();
    const totalEquipment = this.state.equipmentList.length;
    const availableEquipment = this.state.equipmentList.filter(item => item.available > 0).length;
    const totalItems = this.state.equipmentList.reduce((sum, item) => sum + item.quantity, 0);
    const availableItems = this.state.equipmentList.reduce((sum, item) => sum + item.available, 0);

    return (
      <div className="dashboard">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1>Equipment Dashboard</h1>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">{totalEquipment}</div>
              <div className="stat-label">Equipment Types</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{availableEquipment}</div>
              <div className="stat-label">Available Types</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{totalItems}</div>
              <div className="stat-label">Total Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{availableItems}</div>
              <div className="stat-label">Available Items</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search equipment by name, category, or condition..."
              value={searchTerm}
              onChange={this.handleSearch}
              className="search-input"
            />
          </div>
         
        </div>

        {/* Equipment Grid */}
        <div className="equipment-grid">
          {filteredEquipment.map(equipment => (
            <div key={equipment.id} className="equipment-card">
              <div className="equipment-icon">{equipment.image}</div>
              <div className="equipment-info">
                <h3 className="equipment-name">{equipment.name}</h3>
                <div className="equipment-details">
                  <p><strong>Category:</strong> {equipment.category}</p>
                  <p><strong>Condition:</strong> {equipment.condition}</p>
                  <p><strong>Available:</strong> {equipment.available} / {equipment.quantity}</p>
                </div>
                <div className="availability-bar">
                  <div 
                    className="availability-fill"
                    style={{ 
                      width: `${(equipment.available / equipment.quantity) * 100}%`,
                      backgroundColor: equipment.available > 0 ? '#28a745' : '#dc3545'
                    }}
                  ></div>
                </div>
                <div className="equipment-status">
                  <span className={`status-badge ${equipment.available > 0 ? 'available' : 'unavailable'}`}>
                    {equipment.available > 0 ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                {equipment.available > 0 && (
                  <button 
                    className="quick-request-btn"
                    onClick={() => this.quickRequest(equipment)}
                  >
                    Quick Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredEquipment.length === 0 && (
          <div className="no-results">
            <h3>No equipment found</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="clear-filters-btn" onClick={this.clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredEquipment.length} of {totalEquipment} equipment types
        </div>
      </div>
    );
  }
}

export default Dashboard;