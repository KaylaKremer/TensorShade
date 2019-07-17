import React, {Component} from 'react';
import '../scss/upload.scss';

class Upload extends Component {

    canvas = React.createRef();

    uploadImage = evt => {
        const reader = new FileReader();
        reader.onload = evt => {
            const img = new Image();
            const canvas = this.canvas;
            const ctx = canvas.current.getContext('2d');
            img.onload = () => {
                canvas.current.width = img.width;
                canvas.current.height = img.height;
                ctx.drawImage(img, 0,0);
            }
            img.onerror = err => console.error("Error: ", err);
            img.src = evt.target.result;
        }
        reader.readAsDataURL(evt.target.files[0]);
    }

    render() {
        return (
            <div className="upload">
                <canvas width={500} height={500} ref={this.canvas} className="upload-canvas"></canvas>
                <input type="file" className="upload-button" onChange={evt => this.uploadImage(evt)} />
            </div>
        );
    }
}

export default Upload;