import React, {Component} from 'react';
import * as tf from '@tensorflow/tfjs';
import "../scss/predict.scss";

export default class Predict extends Component {

    predictModel = () => {
        const [r, g, b] = this.props.rgb;
        const {model, foundationLabels, setFoundation} = this.props;
        tf.tidy(() => {
            const input = tf.tensor2d([
                [r / 255, g / 255, b / 255]
            ]);
            let results = model.predict(input);
            let argMax = results.argMax(1);
            let index = argMax.dataSync()[0];
            let foundation = foundationLabels[index];
            setFoundation(foundation);
        });
    };
    
    render() {
        const {loading, foundation} = this.props;
        
        return (
            <div className="predict-model">
                <div className="predict-results">
                  <h2>Prediction Results</h2>
                  <div className="predict-result">
                    <span>Foundation Match:</span>
                    <span>{foundation}</span>
                  </div>
                </div>
                <div className={`predict-model-button ${loading ? 'disabled' : ''}`} onClick={() => this.predictModel()}>
                    {loading ?
                      <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                      </div>
                    : 'Run Analysis'
                    }
                </div>
          </div>
        );
    }
}