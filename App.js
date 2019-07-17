import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
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
        <Header />
        <TrainModel />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));