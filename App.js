import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FoundationShades from './components/FoundationShades';
import "babel-polyfill";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="heading">
        <h1>TensorShade ✋🏻✋✋🏽✋🏿</h1>
        <FoundationShades />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));