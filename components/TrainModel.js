import React, {Component} from 'react';
import shadesData from '../data/shades.json';
import * as tf from '@tensorflow/tfjs';
import "babel-polyfill";
import "../scss/train-model.scss";

class TrainModel extends Component {
  state = ({
    loading: false,
    epoch: '',
    loss: ''
  });
  
  //Converts hexadecimal values to RGB color values
  hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const hexadecimal = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexadecimal);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  trainModel = async (evt) => {
    //evt.target.disabled = true;
    this.setState({
      loading: true
    });
    // Create list of foundation brand and product from the imported shadesData and remove any duplicates
    const foundationLabels = shadesData
      .map(shade => `${shade.brand} - ${shade.product}`)
      .reduce((accumulator, currentShade) => {
        if (accumulator.indexOf(currentShade) === -1) {
          accumulator.push(currentShade);
        }
        return accumulator
      }, []);
    
    // Create list of hexadecimal values of the foundation shades from the imported shadesData
    const hexList = shadesData.map(shade => shade.hex);
    
    // Convert hexadecimal values to RGB color values and store in new list
    const rgbList = hexList.map(hex => this.hexToRgb(hex));
    
    // Create empty array to hold the normalized shade RGB color values
    let shadeColors = [];
    
    // Create empty array to hold the foundation index values
    let foundations = [];
    
    // Loop through each foundation shade in shadesData. 
    // Push its corresponding index value found in foundationLabels into the foundations array
    for (const shade of shadesData) {
      foundations.push(foundationLabels.indexOf(`${shade.brand} - ${shade.product}`));
    }
    
    // Loop through each RGB color in rgbList. 
    // Normalize the RGB color dividing by 255 for each RGB value, store in an array, and then push that array into the shades array
    for (const rgbColor of rgbList) {
      let shadeColor = [rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255];
      shadeColors.push(shadeColor);
    }
  
    // Create a 2D tensor out of the shadeColors array
    // This tensor will act as the inputs to train the model with
    const inputs = tf.tensor2d(shadeColors);
  
    // Create a 1D tensor out of the foundations array
    // Apply tf.oneHot to this tensor to create a tensor of 1 & 0 values out of the 39 possible foundation types.
    const outputs = tf.oneHot(tf.tensor1d(foundations, 'int32'), 39).cast('float32');
   
    // Create a sequential model since the layers inside will go in order
    const model = tf.sequential();
    
    // Create a hidden dense layer since all inputs will be connected to all nodes in the hidden layer.
    // units: How many nodes in the layer
    // inputShape: How many input values (3 because there are 3 RGB values for each shade color)
    // activation: Sigmoid function squashes the resulting values to be between a range of 0 to 1, which is best for a probability distribution.
    const hiddenLayer = tf.layers.dense({
      units: 20,
      inputShape: [3],
      activation: 'sigmoid'
    });
    
    // Create a dense output layer since all nodes from the hidden layer will be connected to the outputs
    // units: Needs to be 39 since there are 39 possible makeup foundations
    // inputShape does not need to be defined for output.
    // activation: Softmax function acts like sigmoid except it also makes sure the resulting values add up to 1
    const outputLayer = tf.layers.dense({
      units: 39,
      activation: 'softmax'
    });
    
    // Add layers to the model
    model.add(hiddenLayer);
    model.add(outputLayer);
    
    // Create optimizer with stocastic gradient descent to minimize the loss with learning rate of 0.25
    const optimizer = tf.train.sgd(0.25);
  
    // Compile the model with the optimizer created above to reduce the loss. 
    // Use loss function of categoricalCrossentropy, which is best for comparing two probability distributions
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  
    // epochs: Number of iterations
    // shuffle: Shuffles data at each epoch so it's not in the same order
    // validationSplit: Saves some of the training data to be used as validation data (0.1 = 10%)
    await model.fit(inputs, outputs, {
      epochs: 10,
      shuffle: true,
      validationSplit: 0.1,
      callbacks: {
        onEpochEnd: (cycle, logs) => {
          this.setState({
            epoch: cycle + 1,
            loss: logs.loss.toFixed(3)
          })
        },
        onBatchEnd: tf.nextFrame,
        onTrainEnd: () => {
          this.setState({
            loading: false
          });
        }
      }
    }).then(results => console.log('results loss', results.history.loss));
  };

  // Render training model results
  render() {
    const {loading, epoch, loss} = this.state;
    return (
      <div className="train-model">
        <a className={`train-model-button ${loading ? 'disabled' : ''}`} href="#" onClick={evt => this.trainModel(evt)}>
          {loading ?
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          : 'Train Model'
          }
        </a>
        <div className="results">
          <h2>Training Results</h2>
          <div className="epoch">Epoch: {epoch ? epoch : '0'}</div>
          <div className="loss">Loss: {loss ? loss : '0.000'}</div>
        </div>
      </div>
    );
  }
}

export default TrainModel;
