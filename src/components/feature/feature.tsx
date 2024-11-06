import React from 'react';
import './feature.css';
import { kindleImage, laptopImage, fileExplorerImage } from './imports';
import { Link } from 'react-router-dom';
export const Feature: React.FC = () => {
  return (
    <div className="feature">
      <div className="feature-title">
        <h2>How it works</h2>
      </div>

      <div className="step1">
      <p> • Step 1: Connect your kindle to laptop with USB cable</p>
        <div className="step1-left">
          <img src={kindleImage} alt="Kindle device" className="kindle-image" />
        </div>
        <div className="step1-right">
          <img src={laptopImage} alt="Laptop" className="laptop-image" />
        </div>
      </div>

      <div className="step2">
        <div className="step2-left">
          <img src={fileExplorerImage} alt="File explorer" className="file-explorer-image" />
        </div>
        <div className="step2-right">
          <p> • Step 2: Go to &lt;Kindle/documents/My Clippings.txt&gt; file and upload it to here</p>
          <div className="upload-section">
            {/* <button className="choose-file-btn">Choose File</button> */}
            <Link to="/login" className="btn choose-file-btn feature">Choose File</Link>
            {/* <Link to="/login" className="btn upload-btn">Upload</Link> */}
            {/* <button className="upload-btn">Upload</button> */}
          </div>
        </div>
      </div>
      <div className="step3">
        <p> • Step 3: Now you can browse, organize, and interact with your notes on mobile devices</p>
      </div>
    </div>
  );
};