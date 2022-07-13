import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <footer>
          <div className="footer-social">
            <p>Follow as on</p>
            <div>
              <FacebookIcon />
              <TelegramIcon />
              <LinkedInIcon />
            </div>
          </div>
          <div className="footer-links">
            <ul></ul>
            <ul></ul>
          </div>
        </footer>
        <div className="copyright">
          <p>Copyright `${new Date.getFullYear()}`, HealEye Clinic</p>
        </div>
      </div>
    </>
  );
}
