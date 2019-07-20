import React, {Component} from 'react';
import '../scss/upload.scss';

export default class Upload extends Component {

    canvas = React.createRef();
    colorPicker = React.createRef();
    
    state = {
        file: null,
        imageSource: null
    };

    canvasImage = evt => {
        const reader = new FileReader();
        reader.onload = evt => {
            const img = new Image();
            const canvas = this.canvas;
            const context = canvas.current.getContext('2d');
            img.onload = () => {
                context.drawImage(img, 0,0, img.width, img.height,
                0, 0, canvas.current.width, canvas.current.height);
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
        // Canvas for uploaded image
        const canvas = this.canvas;
        canvas.current.height = canvas.current.width;
        const context = canvas.current.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        context.lineWidth = 5;
        context.strokeStyle = "#000";
        context.strokeRect(0, 0, canvas.current.width, canvas.current.height);
        context.font = "125px Oswald";
        context.textAlign="center";
        context.textBaseline = "middle";
        context.fillText('📷', canvas.current.width/2, canvas.current.height/2);
    }

    render() {
        return (
            <div className="upload">
                <div className="upload-button-container">
                    <label className="upload-label" htmlFor="upload-button">Upload Image</label>
                    <input type="file" className="upload-button" id="upload-button" onChange={evt => this.canvasImage(evt)} />
                </div>
                <div className="canvas-container">
                    <canvas ref={this.canvas} className="canvas"></canvas>
                    <img ref={this.colorPicker} className="color-picker" />
                </div>
            </div>
        );
    }
}