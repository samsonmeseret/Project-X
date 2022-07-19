import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer-cont">
        <footer className="footer">
          <div className="footer-social">
            <div>
              <h1>HealEye</h1>
            </div>
            <div>
              <p>Follow as on</p>
              <div className="social-icons">
                <Link className="fb" to={"#"}>
                  <FaFacebookF />
                </Link>
                <Link className="tl" to={"#"}>
                  <FaTelegramPlane />
                </Link>
                <Link className="linked" to={"#"}>
                  <FaLinkedinIn />
                </Link>
                <a href="#" className="twitter">
                  <BsTwitter />
                </a>
              </div>
            </div>
            <div>
              <p>
                &copy; Copyright {new Date(Date.now()).getFullYear()}, HealEye
                Clinic
              </p>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3>Overview</h3>
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/Contact Us"}>Contact Us</Link>
                </li>
                <li>
                  <Link to={"/teem"}>Our Teams</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                <li>
                  <Link to={"/services"}>Services</Link>
                </li>
                <li>
                  <Link to={"/book"}>Booking</Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
