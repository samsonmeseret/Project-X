import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div>
          <FacebookIcon />
          <TelegramIcon />
          <LinkedInIcon />
        </div>
      </div>
    </>
  );
}
