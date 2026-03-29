import React from 'react';

const s = {
  panel: {
    padding: '14px', overflowY: 'auto', height: '100%',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  card: {
    background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '12px 14px',
  },
  title: {
    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
    color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10,
  },
  statRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8,
  },
  stat: (accent) => ({
    background: 'var(--bg4)', borderRadius: 8,
    border: `1px solid ${accent ? accent + '30' : 'var(--border)'}`,
    padding: '8px 10px',
  }),
  statLabel: { fontSize: 10, color: 'var(--text3)', marginBottom: 2 },
  statVal: (accent) => ({
    fontSize: 20, fontWeight: 700, fontFamily: 'var(--mono)',
    color: accent || 'var(--text)',
  }),
  tag: { fontSize: 11, color: 'var(--text2)', fontFamily: 'var(--mono)' },
  badge: (color) => ({
    display: 'inline-block', padding: '2px 7px',
    background: color + '25', border: `1px solid ${color}60`,
    color: color, borderRadius: 5, fontSize: 11, fontWeight: 600,
  }),
  pathNode: {
    display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
    borderBottom: '1px solid var(--border)',
  },
  compareRow: (winner) => ({
    display: 'grid', gridTemplateColumns: '110px 1fr 70px 70px',
    gap: 6, padding: '6px 8px', borderRadius: 6,
    background: winner ? 'rgba(46,125,50,0.1)' : 'transparent',
    border: winner ? '1px solid rgba(46,125,50,0.3)' : '1px solid transparent',
    marginBottom: 4, alignItems: 'center',
  }),
  barBg: {
    height: 6, background: 'var(--bg4)', borderRadius: 3, overflow: 'hidden',
  },
  bar: (pct, color) => ({
    height: '100%', width: `${pct}%`, background: color,
    borderRadius: 3, transition: 'width 0.6s ease',
  }),
};

const ALGO_COLORS = {
  dijkstra: '#3D5AFE', astar: '#00E676', bellmanford: '#FF6F00', floydwarshall: '#AA00FF'
};

function StatCard({ label, value, unit, accent }) {
  return (
    <div style={s.stat(accent)}>
      <div style={s.statLabel}>{label}</div>
      <div style={s.statVal(accent)}>
        {value}<span style={{ fontSize: 12, fontWeight: 400, marginLeft: 3 }}>{unit}</span>
      </div>
    </div>
  );
}

function SingleResult({ data }) {
  if (!data) return null;
  const { algorithm, cost, nodesVisited, executionTimeMs, enrichedPath, found, complexity } = data;

  return (
    <div style={s.card}>
      <div style={s.title}>Route Result</div>
      {!found
        ? <div style={{ color: '#FF5252', fontSize: 13 }}>No path found between selected nodes.</div>
        : <>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={s.badge('#3D5AFE')}>{algorithm}</span>
            <span style={{ ...s.tag, alignSelf: 'center' }}>{complexity?.time}</span>
          </div>
          <div style={s.statRow}>
            <StatCard label="Travel Time" value={cost?.toFixed(1)} unit="min" accent="#FF6F00" />
            <StatCard label="Nodes Visited" value={nodesVisited} accent="#3D5AFE" />
            <StatCard label="Execution" value={executionTimeMs?.toFixed(2)} unit="ms" />
            <StatCard label="Path Length" value={enrichedPath?.length} unit="nodes" />
          </div>

          {/* Path visualization */}
          <div style={s.title}>Path Nodes</div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {enrichedPath?.map((node, i) => (
              <div key={node.id} style={s.pathNode}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? '#00E676' : i === enrichedPath.length - 1 ? '#FF1744' : 'var(--bg4)',
                  border: '1.5px solid var(--border2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--text2)',
                }}>
                  {i === 0 ? '▶' : i === enrichedPath.length - 1 ? '★' : i}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{node.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                    {node.lat?.toFixed(4)}, {node.lng?.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}

function CompareResult({ data }) {
  if (!data) return null;
  const { results, fastest } = data;
  const entries = Object.entries(results);
  const maxMs = Math.max(...entries.map(([, r]) => r.executionTimeMs || 0));

  return (
    <div style={s.card}>
      <div style={s.title}>Algorithm Comparison</div>
      <div style={{ marginBottom: 12, padding: '6px 10px', background: 'rgba(46,125,50,0.1)', border: '1px solid rgba(46,125,50,0.3)', borderRadius: 7 }}>
        <span style={{ fontSize: 12, color: '#69F0AE' }}>
          🏆 Fastest: <strong>{results[fastest]?.algorithm}</strong> — {results[fastest]?.executionTimeMs?.toFixed(2)}ms
        </span>
      </div>

      {/* Header */}
      <div style={{ ...s.compareRow(false), background: 'transparent', border: 'none', marginBottom: 2 }}>
        <span style={s.statLabel}>Algorithm</span>
        <span style={s.statLabel}>Time (ms)</span>
        <span style={s.statLabel}>Nodes</span>
        <span style={s.statLabel}>Cost</span>
      </div>

      {entries.map(([key, r]) => {
        const pct = maxMs > 0 ? ((r.executionTimeMs || 0) / maxMs) * 100 : 0;
        const color = ALGO_COLORS[key] || '#888';
        const isWinner = key === fastest;
        return (
          <div key={key} style={s.compareRow(isWinner)}>
            <div>
              <div style={{ fontSize: 12, fontWeight: isWinner ? 600 : 400, color: isWinner ? '#69F0AE' : 'var(--text)' }}>
                {r.algorithm}
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, ...s.barBg }}>
                  <div style={s.bar(pct, color)} />
                </div>
                <span style={{ ...s.tag, minWidth: 40, textAlign: 'right' }}>
                  {r.executionTimeMs != null ? r.executionTimeMs.toFixed(2) : '—'}
                </span>
              </div>
            </div>
            <span style={s.tag}>{r.nodesVisited}</span>
            <span style={s.tag}>{r.cost != null ? r.cost.toFixed(1) : '∞'}</span>
          </div>
        );
      })}

      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text3)', lineHeight: 1.6 }}>
        A* uses haversine heuristic to guide search toward destination, drastically reducing nodes explored vs Dijkstra's exhaustive scan.
      </div>
    </div>
  );
}

export default function ResultPanel({ result, compareResult }) {
  if (!result && !compareResult) {
    return (
      <div style={{ ...s.panel, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text3)' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
          <div style={{ fontSize: 13 }}>Select source & destination on the map,<br />then run an algorithm</div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.panel}>
      {result && !compareResult && <SingleResult data={result} />}
      {compareResult && <CompareResult data={compareResult} />}
    </div>
  );
}