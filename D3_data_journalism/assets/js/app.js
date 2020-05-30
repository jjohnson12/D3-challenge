function makeBasicChart() {

  let svgWidth = 960;
  let svgHeight = 500;
  
  let margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left:100
  };

// Set margins for visualization
  let width = svgWidth - margin.left - margin.right;
  let height = svgHeight - margin.top - margin.bottom;


// Create SVG and add attributes to it
  let svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

let basicChart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data from data.csv file
d3.csv("assets/data/data.csv")
  .then(function(censusData){

  console.log(censusData);

//interate through data.csv file, make integers where needed
censusData.forEach(function(data) {
  data.healthcare = +data.healthcare;
  data.poverty = +data.poverty;
  data.abr = data.abbr;
});

//Create the scales 
let xLinearScale = d3.scaleLinear()
.domain([8.5, d3.max(censusData, d => d.poverty)])
.range([0, width]);

let yLinearScale = d3.scaleLinear()
.domain([3.5, d3.max(censusData, d => d.healthcare)])
.range([height, 0]);

  // Create chart's axes
  let xAxis = d3.axisBottom(xLinearScale);
  let yAxis = d3.axisLeft(yLinearScale);

//Append x and y axis basicChart
  basicChart.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

  basicChart.append("g")
  .call(yAxis);

//Create Circles
  let circlesGroup = basicChart.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 14)
      .attr("fill", "blue")
      .attr("opacity", ".6")
      .attr("stroke-width", "1")
      .attr("stroke", "black");

      basicChart.select("g")
      .selectAll("circle")
      .data(censusData)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare))
      .attr("dy",-395)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "black");

//Plot labels
  basicChart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 -250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

  basicChart.append("text")
      .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
});
}
makeBasicChart();