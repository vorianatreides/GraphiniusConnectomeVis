var neuroSim = require('neuro-graphs').$NG;
var mutate = require('../core/mutate.js');
var render = require('../core/render.js');
var neuroParams = require("../core/init.js").neurosim.params;
var simParams = require("../core/init.js").neurosim.control;

// TO DO:
// * rlu upper bound
// * Set a random input -> doesn't reset the activation values to 0 !!!
// ^ sine hasn't been implemented correctly -> "break;" missing in the simulation class method
// * find parameters for c elegans

var sim;
// var neuron;
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
    execOnce();
  }
}


function interpolateColors (result, low, up) {
  var start_color = 0x0000ff,
      middle_color = 0x00ff00,
      end_color = 0xff0000,
      first_color = start_color,
      second_color = middle_color,
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
  if (sim.ActivationModel !== neuroParams.activation) {
    sim.setActivationModel (neuroParams.activation);
  }
  if (sim.Threshold !== neuroParams.threshold || sim.Amplitude !== neuroParams.amplitude || sim.Steepness !== neuroParams.steepness || sim.Noise !== neuroParams.noise) {
    sim.Threshold = neuroParams.threshold;
    sim.Amplitude = neuroParams.amplitude;
    sim.Steepness = neuroParams.steepness;
    sim.Noise = !!neuroParams.noise ? (1 / neuroParams.noise - 1) : 0;
  }
  // console.log ("Calculating and visualizing epoch nr: " + epoch++);
  var nodes = window.graph.getNodes();
  var und_edges = window.graph.getUndEdges();
  var dir_edges = window.graph.getDirEdges();
  var result = sim.calculateEpoch();
  var colors = [];
  var ctr = 0;
  for (var node in nodes) {
    colors[node] = interpolateColors (result[ctr++], neuroParams.amplitude * sim.Bounds[0], neuroParams.amplitude * sim.Bounds[1]);
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

  // console.log (neuroParams.amplitude * sim.Bounds[0] + "  " + neuroParams.amplitude * sim.Bounds[1]);
  window.requestAnimationFrame( render.update );
}

function setInputVec() {
  sim.generateInVec(neuroParams.percentage / 100); // Additional implementation necessary!
}



module.exports = {
  initSimulation: initSimulation,
  execSimulation: execSimulation,
  execOnce: execOnce,
  setInputVec: setInputVec
};