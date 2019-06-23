import React, {Component} from 'react'
import shades from '../data/shades.json';

class FoundationShades extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const shadesData = shades;
    console.log(shadesData[0]);
    return (
      <div>
        <h3>Foundation Shades</h3>
      </div>
    );
  }
}

export default FoundationShades;
