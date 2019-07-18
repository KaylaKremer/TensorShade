import React, {Component} from 'react';
import '../scss/upload.scss';

class Upload extends Component {

    canvas = React.createRef();
    
    state = {
        file: null,
        imageSource: null
    };

    uploadImage = evt => {
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
    }
    
    
    
    componentDidMount() {
        const canvas = this.canvas;
        const context = canvas.current.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        context.lineWidth = 5;
        context.strokeStyle = "#000";
        context.strokeRect(0, 0, canvas.current.width, canvas.current.height);
        context.font = "250px Oswald";
        context.textAlign="center"; 
        context.textBaseline = "middle";
        context.fillText('📷', canvas.current.width/2, canvas.current.height/2);
    }

    render() {
        return (
            <div className="upload">
                <canvas width={500} height={500} ref={this.canvas} className="canvas"></canvas>
                <div className="upload-button-container">
                    <input type="file" className="upload-button" onChange={evt => this.uploadImage(evt)} />
                </div>
            </div>
        );
    }
}

export default Upload;