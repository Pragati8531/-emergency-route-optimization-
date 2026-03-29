import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { getBenchmarks } from '../utils/api';

const COLORS = {
  dijkstra: '#3D5AFE', astar: '#00E676', bellmanford: '#FF6F00', floydwarshall: '#AA00FF'
};

const s = {
  page: {
    height: '100%', overflowY: 'auto', padding: 20,
    background: 'var(--bg)', color: 'var(--text)',
  },
  header: { marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  subtitle: { fontSize: 13, color: 'var(--text2)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  card: {
    background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 12, padding: 18,
  },
  cardTitle: { fontSize: 12, fontWeight: 600, color: 'var(--text2)', marginBottom: 14, letterSpacing: '0.05em' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12 },
  th: {
    padding: '7px 10px', textAlign: 'left',
    color: 'var(--text3)', fontWeight: 600, fontSize: 10,
    borderBottom: '1px solid var(--border)', letterSpacing: '0.06em',
  },
  td: { padding: '8px 10px', borderBottom: '1px solid var(--border)', fontFamily: 'var(--mono)', fontSize: 12 },
};

const customTooltipStyle = {
  background: '#12151C', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif',
};

const COMPLEXITY_TABLE = [
  { algo: 'Dijkstra\'s', time: 'O((V+E) log V)', space: 'O(V)', negative: '✗', allPairs: '✗', realtime: '✓' },
  { algo: 'A*',          time: 'O(E log V)',     space: 'O(V)', negative: '✗', allPairs: '✗', realtime: '✓✓' },
  { algo: 'Bellman-Ford',time: 'O(V·E)',          space: 'O(V)', negative: '✓', allPairs: '✗', realtime: '⚠' },
  { algo: 'Floyd-Warshall',time: 'O(V³)',         space: 'O(V²)',negative: '✓', allPairs: '✓', realtime: '✗' },
];

export default function BenchmarkPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBenchmarks()
      .then(d => { setData(d.benchmarks); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const chartData = data?.map(b => ({
    nodes: b.nodeCount,
    Dijkstra: b.dijkstra.ms,
    'A*': b.astar.ms,
    'Bellman-Ford': b.bellmanford.ms,
    'Floyd-Warshall': b.floydwarshall.ms,
  }));

  const nodesVisitedData = data?.map(b => ({
    nodes: b.nodeCount,
    Dijkstra: b.dijkstra.nodes,
    'A*': b.astar.nodes,
    'Bellman-Ford': b.bellmanford.nodes,
  }));

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ fontSize: 11, color: '#FF5252', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Design & Analysis of Algorithms
        </div>
        <div style={s.title}>Complexity Analysis & Benchmarks</div>
        <div style={s.subtitle}>
          Empirical execution time vs theoretical complexity — graph sizes 25 to 225 nodes
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>
          ⏳ Running benchmarks on server...
        </div>
      )}

      {data && (
        <>
          <div style={s.grid}>
            {/* Execution time chart */}
            <div style={s.card}>
              <div style={s.cardTitle}>EXECUTION TIME vs GRAPH SIZE (ms)</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="nodes" stroke="#5A6278" tick={{ fontSize: 11, fill: '#5A6278' }} label={{ value: 'Nodes (V)', position: 'insideBottom', offset: -2, fill: '#5A6278', fontSize: 11 }} />
                  <YAxis stroke="#5A6278" tick={{ fontSize: 11, fill: '#5A6278' }} />
                  <Tooltip contentStyle={customTooltipStyle} labelStyle={{ color: '#9BA3B8' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {Object.entries(COLORS).map(([key, color]) => (
                    <Line key={key} type="monotone" dataKey={key === 'dijkstra' ? 'Dijkstra' : key === 'astar' ? 'A*' : key === 'bellmanford' ? 'Bellman-Ford' : 'Floyd-Warshall'}
                      stroke={color} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Nodes visited chart */}
            <div style={s.card}>
              <div style={s.cardTitle}>NODES EXPLORED vs GRAPH SIZE</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={nodesVisitedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="nodes" stroke="#5A6278" tick={{ fontSize: 11, fill: '#5A6278' }} />
                  <YAxis stroke="#5A6278" tick={{ fontSize: 11, fill: '#5A6278' }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Dijkstra" fill={COLORS.dijkstra} radius={[3,3,0,0]} />
                  <Bar dataKey="A*" fill={COLORS.astar} radius={[3,3,0,0]} />
                  <Bar dataKey="Bellman-Ford" fill={COLORS.bellmanford} radius={[3,3,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Raw benchmark data */}
          <div style={{ ...s.card, marginBottom: 16 }}>
            <div style={s.cardTitle}>RAW BENCHMARK DATA</div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>V (nodes)</th><th style={s.th}>E (edges)</th>
                  <th style={{ ...s.th, color: '#3D5AFE' }}>Dijkstra (ms)</th>
                  <th style={{ ...s.th, color: '#00E676' }}>A* (ms)</th>
                  <th style={{ ...s.th, color: '#FF6F00' }}>Bellman-Ford (ms)</th>
                  <th style={{ ...s.th, color: '#AA00FF' }}>Floyd-Warshall (ms)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    <td style={s.td}>{row.nodeCount}</td>
                    <td style={s.td}>{row.edgeCount}</td>
                    <td style={{ ...s.td, color: '#3D5AFE' }}>{row.dijkstra.ms?.toFixed(3)}</td>
                    <td style={{ ...s.td, color: '#00E676' }}>{row.astar.ms?.toFixed(3)}</td>
                    <td style={{ ...s.td, color: '#FF6F00' }}>{row.bellmanford.ms?.toFixed(3)}</td>
                    <td style={{ ...s.td, color: '#AA00FF' }}>{row.floydwarshall.ms != null ? row.floydwarshall.ms.toFixed(3) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Complexity table */}
          <div style={s.card}>
            <div style={s.cardTitle}>THEORETICAL COMPLEXITY COMPARISON</div>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Algorithm</th>
                  <th style={s.th}>Time Complexity</th>
                  <th style={s.th}>Space Complexity</th>
                  <th style={s.th}>Negative Weights</th>
                  <th style={s.th}>All-Pairs</th>
                  <th style={s.th}>Real-Time Use</th>
                </tr>
              </thead>
              <tbody>
                {COMPLEXITY_TABLE.map((row, i) => (
                  <tr key={i}>
                    <td style={{ ...s.td, fontWeight: 600, fontFamily: 'var(--font)', color: Object.values(COLORS)[i] }}>{row.algo}</td>
                    <td style={s.td}>{row.time}</td>
                    <td style={s.td}>{row.space}</td>
                    <td style={{ ...s.td, color: row.negative === '✓' ? '#69F0AE' : '#FF5252' }}>{row.negative}</td>
                    <td style={{ ...s.td, color: row.allPairs === '✓' ? '#69F0AE' : '#FF5252' }}>{row.allPairs}</td>
                    <td style={{ ...s.td, color: row.realtime.includes('✓') ? '#69F0AE' : row.realtime === '⚠' ? '#FF6F00' : '#FF5252' }}>{row.realtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}