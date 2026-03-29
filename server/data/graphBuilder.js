const Graph = require('../algorithms/Graph');
const dehradunData = require('../data/dehradunGraph');

let cachedGraph = null;

function buildGraph(data = dehradunData) {
  const graph = new Graph();
  data.nodes.forEach(n => graph.addNode(n.id, { lat: n.lat, lng: n.lng, name: n.name }));
  data.edges.forEach(([from, to, weight, roadType, distance]) => {
    graph.addEdge(from, to, weight, { roadType, distance });
  });
  return graph;
}

function getBaseGraph() {
  if (!cachedGraph) cachedGraph = buildGraph();
  return cachedGraph;
}

function getGraphWithTraffic(trafficFactor = 0) {
  // trafficFactor: 0 = no traffic, 1 = max congestion
  const base = getBaseGraph();
  return trafficFactor > 0 ? base.applyTrafficFactor(trafficFactor) : base;
}

function getGraphWithBlockedEdges(blockedEdges = []) {
  const base = buildGraph(); // fresh copy
  blockedEdges.forEach(({ from, to }) => base.blockEdge(from, to));
  return base;
}

function getGraphWithAll(trafficFactor = 0, blockedEdges = []) {
  const graph = buildGraph();
  blockedEdges.forEach(({ from, to }) => graph.blockEdge(from, to));
  return trafficFactor > 0 ? graph.applyTrafficFactor(trafficFactor) : graph;
}

module.exports = { buildGraph, getBaseGraph, getGraphWithTraffic, getGraphWithBlockedEdges, getGraphWithAll };