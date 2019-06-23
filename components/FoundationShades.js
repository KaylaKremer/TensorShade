import React, {Component} from 'react'
import shadesData from '../data/shades.json';

class FoundationShades extends Component {

  constructor(props) {
    super(props);
  }
  
  //Converts hexadecimal values to RGB color values
  hexToRgb(hex) {
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
  }
  
  setup() {
    // Create list of foundation brand and product from the imported shadesData and remove any duplicates
    const foundationList = shadesData
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
    let shades = [];
    
    // Create empty array to hold the foundation index values
    let foundations = [];
    
    // Loop through each foundation shade in shadesData. 
    // Push its corresponding index value found in foundationList into the foundations array
    for (const shade of shadesData) {
      foundations.push(foundationList.indexOf(`${shade.brand} - ${shade.product}`));
    }
    
    // Loop through each RGB color in rgbList. 
    // Normalize the RGB color dividing by 255 for each RGB value, store in an array, and then push that array into the shades array
    for (const rgbColor of rgbList) {
      let shade = [rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255];
      shades.push(shade);
    }
    
    console.log('foundationList', foundationList);
    console.log('foundations', foundations);
    console.log('shades', shades);
    
  }
  

  // Render output
  render() {
    this.setup();
    return (
      <div>
        <h3>Foundation Shades</h3>
      </div>
    );
  }
}

export default FoundationShades;
