var myCircos = new Circos({
    container: '#app',
    width: 1000,
    height: 700,
});

var configuration = {
  innerRadius: 150,
  outerRadius: 180,
  cornerRadius: 0,
  gap: 0.04, // in radian
  labels: {
    display: true,
    position: 'center',
    size: '14px',
    color: '#fff',
    opacity: 0.3,
    radialOffset: 10,
  },
  ticks: {
    display: false,
    color: 'grey',
    spacing: 10000000,
    labels: true,
    labelSpacing: 10,
    labelSuffix: '',
    labelDenominator: 1000000,
    labelDisplay0: true,
    labelSize: '10px',
    labelColor: '#000000',
    labelFont: 'default',
    majorSpacing: 5,
    size: {
      minor: 2,
      major: 5,
    }
  },
  clickCallback: null
}

// elevation from https://www.freemaptools.com/elevation-finder.htm
var data2 = [
    {start: 1950, end: 1958, elevation: 89.0, livingAs: 'child', address: '41 Arcadia Road', town: 'Durban', county: 'Durban', country: 'South Africa', lat: -29.8380063, lon: 30.9917343},
    {start: 1958, end: 1960, elevation: 88.2, livingAs: 'child', address: 'St Thomas Road', town: 'Durban', county: 'Durban', country: 'South Africa', lat: -29.8454735, lon: 30.9989991},  
    {start: 1960, end: 1960, elevation: 89.4, livingAs: 'child', address: '', town: 'Reigate', county: 'Surry', country: 'England',lat: 51.2355999, lon:-0.2289633},
    {start: 1961, end: 1962, elevation: 42.1, livingAs: 'child', address: '“Tandala”, Chesworth Lane', town: 'Horsham', county: 'Sussex', country: 'England', lat: 51.0578198, lon:-0.3299793,},
    {start: 1962, end: 1964, elevation: 48.2, livingAs: 'child', address: '“Denes”', town: 'East Chiltington', county: 'Sussex', country: 'England', lat: 50.9192474, lon:-0.0548677},
    {start: 1964, end: 1964, elevation: 37.1, livingAs: 'child', address: 'Krynall Court', town: 'Cape Town', county: 'Cape Town', country: 'South Africa', lat:-33.924869, lon:18.424055},
    {start: 1965, end: 1966, elevation: 194.7, livingAs: 'child', address: '“Smiling Through”, 1 Braemar Road,Oranjezicht', town: 'Cape Town', county: 'Cape Town', country: 'South Africa', lat: -33.9451655, lon:18.4077513},
    {start: 1966, end: 1966, elevation: 5.6, livingAs: 'child', address: 'Eastport Lane', town: 'Lewes', county: 'East Susex', country: 'England', lat: 50.8700964, lon:0.0061513},
    {start: 1967, end: 1967, elevation: 74.5, livingAs: 'child', address: '', town: 'Hitchin', county: 'Hertfordshire', country: 'England', lat: 51.9565275, lon:-0.2937631},
    {start: 1967, end: 1969, elevation: 74.5, livingAs: 'student', address: '11 Benslow Rise', town: 'Hitchin', county: 'Hertfordshire', country: 'England',lat: 51.9516075, lon:-0.2671149},
    {start: 1970, end: 1971, elevation: 206.8, livingAs: 'student', address: '“Lyn Bank”', town: 'Brendon', county: 'Devon', country: 'England', lat: 51.199022,lon: -3.8052345,},
    {start: 1971, end: 1972, elevation: 0, livingAs: 'student', address: '“Kingsdown House”', town: 'Teignmouth', county: 'Devon', country: 'England',lat: 50.5553694,lon: -3.5170777},
    {start: 1972, end: 1974, elevation: 54.0, livingAs: 'married', address: 'Hanover Terrance', town: 'Brighton', county: 'Sussex', country: 'England', lat: 50.8301555, lon:-0.1319886},
    {start: 1974, end: 1974, elevation: 92.0, livingAs: 'married', address: 'Sherwood Crescente', town: 'Market Drayton', county: 'Shropshire', country: 'England', lat: 52.8982439,lon: -2.5097861},
    {start: 1974, end: 1976, elevation: 13.0, livingAs: 'married at parents', address: '', town: 'Newton Abbot', county: 'Devon', country: 'England', lat: 50.5286976, lon:-3.6277634},
    {start: 1974, end: 1976, elevation: 54.0, livingAs: 'married at parents', address: 'Elm Drive', town: 'Brighton', county: 'Sussex', country: 'England', lat: 50.8422435,lon:-0.1966622},
    {start: 1976, end: 1982, elevation: 48.0, ivingAs: 'married with children', address: '11 Amroth Mews', town: 'Leamington Spa', county: 'Warks', country: 'England', lat: 52.2824413,lon:-1.5156296},
    {start: 1982, end: 1996, elevation: 130.0, livingAs: 'married with children', address: '57 Seven Star Road', town: 'Solihull', county: 'Warks', country: 'England', lat: 52.4218477, lon: -1.7884191},
    {start: 1996, end: 2009, elevation: 125.0, livingAs: 'married with children', address: 'Coney Brae, 155 West Malvern Road', town: 'Malvern', county: 'Worcestershire', country: 'England',lat: 52.1176171,lon:-2.3476166},
    {start: 2009, end: 2015, elevation: 125.0, livingAs: 'married', address: 'Perrycroft Lodge, Jubilee Drive', town: 'Upper Colwall', county: 'Worcestershire', country: 'England', lat: 52.0742539,lon:-2.3445648},
    {start: 2015, end: 2017, elevation: 125.0, livingAs: 'married', address: 'Larchdale, Chase Road', town: 'Upper Colwall', county: 'Worcestershire', country: 'England', lat: 52.0823245,lon:-2.3397809},
]

var start = data2.reduce(function(prev, next) {
     return next.start < prev ? next.start : prev;
}, 200000);
var end = data2.reduce(function(prev, next) {
     return next.end > prev ? next.end : prev;
}, 0);
var higher = data2.reduce(function(prev, next) {
    return next.elevation > prev ? next.elevation : prev;
}, 0)
var total = end - start;
var minLat = data2.reduce(function(prev, next) { return next.lat < prev ? next.lat : prev; }, 90);
var maxLat = data2.reduce(function(prev, next) { return next.lat > prev ? next.lat : prev; }, -90);


// generated here http://tools.medialab.sciences-po.fr/iwanthue/
var colorScale = d3.scaleOrdinal(["#efbe79",
"#4ed9f6",
"#e5df39",
"#4ee9da",
"#f1c23f",
"#5de9b5",
"#c7ec3c",
"#97e1a9",
"#7de843",
"#cfdb8f",
"#6ceb81",
"#d7d766",
"#a4e492",
"#b0e163",
"#d8f690"]);
var countries = data2.reduce(function(prev, next) {
    if (prev.indexOf(next.country) === -1) {
        prev.push(next.country);
    }
    return prev;
}, []);

var counties = data2.reduce(function(prev, next) {
    if (prev.indexOf(next.county) === -1) {
        prev.push(next.county);
    }
    return prev;
}, []);

console.log(countries, counties, colorScale);
data = data2.map(function(row, i) {
    return {
        id: 'place' + i,
        len: row.end + 1 - row.start,
        label: row.end + 1 - row.start,
        color: colorScale(counties.indexOf(row.county))
    }
})

console.log(data);

myCircos.layout(data, configuration);

var textData = data2.map(function(row, i) {
    return {
        block_id: 'place' + i, 
        position: (row.end + 1 - row.start)  / 2,
        value: row.town
    };
})

// Text label
myCircos.text(
    'text',
    textData,
    {
      innerRadius: 1.12,
      outerRadius: 1.3,
      style: {
        'font-size': 12,
        fill: 'rgb(238, 238, 238)',
        opacity:0.4,
      },
    
    },
);

// Elevation
var elevationData = data2.map(function(row, i) {
    return {
        block_id: 'place' + i, 
        position: (row.end + 1 - row.start)  / 2,
        value: row.elevation,
        town: row.town,
    }
})
console.log('elevationData', elevationData);
myCircos.line('elevation', elevationData, {
      innerRadius: 0.4,
      outerRadius: 0.65,
      maxGap: 1000,
      min: 0,
      max: higher,
      color: '#222222',
      fill: true,
      direction: 'out',
      thickness: 2,
      axes: [
        {
          spacing: higher/ 30,
          thickness: 1,
          color: '#666666'
        }
      ],
      backgrounds: [
        {
          start: 0,
          end: higher,
          color: '#fff',
          opacity: 0.5
        }
      ]
    });

myCircos.scatter('scatter', elevationData, {
      innerRadius: 0.4,
      outerRadius: 0.65,
      maxGap: 1000,
      min: 0,
      max: higher,
      color: '#222222',
      axes: [],
      tooltipContent: function(datum, index) {
          return `Elevation: ${datum.town}: ${datum.value} m`;
      }
    });

// Lat long

var latlonData = [];
data2.forEach(function(row, i) {
    var latScale = d3.scaleLinear()
    .domain([minLat, maxLat])
    .range([0, row.end + 1 - row.start]);
    console.log('scale', row.town, row.lat, latScale(row.lat));
    latlonData.push(Object.assign({}, row, {
        block_id: 'place' + i, 
        position: latScale(row.lat),
        value: row.lon,
    }))
})
console.log('latlonData', latlonData);

myCircos.scatter('latlon', latlonData, {
      innerRadius: 0.7,
      outerRadius: 0.9,
      thickness: 0,
      maxGap: 1000,
      min: 0,
      color: colorScale(8),
      axes: [
        {
          spacing: 4.5,
          thickness: 1,
          opacity: 0.3,
          color: colorScale(1)
        }
      ],
      tooltipContent: function(datum, index) {
          console.log(datum);
          return `${datum.town}: ${datum.lat},${datum.lon}`;
      }
    });


myCircos.render();