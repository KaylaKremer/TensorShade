import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrainModel from './components/TrainModel';
import "babel-polyfill";
import "./scss/app.scss";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="heading">
          <h1>TensorShade</h1>
          <h1>✋🏻✋✋🏽✋🏿</h1>
        </div>
        <TrainModel />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));