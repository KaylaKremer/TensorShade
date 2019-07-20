import React, {Component} from 'react';
import '../scss/upload.scss';

export default class Upload extends Component {

    // Create refs for the measure div (hidden), canvas, and color picker
    measure = React.createRef();
    canvas = React.createRef();
    colorPicker = React.createRef();
    
    state = {
        file: null,
        imageSource: null
    };

    uploadImage = evt => {
        // Create File Reader
        const reader = new FileReader();
        
        // When reader loads, create a new image. 
        // Also get the canvas and its context as well as the hidden measure div from the DOM.
        reader.onload = evt => {
            const img = new Image();
            const measure = this.measure;
            const canvas = this.canvas;
            const context = canvas.current.getContext('2d');
            img.onload = () => {
                // When image loads, immediately append it to the hidden measure div to determine its ratio.
                // Set newWidth to equal the canvas's width and calculate newHeight with the image's ratio.
                measure.current.appendChild(img);
                const imageRatio = img.width / img.height;
                let newWidth = canvas.current.width;
                let newHeight = newWidth / imageRatio;
    
                // Check to see if the height of the image is greater than the canvas.
                // If it is, set the height to the canvas's height and calculate newWidth again with image's ratio.
                if (newHeight > canvas.current.height) {
                    newHeight = canvas.current.height;
                    newWidth = newHeight * imageRatio;
                }
                
                // Remove the image from the hidden measure div
                measure.current.removeChild(img);
                
                // If the newWidth is less than the canvas's width, draw it positioned in the middle at 50, 0.
                // If it isn't, fill the entire canvas's width by drawing it from the top-left corner at 0,0.
                if (newWidth < canvas.current.width){
                    context.drawImage(img, 50,0, newWidth, newHeight);
                } else {
                    context.drawImage(img, 0,0, newWidth, newHeight);
                }
                
                // Stroke the canvas again
                context.lineWidth = 5;
                context.strokeStyle = "#000";
                context.strokeRect(0, 0, canvas.current.width, canvas.current.height);
            }
            img.onerror = err => console.error(`Error: ${err}`);
            img.src = evt.target.result;
        }
       reader.readAsDataURL(evt.target.files[0]);
    };
    
    colorPicker = evt => {
        console.log('color picker!!');
    };
    
    componentDidMount() {
        // Get canvas for uploaded image when component mounts
        const canvas = this.canvas;
        
        // Set canvas width and height to be the same so it's drawn as a square
        canvas.current.height = canvas.current.width;
        
        // Get the context of the canvas. Set its fill, stroke, and text with camera emoji
        const context = canvas.current.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        context.lineWidth = 5;
        context.strokeStyle = "#000";
        context.strokeRect(0, 0, canvas.current.width, canvas.current.height);
        context.font = "125px Arial";
        context.textAlign="center";
        context.textBaseline = "middle";
        context.fillText('📷', canvas.current.width / 2, canvas.current.height / 2);
    }

    render() {
        return (
            <div className="upload">
                <div ref={this.measure} className="measure"></div>
                <div className="upload-button-container">
                    <label className="upload-label" htmlFor="upload-button">Upload Image</label>
                    <input type="file" className="upload-button" id="upload-button" onChange={evt => this.uploadImage(evt)} />
                </div>
                <div className="canvas-container">
                    <canvas ref={this.canvas} className="canvas"></canvas>
                    <img ref={this.colorPicker} className="color-picker" />
                </div>
            </div>
        );
    }
}