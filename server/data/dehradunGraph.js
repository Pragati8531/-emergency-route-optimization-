// /**
//  * Dehradun Road Network — Sample Graph Data
//  * Nodes: real intersections in Dehradun, Uttarakhand
//  * Edges: road segments with estimated travel weights (minutes)
//  * Weight = distance_km / avg_speed_kmph * 60 (minutes)
//  */

// const dehradunGraph = {
//   nodes: [
//     { id: "1",  name: "ISBT Dehradun",           lat: 30.3165, lng: 78.0322 },
//     { id: "2",  name: "Clock Tower",              lat: 30.3247, lng: 78.0413 },
//     { id: "3",  name: "Paltan Bazaar",            lat: 30.3232, lng: 78.0442 },
//     { id: "4",  name: "Rajpur Road Junction",     lat: 30.3398, lng: 78.0624 },
//     { id: "5",  name: "Mussoorie Diversion",      lat: 30.3565, lng: 78.0724 },
//     { id: "6",  name: "Dehradun Railway Station", lat: 30.3144, lng: 78.0306 },
//     { id: "7",  name: "Doon Hospital",            lat: 30.3170, lng: 78.0501 },
//     { id: "8",  name: "Parade Ground",            lat: 30.3250, lng: 78.0500 },
//     { id: "9",  name: "IMA Chowk",               lat: 30.3188, lng: 78.0388 },
//     { id: "10", name: "Rispana Bridge",           lat: 30.3050, lng: 78.0150 },
//     { id: "11", name: "Saharanpur Chowk",         lat: 30.3100, lng: 78.0200 },
//     { id: "12", name: "Nehru Colony",             lat: 30.3300, lng: 78.0550 },
//     { id: "13", name: "Dalanwala",                lat: 30.3180, lng: 78.0620 },
//     { id: "14", name: "Kaonli",                   lat: 30.3450, lng: 78.0800 },
//     { id: "15", name: "Prem Nagar",               lat: 30.2950, lng: 78.0050 },
//     { id: "16", name: "Ballupur Chowk",           lat: 30.3380, lng: 78.0480 },
//     { id: "17", name: "Survey Chowk",             lat: 30.3210, lng: 78.0460 },
//     { id: "18", name: "GMS Road",                 lat: 30.3320, lng: 78.0350 },
//     { id: "19", name: "Raipur Road",              lat: 30.3420, lng: 78.0570 },
//     { id: "20", name: "Clement Town",             lat: 30.2850, lng: 77.9900 },
//   ],

//   // [from, to, weight(mins), roadType, distance(km)]
//   edges: [
//     ["1",  "6",  2,  "main",    0.4],
//     ["1",  "9",  4,  "main",    1.2],
//     ["1",  "11", 5,  "main",    1.5],
//     ["6",  "1",  2,  "main",    0.4],
//     ["6",  "9",  5,  "main",    1.0],
//     ["9",  "2",  4,  "main",    1.1],
//     ["9",  "7",  3,  "main",    0.8],
//     ["9",  "17", 3,  "main",    0.9],
//     ["2",  "3",  2,  "main",    0.5],
//     ["2",  "8",  3,  "main",    0.8],
//     ["2",  "18", 5,  "main",    1.4],
//     ["3",  "7",  4,  "main",    1.0],
//     ["3",  "13", 6,  "local",   1.8],
//     ["7",  "13", 5,  "local",   1.5],
//     ["8",  "12", 4,  "main",    1.0],
//     ["8",  "17", 2,  "main",    0.6],
//     ["17", "8",  2,  "main",    0.6],
//     ["17", "7",  4,  "main",    1.1],
//     ["4",  "5",  6,  "highway", 2.5],
//     ["4",  "16", 4,  "main",    1.2],
//     ["4",  "19", 3,  "main",    0.9],
//     ["5",  "14", 7,  "highway", 3.0],
//     ["12", "4",  5,  "main",    1.4],
//     ["12", "16", 3,  "main",    0.9],
//     ["16", "18", 6,  "main",    1.8],
//     ["16", "19", 4,  "main",    1.1],
//     ["18", "16", 6,  "main",    1.8],
//     ["18", "1",  8,  "main",    2.4],
//     ["19", "14", 8,  "highway", 3.2],
//     ["13", "12", 5,  "local",   1.5],
//     ["11", "10", 4,  "main",    1.2],
//     ["11", "15", 8,  "highway", 4.0],
//     ["10", "15", 6,  "main",    2.2],
//     ["15", "20", 10, "highway", 5.5],
//     ["20", "15", 10, "highway", 5.5],
//     ["14", "19", 8,  "highway", 3.2],
//     ["6",  "11", 4,  "main",    1.3],
//     ["2",  "4",  10, "main",    3.0],
//     ["18", "9",  5,  "main",    1.5],
//   ]
// };

// module.exports = dehradunGraph;










/**
 * Dehradun Road Network — Expanded Graph Data
 * 52 nodes: real intersections, landmarks, hospitals, fire stations
 * 90+ edges: road segments with estimated travel weights (minutes)
 */

const dehradunGraph = {
  nodes: [
    // Core city
    { id: "1",  name: "ISBT Dehradun",              lat: 30.3165, lng: 78.0322 },
    { id: "2",  name: "Clock Tower",                lat: 30.3247, lng: 78.0413 },
    { id: "3",  name: "Paltan Bazaar",              lat: 30.3232, lng: 78.0442 },
    { id: "4",  name: "Rajpur Road Junction",       lat: 30.3398, lng: 78.0624 },
    { id: "5",  name: "Mussoorie Diversion",        lat: 30.3565, lng: 78.0724 },
    { id: "6",  name: "Dehradun Railway Station",   lat: 30.3144, lng: 78.0306 },
    { id: "7",  name: "Doon Hospital",              lat: 30.3170, lng: 78.0501 },
    { id: "8",  name: "Parade Ground",              lat: 30.3250, lng: 78.0500 },
    { id: "9",  name: "IMA Chowk",                 lat: 30.3188, lng: 78.0388 },
    { id: "10", name: "Rispana Bridge",             lat: 30.3050, lng: 78.0150 },
    { id: "11", name: "Saharanpur Chowk",           lat: 30.3100, lng: 78.0200 },
    { id: "12", name: "Nehru Colony",               lat: 30.3300, lng: 78.0550 },
    { id: "13", name: "Dalanwala",                  lat: 30.3180, lng: 78.0620 },
    { id: "14", name: "Kaonli",                     lat: 30.3450, lng: 78.0800 },
    { id: "15", name: "Prem Nagar",                 lat: 30.2950, lng: 78.0050 },
    { id: "16", name: "Ballupur Chowk",             lat: 30.3380, lng: 78.0480 },
    { id: "17", name: "Survey Chowk",               lat: 30.3210, lng: 78.0460 },
    { id: "18", name: "GMS Road",                   lat: 30.3320, lng: 78.0350 },
    { id: "19", name: "Raipur Road",                lat: 30.3420, lng: 78.0570 },
    { id: "20", name: "Clement Town",               lat: 30.2850, lng: 77.9900 },
    // Hospitals & Emergency
    { id: "21", name: "Synlabs Hospital",           lat: 30.3280, lng: 78.0430 },
    { id: "22", name: "Max Hospital Mussoorie Rd",  lat: 30.3480, lng: 78.0660 },
    { id: "23", name: "Shri Mahant Indiresh Hosp",  lat: 30.3060, lng: 78.0480 },
    { id: "24", name: "Fire Station Dehradun",      lat: 30.3220, lng: 78.0390 },
    { id: "25", name: "Police Lines",               lat: 30.3190, lng: 78.0340 },
    // North Dehradun
    { id: "26", name: "MDDA Colony",                lat: 30.3600, lng: 78.0550 },
    { id: "27", name: "Sahastradhara Road",         lat: 30.3520, lng: 78.1000 },
    { id: "28", name: "Bindal Bridge",              lat: 30.3350, lng: 78.0700 },
    { id: "29", name: "Turner Road",                lat: 30.3310, lng: 78.0620 },
    { id: "30", name: "Chakrata Road",              lat: 30.3240, lng: 78.0200 },
    // South Dehradun
    { id: "31", name: "Doiwala",                    lat: 30.1833, lng: 78.1167 },
    { id: "32", name: "Selaqui",                    lat: 30.3100, lng: 77.9600 },
    { id: "33", name: "Mothrowala Road",            lat: 30.2700, lng: 78.0200 },
    { id: "34", name: "Kargi Chowk",                lat: 30.3050, lng: 78.0400 },
    { id: "35", name: "Niranjanpur",                lat: 30.3000, lng: 78.0600 },
    // East Dehradun
    { id: "36", name: "Jakhan",                     lat: 30.3400, lng: 78.0900 },
    { id: "37", name: "Kishanpur",                  lat: 30.3300, lng: 78.0850 },
    { id: "38", name: "Race Course",                lat: 30.3150, lng: 78.0700 },
    { id: "39", name: "Chukkuwala",                 lat: 30.3080, lng: 78.0650 },
    { id: "40", name: "Dharampur",                  lat: 30.3450, lng: 78.0450 },
    // West Dehradun
    { id: "41", name: "Sewla Kalan",                lat: 30.3200, lng: 77.9950 },
    { id: "42", name: "Vijay Colony",               lat: 30.3100, lng: 78.0050 },
    { id: "43", name: "Neshvilla Road",             lat: 30.3260, lng: 78.0280 },
    { id: "44", name: "Araghar Chowk",              lat: 30.3170, lng: 78.0250 },
    // Educational / landmarks
    { id: "45", name: "IIT Roorkee Road Cross",     lat: 30.2950, lng: 77.9800 },
    { id: "46", name: "FRI (Forest Res. Institute)",lat: 30.3420, lng: 78.0320 },
    { id: "47", name: "Tapkeshwar Temple",          lat: 30.3600, lng: 78.0200 },
    { id: "48", name: "Robbers Cave (Guchhupani)",  lat: 30.3800, lng: 78.0450 },
    { id: "49", name: "Pacific Mall",               lat: 30.3370, lng: 78.0410 },
    { id: "50", name: "Premnagar Bus Stand",        lat: 30.2960, lng: 78.0080 },
    { id: "51", name: "Kanwali Road",               lat: 30.3330, lng: 78.0680 },
    { id: "52", name: "Indira Nagar",               lat: 30.3260, lng: 78.0760 },
  ],

  // [from, to, weight(mins), roadType, distance(km)]
  edges: [
    // Core connections
    ["1","6",2,"main",0.4], ["6","1",2,"main",0.4],
    ["1","9",4,"main",1.2], ["9","1",4,"main",1.2],
    ["1","11",5,"main",1.5],["11","1",5,"main",1.5],
    ["6","9",5,"main",1.0], ["9","6",5,"main",1.0],
    ["9","2",4,"main",1.1], ["2","9",4,"main",1.1],
    ["9","7",3,"main",0.8], ["7","9",3,"main",0.8],
    ["9","17",3,"main",0.9],["17","9",3,"main",0.9],
    ["2","3",2,"main",0.5], ["3","2",2,"main",0.5],
    ["2","8",3,"main",0.8], ["8","2",3,"main",0.8],
    ["2","18",5,"main",1.4],["18","2",5,"main",1.4],
    ["3","7",4,"main",1.0], ["7","3",4,"main",1.0],
    ["3","13",6,"local",1.8],["13","3",6,"local",1.8],
    ["7","13",5,"local",1.5],["13","7",5,"local",1.5],
    ["8","12",4,"main",1.0],["12","8",4,"main",1.0],
    ["8","17",2,"main",0.6],["17","8",2,"main",0.6],
    ["4","5",6,"highway",2.5],["5","4",6,"highway",2.5],
    ["4","16",4,"main",1.2],["16","4",4,"main",1.2],
    ["4","19",3,"main",0.9],["19","4",3,"main",0.9],
    ["5","14",7,"highway",3.0],["14","5",7,"highway",3.0],
    ["12","4",5,"main",1.4],["4","12",5,"main",1.4],
    ["12","16",3,"main",0.9],["16","12",3,"main",0.9],
    ["16","18",6,"main",1.8],["18","16",6,"main",1.8],
    ["16","19",4,"main",1.1],["19","16",4,"main",1.1],
    ["19","14",8,"highway",3.2],["14","19",8,"highway",3.2],
    ["13","12",5,"local",1.5],["12","13",5,"local",1.5],
    ["11","10",4,"main",1.2],["10","11",4,"main",1.2],
    ["11","15",8,"highway",4.0],["15","11",8,"highway",4.0],
    ["10","15",6,"main",2.2],["15","10",6,"main",2.2],
    ["15","20",10,"highway",5.5],["20","15",10,"highway",5.5],
    ["6","11",4,"main",1.3],["11","6",4,"main",1.3],
    ["2","4",10,"main",3.0],["4","2",10,"main",3.0],
    ["18","9",5,"main",1.5],["9","18",5,"main",1.5],
    // Hospital connections
    ["21","2",3,"main",0.9],["2","21",3,"main",0.9],
    ["21","8",2,"main",0.7],["8","21",2,"main",0.7],
    ["22","4",4,"main",1.1],["4","22",4,"main",1.1],
    ["22","5",5,"highway",2.0],["5","22",5,"highway",2.0],
    ["23","34",3,"main",0.9],["34","23",3,"main",0.9],
    ["23","35",4,"main",1.2],["35","23",4,"main",1.2],
    ["24","9",2,"main",0.5],["9","24",2,"main",0.5],
    ["24","2",3,"main",0.8],["2","24",3,"main",0.8],
    ["25","9",2,"main",0.6],["9","25",2,"main",0.6],
    ["25","6",3,"main",0.9],["6","25",3,"main",0.9],
    // North connections
    ["26","5",5,"highway",2.2],["5","26",5,"highway",2.2],
    ["26","40",4,"main",1.3],["40","26",4,"main",1.3],
    ["27","14",6,"main",2.5],["14","27",6,"main",2.5],
    ["27","28",5,"local",1.8],["28","27",5,"local",1.8],
    ["28","29",3,"main",1.0],["29","28",3,"main",1.0],
    ["28","51",4,"main",1.2],["51","28",4,"main",1.2],
    ["29","12",3,"main",0.9],["12","29",3,"main",0.9],
    ["29","51",3,"main",1.0],["51","29",3,"main",1.0],
    ["30","18",4,"main",1.3],["18","30",4,"main",1.3],
    ["30","43",3,"main",1.0],["43","30",3,"main",1.0],
    ["30","44",3,"main",0.9],["44","30",3,"main",0.9],
    // South connections
    ["33","10",5,"main",1.8],["10","33",5,"main",1.8],
    ["33","34",4,"main",1.3],["34","33",4,"main",1.3],
    ["34","7",4,"main",1.2],["7","34",4,"main",1.2],
    ["34","35",4,"main",1.3],["35","34",4,"main",1.3],
    ["35","38",5,"main",1.6],["38","35",5,"main",1.6],
    ["35","39",4,"main",1.4],["39","35",4,"main",1.4],
    // East connections
    ["36","14",5,"main",1.7],["14","36",5,"main",1.7],
    ["36","27",6,"local",2.2],["27","36",6,"local",2.2],
    ["37","36",3,"local",1.1],["36","37",3,"local",1.1],
    ["37","51",4,"main",1.3],["51","37",4,"main",1.3],
    ["38","13",4,"main",1.3],["13","38",4,"main",1.3],
    ["38","39",3,"local",1.0],["39","38",3,"local",1.0],
    ["39","7",5,"main",1.7],["7","39",5,"main",1.7],
    ["52","13",3,"local",1.0],["13","52",3,"local",1.0],
    ["52","51",3,"main",1.1],["51","52",3,"main",1.1],
    // West connections
    ["41","42",4,"main",1.4],["42","41",4,"main",1.4],
    ["41","32",8,"highway",4.5],["32","41",8,"highway",4.5],
    ["42","10",4,"main",1.3],["10","42",4,"main",1.3],
    ["42","50",3,"main",1.1],["50","42",3,"main",1.1],
    ["43","44",2,"main",0.7],["44","43",2,"main",0.7],
    ["43","9",4,"main",1.3],["9","43",4,"main",1.3],
    ["44","25",3,"main",0.9],["25","44",3,"main",0.9],
    ["44","6",4,"main",1.3],["6","44",4,"main",1.3],
    // Landmarks
    ["46","18",4,"main",1.2],["18","46",4,"main",1.2],
    ["46","40",5,"main",1.5],["40","46",5,"main",1.5],
    ["49","16",2,"main",0.7],["16","49",2,"main",0.7],
    ["49","18",3,"main",1.0],["18","49",3,"main",1.0],
    ["40","16",3,"main",1.0],["16","40",3,"main",1.0],
    ["50","15",3,"main",1.0],["15","50",3,"main",1.0],
    ["51","12",3,"main",1.0],["12","51",3,"main",1.0],
    ["20","32",8,"highway",4.0],["32","20",8,"highway",4.0],
    ["20","33",6,"main",2.5],["33","20",6,"main",2.5],
  ]
};

module.exports = dehradunGraph;