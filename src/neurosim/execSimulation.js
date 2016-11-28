var neuroSim = require('neuro-graphs').$NG;
var mutate = require('../core/mutate.js');
var render = require('../core/render.js');

console.dir( neuroSim ); 

var RUNNING = false;
var sim;
var neuron;
var epoch = 0;
/*var properties = {
  threshold: 0.6,
  amplitude: 1,
  steepness: 15
}*/
var threshold = 0.6; // = sim.Threshold;
var amplitude = 1; // = sim.C;
var steepness = 15; // = sim.K;

function initSimulation() {
  if ( !window.graph ) {
    throw new Error('no graph loaded yet...');
  }

  sim = new neuroSim.Simulation.Simulation( window.graph );
  //neuron = new neuroSim.Neuron.Neuron ( window.graph.getNodeById ("ADAL").degree );
  console.log (window.graph.getNodeById ("ADAL").degree);

  execSimulation();
}


function execSimulation() {

  window.requestAnimationFrame( execSimulation );

  // Here we need to calculate epochs
  if ( RUNNING ) {
    console.log('calculating and visualizing epoch...' + epoch++);

    sim.Sine = true;
    var result = sim.calculateEpoch();
    mutate.colorSingleNode (window.graph.getNodeById ("ADAL"), 0xaabb00);
    render.update;
    //render.update();
    //render.updateGraph();
    console.log( result );
  }

}


function startSimulation() {
  RUNNING = true;
}


function pauseSimulation() {
  RUNNING = false;
  console.log ("Global threshold is: " + threshold);
  console.log ("Global amplitude is: " + amplitude);
  console.log ("Global steepness is: " + steepness);
}


function changeParams (querySelector) {
  threshold = querySelector.threshold;
  amplitude = querySelector.amplitude;
  steepness = querySelector.steepness;
}


module.exports = {
  initSimulation: initSimulation,
  startSimulation: startSimulation,
  pauseSimulation: pauseSimulation,
  execSimulation: execSimulation,
  changeParams: changeParams
};