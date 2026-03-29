/**
 * Graph - Weighted Directed Graph using Adjacency List
 * Represents urban road network: nodes = intersections, edges = road segments
 */
class Graph {
  constructor() {
    this.nodes = new Map(); // nodeId -> { lat, lng, name }
    this.adjacency = new Map(); // nodeId -> [{ to, weight, roadType, distance }]
    this.edgeCount = 0;
  }

  addNode(id, data) {
    this.nodes.set(String(id), { id: String(id), ...data });
    if (!this.adjacency.has(String(id))) {
      this.adjacency.set(String(id), []);
    }
  }

  addEdge(from, to, weight, meta = {}) {
    from = String(from);
    to = String(to);
    if (!this.adjacency.has(from)) this.adjacency.set(from, []);
    this.adjacency.get(from).push({ to, weight, ...meta });
    this.edgeCount++;
  }

  getNeighbors(nodeId) {
    return this.adjacency.get(String(nodeId)) || [];
  }

  getNode(nodeId) {
    return this.nodes.get(String(nodeId));
  }

  // Apply traffic multiplier to all edges dynamically
  applyTrafficFactor(factor) {
    const modified = new Graph();
    this.nodes.forEach((data, id) => modified.addNode(id, data));
    this.adjacency.forEach((edges, from) => {
      edges.forEach(edge => {
        const newWeight = edge.roadType === 'highway'
          ? edge.weight * (1 + factor * 0.3)  // highways affected less
          : edge.weight * (1 + factor);
        modified.addEdge(from, edge.to, newWeight, {
          roadType: edge.roadType,
          distance: edge.distance,
          originalWeight: edge.weight
        });
      });
    });
    return modified;
  }

  // Block a specific edge (simulate road closure / incident)
  blockEdge(from, to) {
    from = String(from); to = String(to);
    const edges = this.adjacency.get(from) || [];
    this.adjacency.set(from, edges.map(e =>
      e.to === to ? { ...e, weight: Infinity, blocked: true } : e
    ));
  }

  get nodeCount() { return this.nodes.size; }

  toJSON() {
    const nodes = [];
    const edges = [];
    this.nodes.forEach((data, id) => nodes.push({ id, ...data }));
    this.adjacency.forEach((adj, from) => {
      adj.forEach(e => edges.push({ from, ...e }));
    });
    return { nodes, edges, nodeCount: nodes.length, edgeCount: edges.length };
  }
}

module.exports = Graph;