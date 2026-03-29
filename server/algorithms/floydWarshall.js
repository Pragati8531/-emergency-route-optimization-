/**
 * Floyd-Warshall Algorithm
 * Time Complexity: O(V³)
 * Space Complexity: O(V²)
 * Computes ALL-PAIRS shortest paths in one run
 * Best for: pre-computing emergency corridor matrix between all hospitals/stations
 * Not suitable for real-time single-query routing on large graphs
 */
function floydWarshall(graph, sourceId, destId) {
  const startTime = performance.now();
  sourceId = String(sourceId);
  destId = String(destId);

  const nodeIds = [...graph.nodes.keys()];
  const n = nodeIds.length;
  const idx = new Map(nodeIds.map((id, i) => [id, i]));

  // Initialize distance matrix
  const dist = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity))
  );
  const next = Array.from({ length: n }, () => Array(n).fill(null));

  // Fill from graph edges
  graph.adjacency.forEach((edges, from) => {
    const fi = idx.get(from);
    for (const edge of edges) {
      if (edge.weight === Infinity) continue;
      const ti = idx.get(edge.to);
      if (fi !== undefined && ti !== undefined && edge.weight < dist[fi][ti]) {
        dist[fi][ti] = edge.weight;
        next[fi][ti] = edge.to;
      }
    }
  });

  // Floyd-Warshall relaxation: V³ iterations
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  const endTime = performance.now();

  // Reconstruct path for source -> dest
  const si = idx.get(sourceId);
  const di = idx.get(destId);
  const path = [];

  if (si !== undefined && di !== undefined && dist[si][di] < Infinity) {
    let cur = sourceId;
    path.push(cur);
    while (cur !== destId) {
      const ci = idx.get(cur);
      cur = next[ci][di];
      if (!cur) break;
      path.push(cur);
    }
  }

  // Build a summary matrix for top 5x5 nodes (for dashboard display)
  const matrixPreview = nodeIds.slice(0, 5).map((fromId, i) =>
    nodeIds.slice(0, 5).map((toId, j) =>
      dist[i][j] === Infinity ? '∞' : dist[i][j].toFixed(2)
    )
  );

  return {
    algorithm: 'Floyd-Warshall',
    complexity: { time: 'O(V³)', space: 'O(V²)' },
    path,
    cost: si !== undefined && di !== undefined && dist[si][di] < Infinity
      ? dist[si][di] : null,
    nodesVisited: n,
    nodesExplored: nodeIds,
    executionTimeMs: parseFloat((endTime - startTime).toFixed(3)),
    found: path.length > 1,
    allPairsComputed: true,
    matrixSize: `${n}×${n}`,
    matrixPreview,
    matrixLabels: nodeIds.slice(0, 5),
    note: 'Pre-computes entire distance matrix — ideal for emergency corridor planning'
  };
}

module.exports = floydWarshall;