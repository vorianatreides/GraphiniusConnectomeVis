var neuroSim = require('neuro-graphs').$NG;
var mutate = require('../core/mutate.js');
var render = require('../core/render.js');
var neuroParams = require("../core/init.js").neurosim.params;
var simParams = require("../core/init.js").neurosim.control;

console.dir( neuroSim );
console.dir( render );
console.dir( "Render.update is: " + render.update );

var sim;
var neuron;
var epoch = 0;


function initSimulation() {
  if ( !window.graph ) {
    throw new Error('no graph loaded yet...');
  }
  // TODO: implement
  // if ( "graph not rendered yet..." ) {
  //   killSelf();
  // }

  sim = new neuroSim.Simulation.Simulation( window.graph );
  //neuron = new neuroSim.Neuron.Neuron ( window.graph.getNodeById ("ADAL").degree );
  // console.log (window.graph.getNodeById ("ADAL").degree);

  execSimulation();
}


function execSimulation() {

  window.requestAnimationFrame( execSimulation );

  // Here we need to calculate epochs
  if ( simParams.RUNNING ) {
    var nodes = window.graph.getNodes();
    var und_edges = window.graph.getUndEdges();
    var dir_edges = window.graph.getDirEdges();
    sim.Sine = true;
    var result = sim.calculateEpoch();
    var colors = [];
    var ctr = 0;
    for (var node in nodes) {
      colors[node] = interpolateColors (result[ctr++], -1, 1);
      mutate.colorSingleNode (nodes[node], colors[node]);
    }
    for ( var undy in und_edges ) {
      mutate.colorSingleEdge ( und_edges[undy], colors[und_edges[undy].getNodes().a.getID()], colors[und_edges[undy].getNodes().b.getID()]);
    }
    for ( var diry in dir_edges ) {
      mutate.colorSingleEdge ( dir_edges[diry], colors[dir_edges[diry].getNodes().a.getID()], colors[dir_edges[diry].getNodes().b.getID()]);
    }
    /*for ( var node in nodes ) {
      var random_color = +('0x'+Math.random().toString(16).substr(2, 6));
      mutate.colorSingleNode ( nodes[node], random_color);
    }
    for ( var undy in und_edges ) {
      var random_color_a = +('0x'+Math.random().toString(16).substr(2, 6));
      var random_color_b = +('0x'+Math.random().toString(16).substr(2, 6));
      mutate.colorSingleEdge ( und_edges[undy], random_color_a, random_color_b);
    }
    for ( var diry in dir_edges ) {
      var random_color_a = +('0x'+Math.random().toString(16).substr(2, 6));
      var random_color_b = +('0x'+Math.random().toString(16).substr(2, 6));
      mutate.colorSingleEdge ( dir_edges[diry], random_color_a, random_color_b);
    }*/

    window.requestAnimationFrame( render.update );
  }
}


function interpolateColors (result, min, max) {
  if (sim.Sine) {
    min = -1;
    max = 1;
  }
  var start_color = 0x0000ff,
      middle_color = 0x00ff00,
      end_color = 0xff0000,
      first_color = start_color,
      second_color = middle_color,
      low = min,
      up = max,
      half = (up - low) / 2,
      middle = low + half;

   var mod_half = result - low;
   if (result > middle) {
     first_color = middle_color;
     second_color = end_color;
     mod_half = result - middle;
   }
   return Math.round (first_color + (second_color - first_color) / half * mod_half);
}


function execOnce() {
  var nodes = window.graph.getNodes();
  var und_edges = window.graph.getUndEdges();
  var dir_edges = window.graph.getDirEdges();
  sim.Sine = true;
  var result = sim.calculateEpoch();
  var colors = [];
  var ctr = 0;
  for (var node in nodes) {
    colors[node] = interpolateColors (result[ctr++], -1, 1);
    mutate.colorSingleNode (nodes[node], colors[node]);
  }
  for ( var undy in und_edges ) {
    mutate.colorSingleEdge ( und_edges[undy], colors[und_edges[undy].getNodes().a.getID()], colors[und_edges[undy].getNodes().b.getID()]);
  }
  for ( var diry in dir_edges ) {
    mutate.colorSingleEdge ( dir_edges[diry], colors[dir_edges[diry].getNodes().a.getID()], colors[dir_edges[diry].getNodes().b.getID()]);
  }

  window.requestAnimationFrame( render.update );
}


module.exports = {
  initSimulation: initSimulation,
  execSimulation: execSimulation,
  execOnce: execOnce
};