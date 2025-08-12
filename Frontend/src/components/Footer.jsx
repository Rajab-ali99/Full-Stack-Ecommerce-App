import React from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import {assets} from '../assets/assets'
import logo from '../assets/logo2.png';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="" id="footer">
      <div className="footer-content z-50">
        <div className="footer-content-left">
          <img className='w-40 invert mix-blend-color-burn' src={logo} alt="" />
          <p className="text-white">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            ratione fugiat vitae quisquam dolores sint id, nisi veniam
            repellendus. Tempore, expedita. At praesentium deserunt minima!
            Porro iste beatae maxime voluptatem?
          </p>
          <div className="footer-social-icons flex">
            <div >
              <img className="" src={assets.facebook_icon} alt="facebook" />
            </div>
            <div >
              <img src={assets.twitter_icon} alt="twitter" />
            </div>
            <div>
              <img src={assets.linkedin_icon} alt="linkedin" />
            </div>
          </div>
        </div>
        <div className="footer-content-center">
          <h2 className="text-xl font-semibold">Cartify</h2>
          <ul className="text-white">
            <li onClick={() => navigate("/")}>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 className="text-xl font-semibold">GET IN TOUCH</h2>
          <ul className="text-white">
            <li>+92-300-0000000</li>
            <li>info@cartify.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © All rights reserved</p>
    </footer>
  );
};

export default Footer;
