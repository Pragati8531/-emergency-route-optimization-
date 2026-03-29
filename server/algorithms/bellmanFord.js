/**
 * Bellman-Ford Algorithm
 * Time Complexity: O(V * E)
 * Space Complexity: O(V)
 * Advantage over Dijkstra: handles negative edge weights
 * Used when road "bonus" weights (cleared accidents, priority lanes) are negative
 * Also detects negative weight cycles
 */
function bellmanFord(graph, sourceId, destId) {
  const startTime = performance.now();
  sourceId = String(sourceId);
  destId = String(destId);

  const dist = new Map();
  const prev = new Map();
  const nodesVisited = new Set();

  graph.nodes.forEach((_, id) => dist.set(id, Infinity));
  dist.set(sourceId, 0);

  const V = graph.nodeCount;
  let relaxations = 0;

  // Relax all edges V-1 times
  for (let i = 0; i < V - 1; i++) {
    let updated = false;
    graph.adjacency.forEach((edges, from) => {
      if (dist.get(from) === Infinity) return;
      for (const edge of edges) {
        if (edge.weight === Infinity) continue;
        nodesVisited.add(from);
        relaxations++;
        const newDist = dist.get(from) + edge.weight;
        if (newDist < dist.get(edge.to)) {
          dist.set(edge.to, newDist);
          prev.set(edge.to, from);
          updated = true;
        }
      }
    });
    if (!updated) break; // Early termination if no update
  }

  // Detect negative weight cycles
  let hasNegativeCycle = false;
  graph.adjacency.forEach((edges, from) => {
    for (const edge of edges) {
      if (edge.weight === Infinity) continue;
      if (dist.get(from) + edge.weight < dist.get(edge.to)) {
        hasNegativeCycle = true;
      }
    }
  });

  const endTime = performance.now();
  const path = reconstructPath(prev, sourceId, destId);

  return {
    algorithm: 'Bellman-Ford',
    complexity: { time: 'O(V × E)', space: 'O(V)' },
    path,
    cost: dist.get(destId) === Infinity ? null : dist.get(destId),
    nodesVisited: nodesVisited.size,
    nodesExplored: [...nodesVisited],
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    found: path.length > 0,
    hasNegativeCycle,
    relaxations,
    note: 'Supports negative weights — useful for emergency priority lane bonuses'
  };
}

function reconstructPath(prev, source, dest) {
  const path = [];
  let current = dest;
  const seen = new Set();
  while (current && current !== source) {
    if (seen.has(current)) return []; // cycle guard
    seen.add(current);
    path.unshift(current);
    current = prev.get(current);
  }
  if (current === source) path.unshift(source);
  return path.length > 1 ? path : [];
}

module.exports = bellmanFord;