var force = require("../core/init.js").force_layout;
var switchToFullScreen = require("./fullscreen").switchToFullScreen;
var neuroParams = require("../core/init.js").neurosim.params;
var simParams = require("../core/init.js").neurosim.control;



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


sigmoidal.onclick = function() {
  neuroParams.activation = "sigmoidl";
};

tanh.onclick = function() {
  neuroParams.activation = "tanh";
};

step.onclick = function() {
  neuroParams.activation = "step";
};

rlu.onclick = function() {
  neuroParams.activation = "rlu";
};

sin.onclick = function() {
  neuroParams.activation = "sin";
};


function startStopNeuroSim() {
  //start force directed layout
  if(!document.querySelector("#forceLayoutSwitch").checked) {
    simParams.RUNNING = true;
  }
  //stop force directed layout
  else {
    simParams.RUNNING = false;
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

document.querySelector("#threshold").addEventListener('input', function(event) {
  var thresh = +document.querySelector("#threshold").value;
  neuroParams.threshold = thresh;
  // console.log( "new thresh: " + thresh );
  document.querySelector("#thresh_display").innerHTML = thresh;
});

document.querySelector("#amplitude").addEventListener('input', function(event) {
  var amp = +document.querySelector("#amplitude").value;
  neuroParams.amplitude = amp;
  document.querySelector("#amp_display").innerHTML = amp;
});

document.querySelector("#steepness").addEventListener('input', function(event) {
  var k = +document.querySelector("#steepness").value;
  neuroParams.steepness = k;
  document.querySelector("#steep_display").innerHTML = k;
});

document.querySelector("#noise").addEventListener('input', function(event) {
  var noise = +document.querySelector("#noise").value;
  neuroParams.noise = noise;
  document.querySelector("#noise_display").innerHTML = noise;
});

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
