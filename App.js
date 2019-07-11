import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrainModel from './components/TrainModel';
import Header from './components/Header';
import "babel-polyfill";
import "./scss/app.scss";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <TrainModel />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));