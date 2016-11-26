var neuroSim = require('neuro-graphs').$NG;

console.dir( neuroSim ); 

var RUNNING = false;
var sim;
var epoch = 0;

function initSimulation() {
  if ( !window.graph ) {
    throw new Error('no graph loaded yet...');
  }

  sim = new neuroSim.Simulation.Simulation( window.graph );

  execSimulation();
}


function execSimulation() {

  window.requestAnimationFrame( execSimulation );

  // Here we need to calculate epochs
  if ( RUNNING ) {
    console.log('calculating and visualizing epoch...' + epoch++);

    var result = sim.calculateEpoch();
    console.log( result );
  }

}


function startSimulation() {
  RUNNING = true;
}


function pauseSimulation() {
  RUNNING = false;
}


module.exports = {
  initSimulation: initSimulation,
  startSimulation: startSimulation,
  pauseSimulation: pauseSimulation,
  execSimulation: execSimulation
};