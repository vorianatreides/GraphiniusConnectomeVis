var force = require("../core/init.js").force_layout;
var switchToFullScreen = require("./fullscreen").switchToFullScreen;
var neuroSim = require("../neurosim/execSimulation");


if(localStorage.getItem("directed") == 1) {
  document.querySelector("#directed").checked = true;
  document.querySelector("#undirected").checked = false;
} 
else {
  document.querySelector("#directed").checked = false;
  document.querySelector("#undirected").checked = true;
}

directed.onclick = function() {
  localStorage.setItem("directed", Number(1));
  window.location.reload();
};

undirected.onclick = function() {
  localStorage.setItem("directed", Number(0));
  window.location.reload();
};

function setDirectionUnchecked() {
  document.querySelector("#directed").checked = false;
  document.querySelector("#undirected").checked = false;
}


function startStopNeuroSim() {
  //start force directed layout
  if(!document.querySelector("#forceLayoutSwitch").checked) {
    neuroSim.startSimulation();
  }
  //stop force directed layout
  else {
    neuroSim.pauseSimulation();
  }
}


function startStopHistory() {
  if(!document.querySelector("#historySwitch").checked) {
    console.log("History OFF...");
    // force.fdLoop();
  }
  else {
    console.log("History ON...");
    // force.fdStop();
  }
}

// document.querySelector("#force_magnitude").addEventListener('input', function(event) {
//   var mag = +document.querySelector("#force_magnitude").value;
//   force.magnitude = mag;
//   document.querySelector("#force_mag_display").innerHTML = mag;
// });
//
// document.querySelector("#force_speed").addEventListener('input', function(event) {
//   var speed = +document.querySelector("#force_speed").value;
//   force.speed = speed;
//   document.querySelector("#force_speed_display").innerHTML = speed;
// });
//
// document.querySelector("#force_speed").addEventListener('input', function(event) {
//   var speed = +document.querySelector("#force_speed").value;
//   force.speed = speed;
//   document.querySelector("#force_speed_display").innerHTML = speed;
// });

module.exports = {
  startStopNeuroSim: startStopNeuroSim,
  startStopHistory: startStopHistory,
  setDirectionUnchecked: setDirectionUnchecked
};
