import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const DEHRADUN_CENTER = [30.3165, 78.0322];
const ZOOM = 13;

const COLORS = {
  source:      '#00E676',
  destination: '#FF1744',
  path:        '#FF6F00',
  node:        '#3D5AFE',
  nodeHover:   '#FFFFFF',
  edge:        'rgba(61,90,254,0.25)',
  blocked:     '#FF1744',
};

export default function MapView({ nodes, edges, result, compareResult, source, destination, onNodeClick, mode, blockedEdges }) {
  const mapRef    = useRef(null);
  const mapObj    = useRef(null);
  const layersRef = useRef({ nodes: [], edges: [], path: [], markers: [] });

  // Init map once
  useEffect(() => {
    if (mapObj.current) return;
    mapObj.current = L.map(mapRef.current, {
      center: DEHRADUN_CENTER, zoom: ZOOM,
      zoomControl: true, attributionControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '© OpenStreetMap'
    }).addTo(mapObj.current);
  }, []);

  // Draw graph edges
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
        { color: isBlocked ? COLORS.blocked : COLORS.edge, weight: isBlocked ? 3 : 1.5, opacity: 1, dashArray: isBlocked ? '6,4' : null }
      ).addTo(map);
      layersRef.current.edges.push(line);
    });
  }, [nodes, edges, blockedEdges]);

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
      const radius   = isSource || isDest ? 10 : 7;

      const circle = L.circleMarker([node.lat, node.lng], {
        radius, color, fillColor: color, fillOpacity: 1,
        weight: 2, opacity: 1,
        className: 'graph-node'
      })
        .bindTooltip(`<b>${node.name}</b><br/><span style="font-size:11px;color:#aaa">ID: ${node.id}</span>`, {
          direction: 'top', offset: [0, -8],
          className: 'node-tooltip'
        })
        .on('click', () => onNodeClick(node))
        .on('mouseover', function () { this.setStyle({ radius: radius + 3 }); })
        .on('mouseout',  function () { this.setStyle({ radius }); })
        .addTo(map);

      layersRef.current.nodes.push(circle);
    });
  }, [nodes, source, destination, onNodeClick]);

  // Draw route path
  useEffect(() => {
    if (!mapObj.current) return;
    const map = mapObj.current;
    layersRef.current.path.forEach(l => map.removeLayer(l));
    layersRef.current.path = [];
    layersRef.current.markers.forEach(l => map.removeLayer(l));
    layersRef.current.markers = [];

    const activeResult = compareResult
      ? compareResult.results[compareResult.fastest]
      : result;

    if (!activeResult?.enrichedPath?.length) return;

    const coords = activeResult.enrichedPath.map(n => [n.lat, n.lng]);

    // Animated dashed path (background)
    const bgLine = L.polyline(coords, {
      color: 'rgba(255,111,0,0.2)', weight: 12, lineCap: 'round'
    }).addTo(map);

    // Main path line
    const pathLine = L.polyline(coords, {
      color: COLORS.path, weight: 5, opacity: 1, lineCap: 'round', lineJoin: 'round'
    }).addTo(map);

    layersRef.current.path.push(bgLine, pathLine);

    // Animated direction arrows along path
    if (coords.length > 1) {
      for (let i = 0; i < coords.length - 1; i++) {
        const mid = [
          (coords[i][0] + coords[i + 1][0]) / 2,
          (coords[i][1] + coords[i + 1][1]) / 2
        ];
        const angle = Math.atan2(
          coords[i+1][1] - coords[i][1],
          coords[i+1][0] - coords[i][0]
        ) * 180 / Math.PI;

        const arrow = L.marker(mid, {
          icon: L.divIcon({
            html: `<div style="transform:rotate(${angle}deg);color:#FF6F00;font-size:14px;line-height:1">▶</div>`,
            className: '', iconSize: [14, 14], iconAnchor: [7, 7]
          })
        }).addTo(map);
        layersRef.current.markers.push(arrow);
      }
    }

    // Fit map to path
    map.fitBounds(L.latLngBounds(coords), { padding: [60, 60] });
  }, [result, compareResult]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Mode indicator */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,12,16,0.92)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '6px 16px', fontSize: 12, color: '#9BA3B8',
        zIndex: 1000, pointerEvents: 'none', backdropFilter: 'blur(8px)'
      }}>
        {mode === 'source'      && '🚑 Click a node to set SOURCE (emergency origin)'}
        {mode === 'destination' && '🏥 Click a node to set DESTINATION (hospital / station)'}
        {mode === 'select'      && '✓ Source & destination set — run the algorithm below'}
        {mode === 'block'       && '🚧 Click an edge to block it (simulate road closure)'}
      </div>

      <style>{`
        .node-tooltip {
          background: #12151C !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #F0F2F8 !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 12px !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
        }
        .node-tooltip::before { display: none !important; }
      `}</style>
    </div>
  );
}
