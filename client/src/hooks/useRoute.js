import { useState, useCallback } from 'react';
import { findRoute, compareRoutes } from '../utils/api';

export default function useRoute() {
  const [source, setSource]           = useState(null);
  const [destination, setDestination] = useState(null);
  const [algorithm, setAlgorithm]     = useState('astar');
  const [trafficFactor, setTrafficFactor] = useState(0);
  const [blockedEdges, setBlockedEdges]   = useState([]);
  const [result, setResult]           = useState(null);
  const [compareResult, setCompareResult] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [mode, setMode]               = useState('source'); // 'source' | 'destination' | 'block'

  const runRoute = useCallback(async () => {
    if (!source || !destination) return;
    setLoading(true); setError(null);
    try {
      const data = await findRoute(source.id, destination.id, algorithm, trafficFactor, blockedEdges);
      setResult(data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, [source, destination, algorithm, trafficFactor, blockedEdges]);

  const runCompare = useCallback(async () => {
    if (!source || !destination) return;
    setLoading(true); setError(null);
    try {
      const data = await compareRoutes(source.id, destination.id, trafficFactor, blockedEdges);
      setCompareResult(data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, [source, destination, trafficFactor, blockedEdges]);

  const handleNodeClick = useCallback((node) => {
    if (mode === 'source')      { setSource(node); setMode('destination'); }
    else if (mode === 'destination') { setDestination(node); setMode('select'); }
  }, [mode]);

  const reset = () => {
    setSource(null); setDestination(null);
    setResult(null); setCompareResult(null);
    setError(null); setMode('source');
    setBlockedEdges([]);
  };

  return {
    source, destination, algorithm, setAlgorithm,
    trafficFactor, setTrafficFactor,
    blockedEdges, setBlockedEdges,
    result, compareResult, loading, error, mode, setMode,
    runRoute, runCompare, handleNodeClick, reset
  };
}