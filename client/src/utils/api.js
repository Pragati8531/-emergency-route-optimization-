import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const getGraphNodes = () => API.get('/graph/nodes').then(r => r.data);
export const getFullGraph  = () => API.get('/graph').then(r => r.data);

export const findRoute = (source, destination, algorithm, trafficFactor = 0, blockedEdges = []) =>
  API.post('/route', { source, destination, algorithm, trafficFactor, blockedEdges }).then(r => r.data);

export const compareRoutes = (source, destination, trafficFactor = 0, blockedEdges = []) =>
  API.post('/route/compare', { source, destination, trafficFactor, blockedEdges }).then(r => r.data);

export const getBenchmarks = () => API.get('/benchmark').then(r => r.data);