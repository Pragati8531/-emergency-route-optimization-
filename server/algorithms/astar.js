const PriorityQueue = require('../PriorityQueue');

/**
 * A* Search Algorithm with Haversine Heuristic
 * Time Complexity: O(E log V) in practice, O(b^d) worst case
 * Space Complexity: O(V)
 * Optimal and complete — much faster than Dijkstra for geographic routing
 * because the haversine heuristic guides search toward destination
 */

// Haversine formula: straight-line distance between two lat/lng points in km
function haversine(nodeA, nodeB) {
  if (!nodeA || !nodeB) return 0;
  const R = 6371; // Earth radius in km
  const dLat = toRad(nodeB.lat - nodeA.lat);
  const dLng = toRad(nodeB.lng - nodeA.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(nodeA.lat)) * Math.cos(toRad(nodeB.lat)) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) { return deg * Math.PI / 180; }

function aStar(graph, sourceId, destId) {
  const startTime = performance.now();
  sourceId = String(sourceId);
  destId = String(destId);

  const destNode = graph.getNode(destId);

  const gScore = new Map(); // actual cost from source
  const fScore = new Map(); // gScore + heuristic
  const prev = new Map();
  const visited = new Set();
  const pq = new PriorityQueue();
  const nodesVisited = [];

  graph.nodes.forEach((_, id) => {
    gScore.set(id, Infinity);
    fScore.set(id, Infinity);
  });

  gScore.set(sourceId, 0);
  fScore.set(sourceId, haversine(graph.getNode(sourceId), destNode));
  pq.enqueue(sourceId, fScore.get(sourceId));

  while (!pq.isEmpty()) {
    const { item: current } = pq.dequeue();

    if (visited.has(current)) continue;
    visited.add(current);
    nodesVisited.push(current);

    if (current === destId) break;

    for (const edge of graph.getNeighbors(current)) {
      if (edge.weight === Infinity) continue;
      const tentativeG = gScore.get(current) + edge.weight;

      if (tentativeG < gScore.get(edge.to)) {
        prev.set(edge.to, current);
        gScore.set(edge.to, tentativeG);
        const h = haversine(graph.getNode(edge.to), destNode);
        fScore.set(edge.to, tentativeG + h);
        pq.enqueue(edge.to, fScore.get(edge.to));
      }
    }
  }

  const endTime = performance.now();
  const path = reconstructPath(prev, sourceId, destId);

  return {
    algorithm: 'A*',
    complexity: { time: 'O(E log V)', space: 'O(V)' },
    path,
    cost: gScore.get(destId) === Infinity ? null : gScore.get(destId),
    nodesVisited: visited.size,
    nodesExplored: nodesVisited,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    found: path.length > 0,
    heuristic: 'Haversine (geographic straight-line distance)'
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

module.exports = { aStar, haversine };