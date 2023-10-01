// Tiny TFJS train / predict example.

import * as tf from '@tensorflow/tfjs';
async function run() {

    const model = await tf.loadLayersModel('model.json');


    const circ1 = document.getElementById('light1')
    const circ2 = document.getElementById('light2')
    const circ3 = document.getElementById('light3')

    circ1.style.backgroundColor = '#000000';

  }
  
  run();