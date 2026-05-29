// import React from 'react';

// const ALGORITHMS = [
//   { id: 'astar',         label: 'A*',            complexity: 'O(E log V)',  badge: 'FASTEST' },
//   { id: 'dijkstra',      label: "Dijkstra's",    complexity: 'O((V+E)logV)', badge: '' },
//   { id: 'bellmanford',   label: 'Bellman-Ford',  complexity: 'O(V·E)',      badge: '' },
//   { id: 'floydwarshall', label: 'Floyd-Warshall',complexity: 'O(V³)',       badge: 'ALL-PAIRS' },
// ];

// const s = {
//   panel: {
//     display: 'flex', flexDirection: 'column', gap: 12,
//     padding: '16px', height: '100%', overflowY: 'auto',
//   },
//   section: {
//     background: 'var(--bg3)', borderRadius: 'var(--radius)',
//     border: '1px solid var(--border)', padding: '12px 14px',
//   },
//   sectionTitle: {
//     fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
//     color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 10,
//   },
//   algoBtn: (active) => ({
//     width: '100%', padding: '8px 10px',
//     background: active ? 'rgba(229,57,53,0.15)' : 'var(--bg4)',
//     border: active ? '1px solid rgba(229,57,53,0.5)' : '1px solid var(--border)',
//     borderRadius: 8, color: active ? '#FF5252' : 'var(--text2)',
//     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//     cursor: 'pointer', transition: 'all 0.15s', marginBottom: 6,
//     fontFamily: 'var(--font)', fontSize: 13,
//   }),
//   badge: (text) => ({
//     fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
//     background: text === 'FASTEST' ? 'rgba(46,125,50,0.3)' : 'rgba(21,101,192,0.3)',
//     color: text === 'FASTEST' ? '#69F0AE' : '#82B1FF',
//     border: `1px solid ${text === 'FASTEST' ? 'rgba(46,125,50,0.5)' : 'rgba(21,101,192,0.5)'}`,
//     borderRadius: 4, padding: '2px 5px',
//   }),
//   mono: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' },
//   runBtn: (disabled) => ({
//     width: '100%', padding: '10px 0',
//     background: disabled ? 'var(--bg4)' : 'var(--red)',
//     color: disabled ? 'var(--text3)' : '#fff',
//     borderRadius: 8, fontWeight: 600, fontSize: 14,
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     transition: 'all 0.15s', border: 'none',
//   }),
//   compareBtn: (disabled) => ({
//     width: '100%', padding: '9px 0',
//     background: 'transparent',
//     color: disabled ? 'var(--text3)' : 'var(--text2)',
//     borderRadius: 8, fontWeight: 500, fontSize: 13,
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     border: `1px solid ${disabled ? 'var(--border)' : 'var(--border2)'}`,
//     transition: 'all 0.15s',
//   }),
//   slider: {
//     width: '100%', accentColor: 'var(--red)',
//     appearance: 'none', height: 4, borderRadius: 2,
//     background: 'var(--bg4)', cursor: 'pointer',
//   },
//   nodeTag: (color) => ({
//     display: 'inline-flex', alignItems: 'center', gap: 6,
//     background: 'var(--bg4)', border: '1px solid var(--border)',
//     borderRadius: 6, padding: '5px 8px', fontSize: 12,
//     color: 'var(--text)', minWidth: 0, overflow: 'hidden',
//   }),
//   dot: (color) => ({
//     width: 8, height: 8, borderRadius: '50%',
//     background: color, flexShrink: 0,
//   }),
// };

// export default function ControlPanel({
//   source, destination, algorithm, setAlgorithm,
//   trafficFactor, setTrafficFactor,
//   loading, onRun, onCompare, onReset, mode, setMode
// }) {
//   const canRun = source && destination && !loading;

//   return (
//     <div style={s.panel}>
//       {/* Header */}
//       <div>
//         <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
//           🚑 Emergency Route Optimizer
//         </div>
//         <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
//           Dehradun Road Network
//         </div>
//         <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
//           Graph-Based Shortest Path — DAA Project
//         </div>
//       </div>

//       {/* Selection mode */}
//       <div style={s.section}>
//         <div style={s.sectionTitle}>Placement Mode</div>
//         <div style={{ display: 'flex', gap: 6 }}>
//           {[
//             { id: 'source',      label: '📍 Source',  color: '#00E676' },
//             { id: 'destination', label: '🏥 Dest',    color: '#FF1744' },
//           ].map(m => (
//             <button key={m.id} onClick={() => setMode(m.id)} style={{
//               flex: 1, padding: '7px 0', borderRadius: 7, fontSize: 12, fontWeight: 500,
//               background: mode === m.id ? 'var(--bg4)' : 'transparent',
//               border: `1px solid ${mode === m.id ? m.color + '60' : 'var(--border)'}`,
//               color: mode === m.id ? m.color : 'var(--text3)', cursor: 'pointer',
//             }}>
//               {m.label}
//             </button>
//           ))}
//         </div>

//         {/* Selected nodes */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 10 }}>
//           <div style={s.nodeTag('#00E676')}>
//             <div style={s.dot('#00E676')} />
//             <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//               {source ? source.name : 'No source selected'}
//             </span>
//           </div>
//           <div style={s.nodeTag('#FF1744')}>
//             <div style={s.dot('#FF1744')} />
//             <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//               {destination ? destination.name : 'No destination selected'}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Algorithm selector */}
//       <div style={s.section}>
//         <div style={s.sectionTitle}>Algorithm</div>
//         {ALGORITHMS.map(a => (
//           <button key={a.id} style={s.algoBtn(algorithm === a.id)} onClick={() => setAlgorithm(a.id)}>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
//               <span style={{ fontWeight: 600 }}>{a.label}</span>
//               <span style={s.mono}>{a.complexity}</span>
//             </div>
//             {a.badge && <span style={s.badge(a.badge)}>{a.badge}</span>}
//           </button>
//         ))}
//       </div>

//       {/* Traffic factor */}
//       <div style={s.section}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//           <div style={s.sectionTitle}>Traffic Factor</div>
//           <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: trafficFactor > 0.5 ? '#FF6F00' : 'var(--text2)' }}>
//             {Math.round(trafficFactor * 100)}%
//           </span>
//         </div>
//         <input
//           type="range" min={0} max={1} step={0.05}
//           value={trafficFactor}
//           onChange={e => setTrafficFactor(parseFloat(e.target.value))}
//           style={s.slider}
//         />
//         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
//           <span>Clear roads</span><span>Heavy traffic</span>
//         </div>
//       </div>

//       {/* Run buttons */}
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
//         <button style={s.runBtn(!canRun)} onClick={onRun} disabled={!canRun}>
//           {loading ? '⏳ Computing...' : '🚀 Find Route'}
//         </button>
//         <button style={s.compareBtn(!canRun)} onClick={onCompare} disabled={!canRun}>
//           ⚡ Compare All Algorithms
//         </button>
//         <button onClick={onReset} style={{
//           width: '100%', padding: '7px 0', background: 'transparent',
//           color: 'var(--text3)', border: '1px solid var(--border)',
//           borderRadius: 8, fontSize: 12, cursor: 'pointer',
//         }}>
//           ↺ Reset
//         </button>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from 'react';

const ALGORITHMS = [
  { id: 'astar',         label: 'A*',             complexity: 'O(E log V)',   badge: 'FASTEST' },
  { id: 'dijkstra',      label: "Dijkstra's",     complexity: 'O((V+E)logV)', badge: '' },
  { id: 'bellmanford',   label: 'Bellman-Ford',   complexity: 'O(V·E)',       badge: '' },
  { id: 'floydwarshall', label: 'Floyd-Warshall', complexity: 'O(V³)',        badge: 'ALL-PAIRS' },
];

const s = {
  panel: { display: 'flex', flexDirection: 'column', gap: 10, padding: 14, height: '100%', overflowY: 'auto' },
  section: { background: 'var(--bg3)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '10px 12px' },
  sectionTitle: { fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 8 },
  algoBtn: (active) => ({
    width: '100%', padding: '7px 10px',
    background: active ? 'rgba(229,57,53,0.15)' : 'var(--bg4)',
    border: active ? '1px solid rgba(229,57,53,0.5)' : '1px solid var(--border)',
    borderRadius: 7, color: active ? '#FF5252' : 'var(--text2)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    cursor: 'pointer', transition: 'all 0.15s', marginBottom: 5,
    fontFamily: 'var(--font)', fontSize: 12,
  }),
  badge: (text) => ({
    fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
    background: text === 'FASTEST' ? 'rgba(46,125,50,0.3)' : 'rgba(21,101,192,0.3)',
    color: text === 'FASTEST' ? '#69F0AE' : '#82B1FF',
    border: `1px solid ${text === 'FASTEST' ? 'rgba(46,125,50,0.5)' : 'rgba(21,101,192,0.5)'}`,
    borderRadius: 4, padding: '1px 5px',
  }),
  mono: { fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)' },
  runBtn: (disabled) => ({
    width: '100%', padding: '9px 0',
    background: disabled ? 'var(--bg4)' : 'var(--red)',
    color: disabled ? 'var(--text3)' : '#fff',
    borderRadius: 8, fontWeight: 600, fontSize: 13,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s', border: 'none',
  }),
  nodeTag: { display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg4)', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 8px', fontSize: 11, color: 'var(--text)', marginBottom: 5 },
  dot: (color) => ({ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }),
};

// Animated counter hook
function useCounter(target, duration = 800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) { setVal(0); return; }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

function LiveStat({ label, value, unit, color }) {
  const animated = useCounter(typeof value === 'number' ? value : 0);
  return (
    <div style={{ background: 'var(--bg4)', borderRadius: 7, padding: '7px 10px', border: `1px solid ${color}22` }}>
      <div style={{ fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 700, color }}>
        {typeof value === 'number' ? animated : value || '—'}
        {unit && <span style={{ fontSize: 10, fontWeight: 400, marginLeft: 2, color: 'var(--text3)' }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function ControlPanel({
  source, destination, algorithm, setAlgorithm,
  trafficFactor, setTrafficFactor,
  loading, onRun, onCompare, onReset,
  mode, setMode, blockedEdges, result, compareResult
}) {
  const canRun = source && destination && !loading;
  const activeResult = compareResult ? compareResult.results[compareResult.fastest] : result;

  return (
    <div style={s.panel}>
      {/* Header */}
      <div style={{ paddingBottom: 4 }}>
        <div style={{ fontSize: 10, color: 'var(--red)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>🚑 Emergency Route Optimizer</div>
        <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>Dehradun Network</div>
        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>52 nodes · 90+ edges · DAA Project</div>
      </div>

      {/* Node selection */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Select Points</div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
          {[
            { id: 'source',      label: '📍 Source',  color: '#00E676' },
            { id: 'destination', label: '🏥 Dest',    color: '#FF1744' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              flex: 1, padding: '6px 0', borderRadius: 6, fontSize: 11, fontWeight: 500,
              background: mode === m.id ? 'var(--bg4)' : 'transparent',
              border: `1px solid ${mode === m.id ? m.color + '60' : 'var(--border)'}`,
              color: mode === m.id ? m.color : 'var(--text3)', cursor: 'pointer',
            }}>{m.label}</button>
          ))}
        </div>
        <div style={s.nodeTag}><div style={s.dot('#00E676')} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11 }}>{source ? source.name : 'No source selected'}</span></div>
        <div style={s.nodeTag}><div style={s.dot('#FF1744')} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11 }}>{destination ? destination.name : 'No destination'}</span></div>
      </div>

      {/* Road blocking */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Road Incidents</div>
        <button onClick={() => setMode(mode === 'block' ? 'select' : 'block')} style={{
          width: '100%', padding: '7px 0', borderRadius: 7, fontSize: 12, fontWeight: 500,
          background: mode === 'block' ? 'rgba(229,57,53,0.15)' : 'var(--bg4)',
          border: `1px solid ${mode === 'block' ? 'rgba(229,57,53,0.5)' : 'var(--border)'}`,
          color: mode === 'block' ? '#FF5252' : 'var(--text2)', cursor: 'pointer',
          transition: 'all 0.15s', marginBottom: 6,
        }}>
          {mode === 'block' ? '🚧 Click road edge to block' : '🚧 Block a Road'}
        </button>
        {blockedEdges?.length > 0 && (
          <div style={{ fontSize: 11, color: '#FF6F00' }}>
            {blockedEdges.length} road{blockedEdges.length > 1 ? 's' : ''} blocked
          </div>
        )}
      </div>

      {/* Algorithm */}
      <div style={s.section}>
        <div style={s.sectionTitle}>Algorithm</div>
        {ALGORITHMS.map(a => (
          <button key={a.id} style={s.algoBtn(algorithm === a.id)} onClick={() => setAlgorithm(a.id)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
              <span style={{ fontWeight: 600 }}>{a.label}</span>
              <span style={s.mono}>{a.complexity}</span>
            </div>
            {a.badge && <span style={s.badge(a.badge)}>{a.badge}</span>}
          </button>
        ))}
      </div>

      {/* Traffic */}
      <div style={s.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={s.sectionTitle}>Traffic Factor</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: trafficFactor > 0.5 ? '#FF6F00' : 'var(--text2)' }}>
            {Math.round(trafficFactor * 100)}%
          </span>
        </div>
        <input type="range" min={0} max={1} step={0.05} value={trafficFactor}
          onChange={e => setTrafficFactor(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--red)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text3)', marginTop: 3 }}>
          <span>Clear</span><span>Heavy</span>
        </div>
      </div>

      {/* Live stats */}
      {activeResult && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Live Stats</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <LiveStat label="Travel Time" value={activeResult.cost ? parseFloat(activeResult.cost.toFixed(1)) : null} unit="min" color="#FF6F00" />
            <LiveStat label="Exec Time"   value={activeResult.executionTimeMs ? parseFloat(activeResult.executionTimeMs.toFixed(2)) : null} unit="ms" color="#3D5AFE" />
            <LiveStat label="Nodes Seen"  value={activeResult.nodesVisited} color="#AA00FF" />
            <LiveStat label="Path Nodes"  value={activeResult.enrichedPath?.length} color="#00E676" />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button style={s.runBtn(!canRun)} onClick={onRun} disabled={!canRun}>
          {loading ? '⏳ Computing...' : '🚀 Find Route'}
        </button>
        <button onClick={onCompare} disabled={!canRun} style={{
          width: '100%', padding: '8px 0', background: 'transparent',
          color: canRun ? 'var(--text2)' : 'var(--text3)',
          border: `1px solid ${canRun ? 'var(--border2)' : 'var(--border)'}`,
          borderRadius: 8, fontSize: 12, cursor: canRun ? 'pointer' : 'not-allowed',
        }}>
          ⚡ Compare All Algorithms
        </button>
        <button onClick={onReset} style={{
          width: '100%', padding: '6px 0', background: 'transparent',
          color: 'var(--text3)', border: '1px solid var(--border)',
          borderRadius: 8, fontSize: 11, cursor: 'pointer',
        }}>↺ Reset</button>
      </div>
    </div>
  );
}