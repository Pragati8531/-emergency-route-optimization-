/**
 * Dehradun Road Network — Sample Graph Data
 * Nodes: real intersections in Dehradun, Uttarakhand
 * Edges: road segments with estimated travel weights (minutes)
 * Weight = distance_km / avg_speed_kmph * 60 (minutes)
 */

const dehradunGraph = {
  nodes: [
    { id: "1",  name: "ISBT Dehradun",           lat: 30.3165, lng: 78.0322 },
    { id: "2",  name: "Clock Tower",              lat: 30.3247, lng: 78.0413 },
    { id: "3",  name: "Paltan Bazaar",            lat: 30.3232, lng: 78.0442 },
    { id: "4",  name: "Rajpur Road Junction",     lat: 30.3398, lng: 78.0624 },
    { id: "5",  name: "Mussoorie Diversion",      lat: 30.3565, lng: 78.0724 },
    { id: "6",  name: "Dehradun Railway Station", lat: 30.3144, lng: 78.0306 },
    { id: "7",  name: "Doon Hospital",            lat: 30.3170, lng: 78.0501 },
    { id: "8",  name: "Parade Ground",            lat: 30.3250, lng: 78.0500 },
    { id: "9",  name: "IMA Chowk",               lat: 30.3188, lng: 78.0388 },
    { id: "10", name: "Rispana Bridge",           lat: 30.3050, lng: 78.0150 },
    { id: "11", name: "Saharanpur Chowk",         lat: 30.3100, lng: 78.0200 },
    { id: "12", name: "Nehru Colony",             lat: 30.3300, lng: 78.0550 },
    { id: "13", name: "Dalanwala",                lat: 30.3180, lng: 78.0620 },
    { id: "14", name: "Kaonli",                   lat: 30.3450, lng: 78.0800 },
    { id: "15", name: "Prem Nagar",               lat: 30.2950, lng: 78.0050 },
    { id: "16", name: "Ballupur Chowk",           lat: 30.3380, lng: 78.0480 },
    { id: "17", name: "Survey Chowk",             lat: 30.3210, lng: 78.0460 },
    { id: "18", name: "GMS Road",                 lat: 30.3320, lng: 78.0350 },
    { id: "19", name: "Raipur Road",              lat: 30.3420, lng: 78.0570 },
    { id: "20", name: "Clement Town",             lat: 30.2850, lng: 77.9900 },
  ],

  // [from, to, weight(mins), roadType, distance(km)]
  edges: [
    ["1",  "6",  2,  "main",    0.4],
    ["1",  "9",  4,  "main",    1.2],
    ["1",  "11", 5,  "main",    1.5],
    ["6",  "1",  2,  "main",    0.4],
    ["6",  "9",  5,  "main",    1.0],
    ["9",  "2",  4,  "main",    1.1],
    ["9",  "7",  3,  "main",    0.8],
    ["9",  "17", 3,  "main",    0.9],
    ["2",  "3",  2,  "main",    0.5],
    ["2",  "8",  3,  "main",    0.8],
    ["2",  "18", 5,  "main",    1.4],
    ["3",  "7",  4,  "main",    1.0],
    ["3",  "13", 6,  "local",   1.8],
    ["7",  "13", 5,  "local",   1.5],
    ["8",  "12", 4,  "main",    1.0],
    ["8",  "17", 2,  "main",    0.6],
    ["17", "8",  2,  "main",    0.6],
    ["17", "7",  4,  "main",    1.1],
    ["4",  "5",  6,  "highway", 2.5],
    ["4",  "16", 4,  "main",    1.2],
    ["4",  "19", 3,  "main",    0.9],
    ["5",  "14", 7,  "highway", 3.0],
    ["12", "4",  5,  "main",    1.4],
    ["12", "16", 3,  "main",    0.9],
    ["16", "18", 6,  "main",    1.8],
    ["16", "19", 4,  "main",    1.1],
    ["18", "16", 6,  "main",    1.8],
    ["18", "1",  8,  "main",    2.4],
    ["19", "14", 8,  "highway", 3.2],
    ["13", "12", 5,  "local",   1.5],
    ["11", "10", 4,  "main",    1.2],
    ["11", "15", 8,  "highway", 4.0],
    ["10", "15", 6,  "main",    2.2],
    ["15", "20", 10, "highway", 5.5],
    ["20", "15", 10, "highway", 5.5],
    ["14", "19", 8,  "highway", 3.2],
    ["6",  "11", 4,  "main",    1.3],
    ["2",  "4",  10, "main",    3.0],
    ["18", "9",  5,  "main",    1.5],
  ]
};

module.exports = dehradunGraph;