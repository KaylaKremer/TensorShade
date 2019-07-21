import React, {Component} from 'react';
import '../scss/upload.scss';

export default class Upload extends Component {

    // Create refs for the measure div (hidden), canvas, and color picker
    measure = React.createRef();
    canvas = React.createRef();
    colorPicker = React.createRef();
    
    // Create state to hold the RGB color values
    state = {
        rgb: []
    };

    uploadImage = evt => {
        // Reset the canvas so images won't overlap if user uploads more than one image.
        this.defaultCanvas();
        
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
                
                // Add onclick event of pickColor to the canvas
                canvas.current.onclick = evt => this.pickColor(evt);
                
                // Stroke the canvas again
                context.lineWidth = 5;
                context.strokeStyle = "#000";
                context.strokeRect(0, 0, canvas.current.width, canvas.current.height);
            }
            // Set an onError event if the image fails to load
            img.onerror = err => console.error(`Error: ${err}`);
            
            // Set the image source to the result to display the uploaded image in the canvas
            img.src = evt.target.result;
        }
        
        // Safe check to ensures there is a file before proceeding to let the reader read the file
        if (evt.target.files[0]){
            reader.readAsDataURL(evt.target.files[0]);
        }
    };
    
    pickColor = evt => {
        // Get the reference to the canvas and its context
        const canvas = this.canvas;
        const context = canvas.current.getContext('2d');
        
        // Get x and y coordinates of mouseclick by using offsetX and offsetY values
        const x = evt.offsetX;
        const y = evt.offsetY;
        
        // Get the RGBA color value data at the 1px by 1px the user clicked on
        const imageData = context.getImageData(x, y, 1, 1).data;
        
        // Store the RGBA values in  an array and update state
        const rgb = [...imageData];
        this.setState({
            rgb
        });
    };
    
    defaultCanvas = () => {
        // Get canvas for uploaded image when component mounts
        const canvas = this.canvas;

        // Set canvas width and height to be the same so it's drawn as a square
        // Also set both to offsetWidth so that x and y coordinates can be calculated correctly when user clicks on the canvas to pick a color from their uploaded image.
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetWidth;

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
    };
    
    componentDidMount() {
        // Initialize the default canvas
        this.defaultCanvas();
    }

    render() {
        const {loading} = this.props;
        const {rgb} = this.state;
        const [r, g, b] = rgb;
        return (
            <div className="upload">
                <div ref={this.measure} className="measure"></div>
                <div ref={this.canvasContainer} className="canvas-container">
                    <canvas ref={this.canvas} className="canvas"></canvas>
                    <img style={{backgroundColor: `${rgb.length > 0 ? `rgba(${r}, ${b}, ${g})` : `#fff`}`}} ref={this.colorPicker} className="color-picker" />
                </div>
                <div className={`upload-button-container ${loading ? 'disabled' : ''}`}>
                    <label className={`upload-label ${loading ? 'disabled' : ''}`} htmlFor="upload-button">
                        {loading ?
                          <div className="loader">
                            <div className="inner one"></div>
                            <div className="inner two"></div>
                            <div className="inner three"></div>
                          </div>
                        : 'Upload Image'
                        }
                    </label>
                    <input type="file" className="upload-button" id="upload-button" onChange={evt => this.uploadImage(evt)} />
                </div>
            </div>
        );
    }
}