const express = require('express');
const router = express.Router();
const Graph = require('../algorithms/Graph');
const dijkstra = require('../algorithms/dijkstra');
const { aStar } = require('../algorithms/astar');
const bellmanFord = require('../algorithms/bellmanFord');
const floydWarshall = require('../algorithms/floydWarshall');

// Generate a random grid graph of given size for benchmarking
function generateGridGraph(size) {
  const graph = new Graph();
  const spacing = 0.01; // ~1km between nodes
  const baseLat = 30.30, baseLng = 78.00;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const id = String(r * size + c);
      graph.addNode(id, {
        lat: baseLat + r * spacing,
        lng: baseLng + c * spacing,
        name: `Node(${r},${c})`
      });
    }
  }
  // Connect grid edges
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const id = String(r * size + c);
      if (c + 1 < size) {
        const right = String(r * size + c + 1);
        const w = 1 + Math.random() * 5;
        graph.addEdge(id, right, w, { roadType: 'main', distance: 1 });
        graph.addEdge(right, id, w, { roadType: 'main', distance: 1 });
      }
      if (r + 1 < size) {
        const down = String((r + 1) * size + c);
        const w = 1 + Math.random() * 5;
        graph.addEdge(id, down, w, { roadType: 'main', distance: 1 });
        graph.addEdge(down, id, w, { roadType: 'main', distance: 1 });
      }
    }
  }
  return graph;
}

/**
 * GET /api/benchmark
 * Runs all algorithms on graph sizes [5,8,10,12,15] (grid NxN)
 * Returns time complexity data for charts
 */
router.get('/', (req, res) => {
  const sizes = [5, 8, 10, 12, 15];
  const results = [];

  for (const size of sizes) {
    const graph = generateGridGraph(size);
    const source = '0';
    const dest = String(size * size - 1);
    const nodeCount = graph.nodeCount;
    const edgeCount = graph.edgeCount;

    const d = dijkstra(graph, source, dest);
    const a = aStar(graph, source, dest);
    const b = bellmanFord(graph, source, dest);
    // Only run Floyd-Warshall on small graphs (O(V³) is expensive)
    const fw = size <= 10 ? floydWarshall(graph, source, dest) : {
      executionTimeMs: null, nodesVisited: nodeCount, note: 'Skipped — graph too large'
    };

    results.push({
      size,
      nodeCount,
      edgeCount,
      dijkstra:      { ms: d.ms || d.executionTimeMs,  nodes: d.nodesVisited },
      astar:         { ms: a.ms || a.executionTimeMs,  nodes: a.nodesVisited },
      bellmanford:   { ms: b.ms || b.executionTimeMs,  nodes: b.nodesVisited },
      floydwarshall: { ms: fw.executionTimeMs,         nodes: fw.nodesVisited },
    });
  }

  res.json({ benchmarks: results, timestamp: new Date().toISOString() });
});

module.exports = router;