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
                    <li className="instructions-step" key="step-1">👉🏻Click the Train Model button (This will take a few seconds!)</li>
                    <li className="instructions-step" key="step-2">👉Click camera icon to take a snapshot of your skin shade!</li>
                    <li className="instructions-step" key="step-3">👉🏽Optionally, click the Upload button to upload your own picture of your skin</li>
                    <li className="instructions-step" key="step-4">👉🏿Click the Run Skin Analysis button to get your matching foundation shade(s)!</li>
                </ul>
            </div>
        </div>
    );
}

export default Header;