const express = require('express');
const cors = require('cors');

const routeRouter = require('./routes/route');
const graphRouter = require('./routes/graph');
const benchmarkRouter = require('./routes/benchmark');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/route', routeRouter);
app.use('/api/graph', graphRouter);
app.use('/api/benchmark', benchmarkRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Emergency Route Optimizer API running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;