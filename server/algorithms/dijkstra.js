const PriorityQueue = require('../PriorityQueue');

/**
 * Dijkstra's Shortest Path Algorithm
 * Time Complexity: O((V + E) log V) with priority queue
 * Space Complexity: O(V)
 * Guarantees optimal path for non-negative weights
 */
function dijkstra(graph, sourceId, destId) {
  const startTime = performance.now();
  sourceId = String(sourceId);
  destId = String(destId);

  const dist = new Map();
  const prev = new Map();
  const visited = new Set();
  const pq = new PriorityQueue();
  const nodesVisited = [];
  const frontier = []; // for visualization

  // Initialize
  graph.nodes.forEach((_, id) => dist.set(id, Infinity));
  dist.set(sourceId, 0);
  pq.enqueue(sourceId, 0);

  while (!pq.isEmpty()) {
    const { item: current } = pq.dequeue();

    if (visited.has(current)) continue;
    visited.add(current);
    nodesVisited.push(current);

    if (current === destId) break;

    const neighbors = graph.getNeighbors(current);
    for (const edge of neighbors) {
      if (edge.weight === Infinity) continue; // blocked road
      const newDist = dist.get(current) + edge.weight;
      if (newDist < dist.get(edge.to)) {
        dist.set(edge.to, newDist);
        prev.set(edge.to, current);
        pq.enqueue(edge.to, newDist);
        frontier.push(edge.to);
      }
    }
  }

  const endTime = performance.now();
  const path = reconstructPath(prev, sourceId, destId);

  return {
    algorithm: 'Dijkstra',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    path,
    cost: dist.get(destId) === Infinity ? null : dist.get(destId),
    nodesVisited: visited.size,
    nodesExplored: nodesVisited,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    found: path.length > 0,
    frontier
  };
}

function reconstructPath(prev, source, dest) {
  const path = [];
  let current = dest;
  while (current && current !== source) {
    path.unshift(current);
    current = prev.get(current);
  }
  if (current === source) path.unshift(source);
  return path.length > 1 ? path : [];
}

module.exports = dijkstra;