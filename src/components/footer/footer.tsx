import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
// import { FaLinkedin } from 'react-icons/fa';
import { FaLinkedin} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer: React.FC = () => {
  return (
    <footer className="footer" >
        {/* <div className="footer-content " > */}
            <div className="footer-left section-padding">
                <h3>Zoe Yan</h3>
                <p>Contact: <a href="mailto:yanzengyu98@gmail.com" style={{ textDecoration: 'underline' }}>Email Me</a></p>
                
                <div className="social-icons">
                    <a href="https://x.com/zoezyn" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/zoe-yan-851611212/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                    </a>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom ">
                {/* <p>© 2024 Zindex. All rights reserved.</p> */}
                <p>&copy; 2024 Zindex. All rights reserved.</p>
            </div>
        {/* </div> */}

      {/* <p>© 2024 Zindex. All rights reserved.</p> */}
    </footer>
  );
};
