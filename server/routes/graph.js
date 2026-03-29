const express = require('express');
const router = express.Router();
const { getBaseGraph, getGraphWithAll } = require('../data/graphBuilder');
const dehradunData = require('../data/dehradunGraph');

// GET /api/graph — return full graph for map rendering
router.get('/', (req, res) => {
  const graph = getBaseGraph();
  res.json(graph.toJSON());
});

// GET /api/graph/nodes — just nodes list
router.get('/nodes', (req, res) => {
  res.json(dehradunData.nodes);
});

// POST /api/graph/dynamic — graph with traffic applied
router.post('/dynamic', (req, res) => {
  const { trafficFactor = 0, blockedEdges = [] } = req.body;
  const graph = getGraphWithAll(trafficFactor, blockedEdges);
  res.json(graph.toJSON());
});

module.exports = router;