const express = require('express');
const router = express.Router();

const dijkstra = require('../algorithms/dijkstra');
const { aStar } = require('../algorithms/astar');
const bellmanFord = require('../algorithms/bellmanFord');
const floydWarshall = require('../algorithms/floydWarshall');

const { getGraphWithAll } = require('../data/graphBuilder');

/**
 * POST /api/route
 * Body: { source, destination, algorithm, trafficFactor, blockedEdges }
 */
router.post('/', (req, res) => {
  try {
    const {
      source,
      destination,
      algorithm = 'dijkstra',
      trafficFactor = 0,
      blockedEdges = []
    } = req.body;

    // ✅ Validation
    if (!source || !destination) {
      return res.status(400).json({ error: 'source and destination are required' });
    }

    const graph = getGraphWithAll(trafficFactor, blockedEdges);

    let result;

    switch (algorithm.toLowerCase()) {
      case 'dijkstra':
        result = dijkstra(graph, source, destination);
        break;

      case 'astar':
        result = aStar(graph, source, destination);
        break;

      case 'bellmanford':
        result = bellmanFord(graph, source, destination);
        break;

      case 'floydwarshall':
        result = floydWarshall(graph, source, destination);
        break;

      default:
        return res.status(400).json({ error: `Unknown algorithm: ${algorithm}` });
    }

    // ✅ Handle no path case
    if (!result || !result.path || result.path.length === 0) {
      return res.status(404).json({ error: 'No path found' });
    }

    // ✅ Enrich path with node data
    const enrichedPath = result.path.map(id => {
      const node = graph.getNode(id);
      return { id, ...node };
    });

    res.json({
      ...result,
      enrichedPath,
      source,
      destination,
      trafficFactor,
      blockedEdges: blockedEdges.length,
      graphStats: {
        nodes: graph.nodeCount,
        edges: graph.edgeCount
      }
    });

  } catch (err) {
    console.error('Route error:', err);
    res.status(500).json({ error: err.message });
  }
});


/**
 * POST /api/route/compare
 * Run all algorithms and compare performance
 */
router.post('/compare', (req, res) => {
  try {
    const {
      source,
      destination,
      trafficFactor = 0,
      blockedEdges = []
    } = req.body;

    // ✅ Validation
    if (!source || !destination) {
      return res.status(400).json({ error: 'source and destination required' });
    }

    const graph = getGraphWithAll(trafficFactor, blockedEdges);

    const results = {
      dijkstra: dijkstra(graph, source, destination),
      astar: aStar(graph, source, destination),
      bellmanford: bellmanFord(graph, source, destination),
      floydwarshall: floydWarshall(graph, source, destination),
    };

    // ✅ Enrich all paths safely
    Object.keys(results).forEach(algo => {
      const resObj = results[algo];

      if (resObj && resObj.path) {
        resObj.enrichedPath = resObj.path.map(id => {
          const node = graph.getNode(id);
          return { id, ...node };
        });
      }
    });

    // ✅ Find fastest safely
    const fastest = Object.entries(results)
      .filter(([_, val]) => val && typeof val.executionTimeMs === 'number')
      .sort((a, b) => a[1].executionTimeMs - b[1].executionTimeMs)[0]?.[0] || null;

    res.json({
      results,
      fastest,
      source,
      destination,
      trafficFactor,
      graphStats: {
        nodes: graph.nodeCount,
        edges: graph.edgeCount
      }
    });

  } catch (err) {
    console.error('Compare error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;