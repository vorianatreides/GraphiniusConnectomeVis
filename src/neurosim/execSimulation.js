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
    console.log('calculating and visualizing epoch...' + epoch++);
    var nodes = window.graph.getNodes();
    var und_edges = window.graph.getUndEdges();
    var dir_edges = window.graph.getDirEdges();

    sim.Sine = true;
    var result = sim.calculateEpoch();


    for ( var node in nodes ) {
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
    }

    window.requestAnimationFrame( render.update );
    // console.log( result );
  }
}


module.exports = {
  initSimulation: initSimulation,
  execSimulation: execSimulation
};