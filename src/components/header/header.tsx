import React from 'react';
import mainImage from '../../assets/main.png';
import './header.css'

export const Header: React.FC = () => {
    return (
      <div className="header section-padding" id="home">
        <div className="header-content">
          <h1>Organize Your Kindle Highlights in Fewest Steps</h1>
          <p>Export your kindle notes and access them anytime on mobile devices.
            Get AI-powered summaries and key insights to make the most of your reading.
          </p>
          <button className="btn btn-primary">Upload Your Notes</button>
        </div>
        <div className="image-container">
          <img src={mainImage} alt="Colorful bookshelves" />
        </div>
      </div>
    );
  };