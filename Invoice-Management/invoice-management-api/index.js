const express = require('express');
const invoiceRoutes = require('./routes/invoiceRoutes');
const connectDB = require('./db');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

connectDB();

// Routes
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
