import React, { useEffect, useState } from 'react';
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';
import ResultPanel from './components/ResultPanel';
import BenchmarkPage from './components/BenchmarkPage';
import useRoute from './hooks/useRoute';
import { getFullGraph } from './utils/api';

const NAV_ITEMS = [
  { id: 'map',       label: '🗺 Route Map' },
  { id: 'benchmark', label: '📊 Benchmarks' },
];

export default function App() {
  const [activePage, setActivePage] = useState('map');
  const [graphData, setGraphData]   = useState(null);

  const {
    source, destination, algorithm, setAlgorithm,
    trafficFactor, setTrafficFactor,
    blockedEdges, result, compareResult,
    loading, error, mode, setMode,
    runRoute, runCompare, handleNodeClick, reset
  } = useRoute();

  useEffect(() => {
    getFullGraph().then(setGraphData).catch(console.error);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top navbar */}
      <nav style={{
        height: 48, background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 0, flexShrink: 0,
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--red)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 14,
          }}>🚑</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1 }}>EmergRoute</div>
            <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.4 }}>Dehradun Graph Optimizer</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{
              padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500,
              background: activePage === item.id ? 'var(--bg4)' : 'transparent',
              border: activePage === item.id ? '1px solid var(--border2)' : '1px solid transparent',
              color: activePage === item.id ? 'var(--text)' : 'var(--text3)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
          {graphData ? `${graphData.nodeCount}V · ${graphData.edgeCount}E` : 'Loading graph...'}
        </div>
      </nav>

      {/* Main content */}
      {activePage === 'benchmark' ? (
        <BenchmarkPage />
      ) : (
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr 280px', overflow: 'hidden' }}>
          {/* Left: Control panel */}
          <div style={{
            background: 'var(--bg2)', borderRight: '1px solid var(--border)',
            overflowY: 'auto',
          }}>
            <ControlPanel
              source={source} destination={destination}
              algorithm={algorithm} setAlgorithm={setAlgorithm}
              trafficFactor={trafficFactor} setTrafficFactor={setTrafficFactor}
              loading={loading} onRun={runRoute} onCompare={runCompare}
              onReset={reset} mode={mode} setMode={setMode}
            />
          </div>

          {/* Center: Map */}
          <div style={{ position: 'relative' }}>
            {graphData ? (
              <MapView
                nodes={graphData.nodes}
                edges={graphData.edges}
                result={result}
                compareResult={compareResult}
                source={source}
                destination={destination}
                onNodeClick={handleNodeClick}
                mode={mode}
                blockedEdges={blockedEdges}
              />
            ) : (
              <div style={{
                height: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--text3)', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  width: 32, height: 32, border: '3px solid var(--red)',
                  borderTopColor: 'transparent', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ fontSize: 13 }}>Loading road network...</span>
              </div>
            )}

            {/* Error toast */}
            {error && (
              <div style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                background: '#B71C1C', color: '#fff', padding: '8px 16px',
                borderRadius: 8, fontSize: 12, zIndex: 2000,
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}>
                ⚠ {error}
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div style={{
            background: 'var(--bg2)', borderLeft: '1px solid var(--border)',
            overflowY: 'auto',
          }}>
            <ResultPanel result={result} compareResult={compareResult} />
          </div>
        </div>
      )}
    </div>
  );
}
