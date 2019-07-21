import React from 'react';
import '../scss/header.scss';

const Header = props => {
    return (
        <div>
            <div className="title">
                <h1>TensorShade</h1>
            </div>
            <div className="hands">
                <h1 className="hand">✋🏻</h1>
                <h1 className="hand">✋</h1>
                <h1 className="hand">✋🏽</h1>
                <h1 className="hand">✋🏿</h1>
            </div>
            <div className="instructions">
                <ul className="instructions-list">
                    <li className="instructions-step" key="step-1"><div className="hand-pointer">👉🏻</div><div className="instructions-text">Click the Train Model button to prepare your machine learning model (This will take a few seconds, possibly minutes!)</div></li>
                    <li className="instructions-step" key="step-2"><div className="hand-pointer">👉</div><div className="instructions-text">Optionally, adjust the number of epochs, units, batch size, and/or learning rate to your liking. (You can also revert back to default values by clicking on the Reset button).</div></li>
                    <li className="instructions-step" key="step-3"><div className="hand-pointer">👉🏽</div><div className="instructions-text">Once the model is trained, upload a picture of yourself, preferably a close-up of your skin. Then click on what part of the photo you want to use for the analysis (You can see the color picker preview in the top-right corner).</div></li>
                    <li className="instructions-step" key="step-4"><div className="hand-pointer">👉🏿</div><div className="instructions-text">Click the Run Analysis button to get your best matching makeup foundation brand and product for your skin tone!</div></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;