import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Train from './components/Train';
import "babel-polyfill";
import "./scss/app.scss";

const App = props => {
  return (
    <div>
      <Header />
      <Train />
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById('app'));