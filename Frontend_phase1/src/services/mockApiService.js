// Mock API service - simulates backend responses without needing a running server
// This is perfect for development when backend is not available

// Mock data
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@school.com',
    fullName: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    username: 'staff1',
    email: 'staff1@school.com',
    fullName: 'Staff Member',
    role: 'staff'
  },
  {
    id: '3',
    username: 'student1',
    email: 'student1@school.com',
    fullName: 'John Doe',
    role: 'student',
    studentId: 'STU001'
  },
  {
    id: '4',
    username: 'student2',
    email: 'student2@school.com',
    fullName: 'Jane Smith',
    role: 'student',
    studentId: 'STU002'
  }
];

const mockEquipment = [
  {
    _id: '1',
    name: 'Laptop - Dell Latitude',
    category: 'Electronics',
    condition: 'Good',
    quantity: 10,
    available: 8,
    description: 'Dell Latitude laptops for student projects',
    serialNumber: 'LAPTOP001'
  },
  {
    _id: '2',
    name: 'Projector - Epson',
    category: 'Electronics',
    condition: 'Excellent',
    quantity: 5,
    available: 4,
    description: 'Epson projectors for presentations',
    serialNumber: 'PROJ001'
  },
  {
    _id: '3',
    name: 'Soccer Ball',
    category: 'Sports',
    condition: 'Good',
    quantity: 15,
    available: 12,
    description: 'Standard soccer balls for sports activities',
    serialNumber: 'BALL001'
  },
  {
    _id: '4',
    name: 'Microscope',
    category: 'Laboratory',
    condition: 'Excellent',
    quantity: 8,
    available: 6,
    description: 'Digital microscopes for science lab',
    serialNumber: 'MICRO001'
  },
  {
    _id: '5',
    name: 'Guitar - Acoustic',
    category: 'Musical Instruments',
    condition: 'Good',
    quantity: 6,
    available: 5,
    description: 'Acoustic guitars for music class',
    serialNumber: 'GUITAR001'
  }
];

const mockRequests = [
  {
    _id: '1',
    student: {
      _id: '3',
      username: 'student1',
      fullName: 'John Doe',
      email: 'student1@school.com'
    },
    equipment: {
      _id: '1',
      name: 'Laptop - Dell Latitude',
      category: 'Electronics'
    },
    quantity: 1,
    borrowDate: '2024-11-05',
    expectedReturnDate: '2024-11-12',
    status: 'Pending',
    purpose: 'Computer Science project',
    createdAt: '2024-11-04T10:00:00.000Z'
  },
  {
    _id: '2',
    student: {
      _id: '4',
      username: 'student2',
      fullName: 'Jane Smith',
      email: 'student2@school.com'
    },
    equipment: {
      _id: '2',
      name: 'Projector - Epson',
      category: 'Electronics'
    },
    quantity: 1,
    borrowDate: '2024-11-03',
    expectedReturnDate: '2024-11-06',
    status: 'Approved',
    purpose: 'Class presentation',
    approvedBy: {
      _id: '2',
      username: 'staff1',
      fullName: 'Staff Member'
    },
    createdAt: '2024-11-03T09:00:00.000Z'
  }
];

// Test credentials
const testCredentials = {
  'admin': 'admin123',
  'staff1': 'staff123',
  'student1': 'student123',
  'student2': 'student123'
};

// Helper function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
const mockApiService = {
  // Authentication
  async login(username, password, role) {
    await delay();
    
    // Check credentials
    if (!testCredentials[username] || testCredentials[username] !== password) {
      throw new Error('Invalid credentials');
    }
    
    const user = mockUsers.find(u => u.username === username);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check role if provided
    if (role && user.role !== role) {
      throw new Error('Invalid role for this user');
    }
    
    // Generate fake token
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    return {
      user,
      token
    };
  },

  async register(userData) {
    await delay();
    
    // Check if username exists
    if (mockUsers.find(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }
    
    // Check if email exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }
    
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      role: userData.role || 'student'
    };
    
    mockUsers.push(newUser);
    
    const token = `mock_token_${newUser.id}_${Date.now()}`;
    
    return {
      user: newUser,
      token
    };
  },

  async forgotPassword(email) {
    await delay();
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    
    return 'Password reset instructions have been sent to your email (Demo mode)';
  },

  async getCurrentUser(token) {
    await delay();
    
    if (!token || !token.startsWith('mock_token_')) {
      throw new Error('Invalid token');
    }
    
    const userId = token.split('_')[2];
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },

  // Equipment
  async getAllEquipment(filters = {}) {
    await delay();
    
    let result = [...mockEquipment];
    
    if (filters.category) {
      result = result.filter(e => e.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.category.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.availability === 'available') {
      result = result.filter(e => e.available > 0);
    } else if (filters.availability === 'unavailable') {
      result = result.filter(e => e.available === 0);
    }
    
    if (filters.condition) {
      result = result.filter(e => e.condition === filters.condition);
    }
    
    return result;
  },

  async getEquipmentById(id) {
    await delay();
    
    const equipment = mockEquipment.find(e => e._id === id);
    if (!equipment) {
      throw new Error('Equipment not found');
    }
    
    return equipment;
  },

  async createEquipment(equipmentData) {
    await delay();
    
    const newEquipment = {
      _id: (mockEquipment.length + 1).toString(),
      ...equipmentData,
      available: equipmentData.quantity,
      createdAt: new Date().toISOString()
    };
    
    mockEquipment.push(newEquipment);
    return newEquipment;
  },

  async getCategories() {
    await delay();
    
    const categories = [...new Set(mockEquipment.map(e => e.category))];
    return categories;
  },

  // Requests
  async getAllRequests(userRole, userId, filters = {}) {
    await delay();
    
    let result = [...mockRequests];
    
    // Filter by user role
    if (userRole === 'student') {
      result = result.filter(r => r.student._id === userId);
    }
    
    if (filters.status) {
      result = result.filter(r => r.status === filters.status);
    }
    
    if (filters.equipmentId) {
      result = result.filter(r => r.equipment._id === filters.equipmentId);
    }
    
    return result;
  },

  async createRequest(requestData, userId) {
    await delay();
    
    const equipment = mockEquipment.find(e => e._id === requestData.equipmentId);
    if (!equipment) {
      throw new Error('Equipment not found');
    }
    
    if (equipment.available < requestData.quantity) {
      throw new Error('Insufficient equipment available');
    }
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const newRequest = {
      _id: (mockRequests.length + 1).toString(),
      student: {
        _id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email
      },
      equipment: {
        _id: equipment._id,
        name: equipment.name,
        category: equipment.category
      },
      quantity: requestData.quantity,
      borrowDate: requestData.borrowDate,
      expectedReturnDate: requestData.expectedReturnDate,
      purpose: requestData.purpose,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    mockRequests.push(newRequest);
    
    // Update equipment availability
    equipment.available -= requestData.quantity;
    
    return newRequest;
  },

  async approveRequest(requestId) {
    await delay();
    
    const request = mockRequests.find(r => r._id === requestId);
    if (!request) {
      throw new Error('Request not found');
    }
    
    request.status = 'Approved';
    request.approvedBy = {
      _id: '2',
      username: 'staff1',
      fullName: 'Staff Member'
    };
    
    return request;
  },

  async rejectRequest(requestId, reason) {
    await delay();
    
    const request = mockRequests.find(r => r._id === requestId);
    if (!request) {
      throw new Error('Request not found');
    }
    
    request.status = 'Rejected';
    request.rejectionReason = reason;
    
    // Restore equipment availability
    const equipment = mockEquipment.find(e => e._id === request.equipment._id);
    if (equipment) {
      equipment.available += request.quantity;
    }
    
    return request;
  }
};

export default mockApiService;