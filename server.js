const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/borrow', require('./routes/borrow'));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

