/* Get elements for open/close modal */
let openModal = document.getElementById('openModal');
let navOpen = document.getElementById('navOpen');
let closeModal = document.getElementById('closeModal');
let navClose = document.getElementById('navClose');
let body = document.querySelector('.body')

/* Listenners for open/close modal */
iconModal.addEventListener('click', () => {
  navOpen.classList.toggle('hidden');
  navClose.classList.toggle('hidden');
  iconModal.classList.toggle('open');
  body.classList.toggle('bodyActive')
});

/* function for dropdown onclick nav */
let navIcons = document.querySelectorAll('.nav__blocks--icons')
for(elements of navIcons) {
  elements.addEventListener('click', () => {

    if (event.target.closest('ul')) {
      let elementsBlocks = (event.target.closest('ul').nextElementSibling);
      elementsBlocks.classList.toggle('none');
      let icon = (event.target.closest('ul').lastElementChild);
      icon.classList.toggle('icon__rotate');
    }
  });
};

/* function for user change or logout */
let user = document.getElementById('user');
let userDropdown = document.getElementById('userDropdown');
let icon = document.querySelector('.header__section--icon');

user.addEventListener('click', () => {
  userDropdown.classList.toggle('active');
  icon.classList.toggle('icon__rotate');
})

/* function for lang & flag */
let language = document.getElementById('lang');
let flag = document.getElementById('langImg');

language.addEventListener('click', () => {
  let target = event.target.value;
  if (target == 'RU') {
    flag.src = './images/ru.png';
  } else if (target == 'ARM') {
    flag.src = './images/Flag_of_Armenia.png';
  } else {
    flag.src = './images/-Flag_of_the_United_Kingdom.png';
  }
});

/* dinamic diagram in 3 lines № 1 */
let ctx = document.querySelector('#myChart').getContext('2d');
const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const datapoints2 = [20, 60, 20, -40, -30, 30, 60];
const datapoints3 = [-30, 30, 60, 20, -40, -30, 20];
const datapoints = [40, 50, 0, -40, -20, 40, 60];
let myChart = new Chart(ctx, {

    type: 'line',
    data: {
        labels: labels,
        datasets: [
          {
            label: 'Clicks',
            data: datapoints2,
            borderColor: '#fbcf71',
            backgroundColor: '#fbcf71',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          }, 
          {
            label: 'Page View',
            data: datapoints3,
            borderColor: '#1f7bb6',
            backgroundColor: '#1f7bb6',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
          },
          {
            label: 'Sign ups',
            data: datapoints,
            borderColor: '#089292',
            backgroundColor: '#089292',
            borderWidth: 2,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.3,
          }, 
        ]
    },
    options: {
      responsive: true,
        plugins: {
            title: {
              display: true,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
              display: false,
              title: {
                display: true
              }
            },
            y: {
              display: true,
              title: {
                display: true,
              },
              suggestedMin: -60,
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'end',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 20,
                    textAlign: 'right',
                    color: '#c0c0c0',
                },
            },
        },
    },
});
Chart.defaults.font.size = 12;
/* /dinamic diagram in 3 lines № 1 */


/* dinamic Doughnut */
let ctz = document.querySelector('#myDoughnut').getContext('2d');

const data1 = {
  labels: [
    'Total Views',
    'Total Clicks',
    'Signups'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [200, 65, 22],
    backgroundColor: [
      '#fbcf71',
      '#1f7bb6',
      '#089292'
    ],
    hoverOffset: 1,
    borderWidth: 0,
  }]
};

let myDoughnut = new Chart(ctz, {
    type: 'doughnut',
    data: data1,
    options: {
      responsive: true,
      plugins: {
        legend: {
            display: false,
            position: 'bottom',
            align: 'start',
            labels: {
                boxWidth: 6,
                boxHeight: 6,
                padding: 10,
                textAlign: 'left',
                color: '#ffffff',
                usePointStyle: true,
            },
        },
    },
    }
});
/* /dinamic Doughnut */

/* dinamic map */
// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(30)
  .center([0,50])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    }
/* /dinamic map */


