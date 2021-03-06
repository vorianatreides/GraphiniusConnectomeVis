// window.$G = require('graphinius');

var config = {
  neurosim: {
    params: {
      threshold: 0.6,
      amplitude: 1,
      steepness: 15,
      activation: "sigmoidal",
      noise: 0,
      percentage: 0
    },
    control: {
      RUNNING: false
    }
  },
  // keys for handling events
  keys: {
    KEY_A: 97,
    KEY_D: 100,
    KEY_W: 119,
    KEY_S: 115,
    KEY_R: 114,
    KEY_F: 102,
    KEY_X: 120,
    KEY_Y: 121,
    KEY_C: 99,
    KEY_SX: 88,
    KEY_SY: 89,
    KEY_SC: 67
  },
  // default size of canvas/container
  container: {
    element: document.querySelector("#main_vis"),
    WIDTH: 1200,
    HEIGHT: 900
  },
  // default render parameters
  defaults: {
    node_size: 4,
    background_color: 0x000000,
    transparent: false,
    opacity: 0.2, //default is 1; range: 0.0 - 1.0
    linewidth: 1,
    
    //camera settings
    fov: 50,
    near: 0.1,
    far: 5000,
    
    //raycaster
    highlight_node_color: new THREE.Color(0xf1ecfb),

    //zoom
    ZOOM_FACTOR: 0.05,
    MAX_FOV: 1200, //zoom out
    MIN_FOV: 1, //zoom in

    //distance to move
    delta_distance: 10,
    //rotation step
    delta_rotation: 0.05,

    //for coloring
    randomColors: [
      0xc4d0db, 0xf6b68a, 0xffff33, 0x003fff,
      0xec2337, 0x008744, 0xffa700, 0x1df726,
      0x8fd621, 0x2d049b, 0x873bd3, 0x85835f
    ],
    
    //for bfs and dfs coloring
    bfs_gradient_end_color: 0x901A43, // open todo red
    bfs_gradient_middle_color: 0xfff730, // lemontiger yellow
    bfs_gradient_start_color: 0x079207, // dark shit green
    
    //color for colorSingleEdge/Node, addEdge
    edge_color: {
      r: 127,
      g: 255,
      b: 212
    },
    node_color: {
      r: 255,
      g: 20,
      b: 20
    },
    
    //mouse wheel - firefox
    //minus: firefox has different wheel direction
    //chromium etc -> factor 120, firefox -> 3
    firefox_wheel_factor: -40,
    
    //stop calculation of force directed layout
    stop_fd: false
  },
  globals: {
    mouse: new THREE.Vector2(),
    graph_dims: {
      MIN_X: undefined,
      MAX_X: undefined,
      AVG_X: undefined,
      MIN_Y: undefined,
      MAX_Y: undefined,
      AVG_Y: undefined,
      MIN_Z: undefined,
      MAX_Z: undefined,
      AVG_Z: undefined
    },
    selected_node: undefined,
    TWO_D_MODE: false,
    INTERSECTED: {
      index: 0, color: new THREE.Color(), node: null
    },
    raycaster: new THREE.Raycaster(),
    renderer: new THREE.WebGLRenderer({antialias: false, alpha: true}),
    scene: new THREE.Scene(),
    network: new THREE.Group(),
    camera: null
  },
  callbacks: {
    node_intersects: []
  },
  force_layout: {
    fdLoop: null,
    fdStop: null,
    magnitude: 2,
    speed: 2
  }
};
module.exports = config;
