import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import FoundationShades from './components/FoundationShades';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>TensorMakeup</h1>
        <FoundationShades />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'))