var init            = require("./src/core/init.js"),
    render          = require("./src/core/render.js"),
    mutate          = require("./src/core/mutate.js"),
    hist_reader     = require("./src/history/history_reader.js"),
    main_loop       = require("./src/history/main_loop.js"),
    readCSV         = require("./src/input/readCSV.js"),
    readJSON        = require("./src/input/readJSON.js"),
    const_layout    = require("./src/layout/constant_layout.js"),
    force_layout    = require("./src/layout/force_directed.js"),
    generic_layout  = require("./src/layout/generic_layout.js"),
    fullscreen      = require("./src/view/fullscreen.js"),
    interaction     = require("./src/view/interaction.js"),
    navigation      = require("./src/view/navigation.js"),
    controlUI       = require("./src/view/controlUI.js"),
    neuroSim        = require("./src/neurosim/execSimulation.js");


var out = typeof window !== 'undefined' ? window : global;

out.$GV = {
  core: {
    init: init,
    render: render,
    mutate: mutate
  },
  history: {
    reader: hist_reader,
    loop: main_loop
  },
  input: {
    csv: readCSV,
    json: readJSON
  },
  layout: {
    const: const_layout,
    force: force_layout,
    generic: generic_layout
  },
  view: {
    fullscreen: fullscreen,
    interaction: interaction,
    navigation: navigation,
    controlUI: controlUI
  },
  sim: {
    neuroSim: neuroSim
  }
};

module.exports = {
  $GV:	out.$GV
};
