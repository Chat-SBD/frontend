// Tiny TFJS train / predict example.
async function run() {
    // Create a simple model.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
  
    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
  
    // Generate some synthetic data for training. (y = 2x - 1)
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
  
    // Train the model using the data.
    await model.fit(xs, ys, {epochs: 250});
  
    // Use the model to do inference on a data point the model hasn't seen.
    // Should print approximately 39.

    const modelOutput = model.predict(tf.tensor2d([20], [1, 1])).dataSync();

    document.getElementById('micro-out-div').innerText = modelOutput

    const circ1 = document.getElementById('light1')
    const circ2 = document.getElementById('light2')
    const circ3 = document.getElementById('light3')


    if (modelOutput > 38.7) {
        const impCol = '#123456'
    }
    else if (modelOutput < 38.2) {
        const impCol = '#FFFFFF'
    }
    else {
        const impCol = '#A2A2A2'
    }
    circ1.style.backgroundColor = impCol
    circ2.style.backgroundColor = impCol
    circ3.style.backgroundColor = impCol
  }
  
  run();