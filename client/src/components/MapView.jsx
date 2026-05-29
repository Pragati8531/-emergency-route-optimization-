// import React, { useEffect, useRef, useState } from 'react';
// import L from 'leaflet';

// const DEHRADUN_CENTER = [30.3165, 78.0322];
// const ZOOM = 13;

// const COLORS = {
//   source:      '#00E676',
//   destination: '#FF1744',
//   path:        '#FF6F00',
//   node:        '#3D5AFE',
//   nodeHover:   '#FFFFFF',
//   edge:        'rgba(61,90,254,0.25)',
//   blocked:     '#FF1744',
// };

// export default function MapView({ nodes, edges, result, compareResult, source, destination, onNodeClick, mode, blockedEdges }) {
//   const mapRef    = useRef(null);
//   const mapObj    = useRef(null);
//   const layersRef = useRef({ nodes: [], edges: [], path: [], markers: [] });

//   // Init map once
//   useEffect(() => {
//     if (mapObj.current) return;
//     mapObj.current = L.map(mapRef.current, {
//       center: DEHRADUN_CENTER, zoom: ZOOM,
//       zoomControl: true, attributionControl: false,
//     });
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18, attribution: '© OpenStreetMap'
//     }).addTo(mapObj.current);
//   }, []);

//   // Draw graph edges
//   useEffect(() => {
//     if (!mapObj.current || !nodes || !edges) return;
//     const map = mapObj.current;
//     layersRef.current.edges.forEach(l => map.removeLayer(l));
//     layersRef.current.edges = [];

//     const nodeMap = {};
//     nodes.forEach(n => { nodeMap[n.id] = n; });

//     edges.forEach(e => {
//       const from = nodeMap[e.from], to = nodeMap[e.to];
//       if (!from || !to) return;
//       const isBlocked = blockedEdges?.some(b => b.from === e.from && b.to === e.to);
//       const line = L.polyline(
//         [[from.lat, from.lng], [to.lat, to.lng]],
//         { color: isBlocked ? COLORS.blocked : COLORS.edge, weight: isBlocked ? 3 : 1.5, opacity: 1, dashArray: isBlocked ? '6,4' : null }
//       ).addTo(map);
//       layersRef.current.edges.push(line);
//     });
//   }, [nodes, edges, blockedEdges]);

//   // Draw nodes
//   useEffect(() => {
//     if (!mapObj.current || !nodes) return;
//     const map = mapObj.current;
//     layersRef.current.nodes.forEach(l => map.removeLayer(l));
//     layersRef.current.nodes = [];

//     nodes.forEach(node => {
//       const isSource = source?.id === node.id;
//       const isDest   = destination?.id === node.id;
//       const color    = isSource ? COLORS.source : isDest ? COLORS.destination : COLORS.node;
//       const radius   = isSource || isDest ? 10 : 7;

//       const circle = L.circleMarker([node.lat, node.lng], {
//         radius, color, fillColor: color, fillOpacity: 1,
//         weight: 2, opacity: 1,
//         className: 'graph-node'
//       })
//         .bindTooltip(`<b>${node.name}</b><br/><span style="font-size:11px;color:#aaa">ID: ${node.id}</span>`, {
//           direction: 'top', offset: [0, -8],
//           className: 'node-tooltip'
//         })
//         .on('click', () => onNodeClick(node))
//         .on('mouseover', function () { this.setStyle({ radius: radius + 3 }); })
//         .on('mouseout',  function () { this.setStyle({ radius }); })
//         .addTo(map);

//       layersRef.current.nodes.push(circle);
//     });
//   }, [nodes, source, destination, onNodeClick]);

//   // Draw route path
//   useEffect(() => {
//     if (!mapObj.current) return;
//     const map = mapObj.current;
//     layersRef.current.path.forEach(l => map.removeLayer(l));
//     layersRef.current.path = [];
//     layersRef.current.markers.forEach(l => map.removeLayer(l));
//     layersRef.current.markers = [];

//     const activeResult = compareResult
//       ? compareResult.results[compareResult.fastest]
//       : result;

//     if (!activeResult?.enrichedPath?.length) return;

//     const coords = activeResult.enrichedPath.map(n => [n.lat, n.lng]);

//     // Animated dashed path (background)
//     const bgLine = L.polyline(coords, {
//       color: 'rgba(255,111,0,0.2)', weight: 12, lineCap: 'round'
//     }).addTo(map);

//     // Main path line
//     const pathLine = L.polyline(coords, {
//       color: COLORS.path, weight: 5, opacity: 1, lineCap: 'round', lineJoin: 'round'
//     }).addTo(map);

//     layersRef.current.path.push(bgLine, pathLine);

//     // Animated direction arrows along path
//     if (coords.length > 1) {
//       for (let i = 0; i < coords.length - 1; i++) {
//         const mid = [
//           (coords[i][0] + coords[i + 1][0]) / 2,
//           (coords[i][1] + coords[i + 1][1]) / 2
//         ];
//         const angle = Math.atan2(
//           coords[i+1][1] - coords[i][1],
//           coords[i+1][0] - coords[i][0]
//         ) * 180 / Math.PI;

//         const arrow = L.marker(mid, {
//           icon: L.divIcon({
//             html: `<div style="transform:rotate(${angle}deg);color:#FF6F00;font-size:14px;line-height:1">▶</div>`,
//             className: '', iconSize: [14, 14], iconAnchor: [7, 7]
//           })
//         }).addTo(map);
//         layersRef.current.markers.push(arrow);
//       }
//     }

//     // Fit map to path
//     map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
//   }, [result, compareResult]);

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

//       {/* Mode indicator */}
//       <div style={{
//         position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
//         background: 'rgba(10,12,16,0.92)', border: '1px solid rgba(255,255,255,0.12)',
//         borderRadius: 8, padding: '6px 16px', fontSize: 12, color: '#9BA3B8',
//         zIndex: 1000, pointerEvents: 'none', backdropFilter: 'blur(8px)'
//       }}>
//         {mode === 'source'      && '🚑 Click a node to set SOURCE (emergency origin)'}
//         {mode === 'destination' && '🏥 Click a node to set DESTINATION (hospital / station)'}
//         {mode === 'select'      && '✓ Source & destination set — run the algorithm below'}
//         {mode === 'block'       && '🚧 Click an edge to block it (simulate road closure)'}
//       </div>

//       <style>{`
//         .node-tooltip {
//           background: #12151C !important;
//           border: 1px solid rgba(255,255,255,0.12) !important;
//           color: #F0F2F8 !important;
//           font-family: 'Space Grotesk', sans-serif !important;
//           font-size: 12px !important;
//           border-radius: 6px !important;
//           box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
//         }
//         .node-tooltip::before { display: none !important; }
//       `}</style>
//     </div>
//   );
// }





import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const DEHRADUN_CENTER = [30.3165, 78.0322];
const ZOOM = 13;

const COLORS = {
  source:      '#00E676',
  destination: '#FF1744',
  path:        '#FF6F00',
  node:        '#3D5AFE',
  edge:        'rgba(61,90,254,0.22)',
  edgeHover:   'rgba(61,90,254,0.7)',
  blocked:     '#FF1744',
  blockedEdge: '#FF1744',
};

export default function MapView({
  nodes, edges, result, compareResult,
  source, destination, onNodeClick,
  mode, blockedEdges, onBlockEdge
}) {
  const mapRef    = useRef(null);
  const mapObj    = useRef(null);
  const layersRef = useRef({ nodes: [], edges: [], path: [], markers: [], animMarker: null });
  const [animating, setAnimating] = useState(false);

  // Init map
  useEffect(() => {
    if (mapObj.current) return;
    mapObj.current = L.map(mapRef.current, {
      center: DEHRADUN_CENTER, zoom: ZOOM,
      zoomControl: true, attributionControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(mapObj.current);
  }, []);

  // Draw edges
  useEffect(() => {
    if (!mapObj.current || !nodes || !edges) return;
    const map = mapObj.current;
    layersRef.current.edges.forEach(l => map.removeLayer(l));
    layersRef.current.edges = [];

    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });

    edges.forEach(e => {
      const from = nodeMap[e.from], to = nodeMap[e.to];
      if (!from || !to) return;
      const isBlocked = blockedEdges?.some(b => b.from === e.from && b.to === e.to);

      const line = L.polyline(
        [[from.lat, from.lng], [to.lat, to.lng]],
        {
          color: isBlocked ? COLORS.blockedEdge : COLORS.edge,
          weight: isBlocked ? 4 : 2,
          opacity: isBlocked ? 0.9 : 1,
          dashArray: isBlocked ? '8,5' : null,
        }
      );

      // Block edge on click when in block mode
      if (mode === 'block') {
        line.on('click', () => {
          onBlockEdge && onBlockEdge({ from: e.from, to: e.to });
        });
        line.on('mouseover', function () {
          this.setStyle({ color: COLORS.edgeHover, weight: 4, opacity: 1 });
          this.getElement() && (this.getElement().style.cursor = 'pointer');
        });
        line.on('mouseout', function () {
          if (!isBlocked) this.setStyle({ color: COLORS.edge, weight: 2 });
        });
      }

      line.addTo(map);
      layersRef.current.edges.push(line);
    });
  }, [nodes, edges, blockedEdges, mode, onBlockEdge]);

  // Draw nodes
  useEffect(() => {
    if (!mapObj.current || !nodes) return;
    const map = mapObj.current;
    layersRef.current.nodes.forEach(l => map.removeLayer(l));
    layersRef.current.nodes = [];

    nodes.forEach(node => {
      const isSource = source?.id === node.id;
      const isDest   = destination?.id === node.id;
      const color    = isSource ? COLORS.source : isDest ? COLORS.destination : COLORS.node;
      const radius   = isSource || isDest ? 10 : 6;

      const circle = L.circleMarker([node.lat, node.lng], {
        radius, color, fillColor: color, fillOpacity: 1, weight: 2,
      })
        .bindTooltip(
          `<b>${node.name}</b><br/><span style="font-size:10px;color:#aaa">ID: ${node.id} · ${node.lat.toFixed(4)}, ${node.lng.toFixed(4)}</span>`,
          { direction: 'top', offset: [0, -8], className: 'node-tooltip' }
        )
        .on('click', () => onNodeClick(node))
        .on('mouseover', function () { this.setStyle({ radius: radius + 3 }); })
        .on('mouseout',  function () { this.setStyle({ radius }); })
        .addTo(map);

      layersRef.current.nodes.push(circle);
    });
  }, [nodes, source, destination, onNodeClick]);

  // Animate route path step by step
  useEffect(() => {
    if (!mapObj.current) return;
    const map = mapObj.current;

    // Clear previous path
    layersRef.current.path.forEach(l => map.removeLayer(l));
    layersRef.current.path = [];
    layersRef.current.markers.forEach(l => map.removeLayer(l));
    layersRef.current.markers = [];
    if (layersRef.current.animMarker) {
      map.removeLayer(layersRef.current.animMarker);
      layersRef.current.animMarker = null;
    }

    const activeResult = compareResult
      ? compareResult.results[compareResult.fastest]
      : result;

    if (!activeResult?.enrichedPath?.length) return;

    const coords = activeResult.enrichedPath.map(n => [n.lat, n.lng]);
    setAnimating(true);

    // Draw background glow
    const bgLine = L.polyline(coords, {
      color: 'rgba(255,111,0,0.15)', weight: 14, lineCap: 'round'
    }).addTo(map);
    layersRef.current.path.push(bgLine);

    // Animate drawing segment by segment
    let i = 0;
    const drawNext = () => {
      if (i >= coords.length - 1) {
        setAnimating(false);
        // Draw direction arrows
        coords.forEach((coord, idx) => {
          if (idx === coords.length - 1) return;
          const mid = [
            (coord[0] + coords[idx+1][0]) / 2,
            (coord[1] + coords[idx+1][1]) / 2,
          ];
          const angle = Math.atan2(
            coords[idx+1][1] - coord[1],
            coords[idx+1][0] - coord[0]
          ) * 180 / Math.PI;
          const arrow = L.marker(mid, {
            icon: L.divIcon({
              html: `<div style="transform:rotate(${angle}deg);color:#FF6F00;font-size:13px;line-height:1;opacity:0.9">▶</div>`,
              className: '', iconSize: [13, 13], iconAnchor: [6, 6]
            })
          }).addTo(map);
          layersRef.current.markers.push(arrow);
        });
        return;
      }
      const seg = L.polyline([coords[i], coords[i+1]], {
        color: COLORS.path, weight: 5, lineCap: 'round', lineJoin: 'round'
      }).addTo(map);
      layersRef.current.path.push(seg);
      i++;
      setTimeout(drawNext, 120);
    };

    // Moving ambulance marker
    const ambulanceIcon = L.divIcon({
      html: `<div style="font-size:20px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.8))">🚑</div>`,
      className: '', iconSize: [24, 24], iconAnchor: [12, 12]
    });
    const ambulance = L.marker(coords[0], { icon: ambulanceIcon, zIndexOffset: 1000 }).addTo(map);
    layersRef.current.animMarker = ambulance;

    // Move ambulance along path after drawing
    setTimeout(() => {
      let ai = 0;
      const moveAmbulance = () => {
        if (ai >= coords.length) {
          map.removeLayer(ambulance);
          return;
        }
        ambulance.setLatLng(coords[ai]);
        ai++;
        setTimeout(moveAmbulance, 150);
      };
      moveAmbulance();
    }, coords.length * 120 + 200);

    drawNext();
    map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  }, [result, compareResult]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Mode indicator */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,12,16,0.92)', border: `1px solid ${mode === 'block' ? 'rgba(229,57,53,0.5)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 8, padding: '6px 16px', fontSize: 12,
        color: mode === 'block' ? '#FF5252' : '#9BA3B8',
        zIndex: 1000, pointerEvents: 'none', backdropFilter: 'blur(8px)',
        transition: 'all 0.2s',
      }}>
        {mode === 'source'      && '🚑 Click a node — set SOURCE'}
        {mode === 'destination' && '🏥 Click a node — set DESTINATION'}
        {mode === 'select'      && '✓ Ready — run algorithm from left panel'}
        {mode === 'block'       && '🚧 Click any road edge to BLOCK it'}
      </div>

      {/* Animating indicator */}
      {animating && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,111,0,0.15)', border: '1px solid rgba(255,111,0,0.4)',
          borderRadius: 8, padding: '6px 16px', fontSize: 12, color: '#FF6F00',
          zIndex: 1000, backdropFilter: 'blur(8px)',
        }}>
          🚑 Routing emergency vehicle...
        </div>
      )}

      <style>{`
        .node-tooltip {
          background: #12151C !important; border: 1px solid rgba(255,255,255,0.12) !important;
          color: #F0F2F8 !important; font-family: 'Space Grotesk', sans-serif !important;
          font-size: 12px !important; border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
        }
        .node-tooltip::before { display: none !important; }
      `}</style>
    </div>
  );
}