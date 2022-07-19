import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import Footer from "../Footer/Footer";
import style from "./contact.module.css";
const Contacts = () => {
  return (
    <>
      <section className={style.contacts}>
        <div className={style.contact__text}>
          <h2>find Us On</h2>
          <div className={style.contact__text__address}>
            <h3>Our Address</h3>
            <div className={style.location}>
              <GoLocation />
              <div>
                <p>Merkato, Infront of Lorem, 50m right side</p>
                <p>Jimma, Ethiopa</p>
              </div>
            </div>
          </div>
          <div className={style.contact__text__email}>
            <h3>Email</h3>
            <div className={style.email}>
              <MdOutlineMarkEmailRead />
              <div>
                <p>support@healeye.com</p>
                <p>healeye@gmail.com</p>
                <p>healeye@outlook.com</p>
              </div>
            </div>
          </div>
          <div className={style.contact__text__phone}>
            <h3>Phone Line</h3>
            <div className={style.phone}>
              <BsTelephone />
              <div>
                <p>+251917583307</p>
                <p>+251917583307</p>
                <p>+251917583307</p>
              </div>
            </div>
          </div>
          <div className={style.contact__text__social}>
            <h3>Social</h3>
            <p>WhatsApp: +251917583307</p>
            <p>Telegram: +251917583307</p>
            <div className={style.social__icons}>
              <a href="#" className={style.fb}>
                <FaFacebookF />
              </a>
              <a href="#" className={style.linked}>
                <FaLinkedinIn />
              </a>
              <a href="#" className={style.tl}>
                <FaTelegramPlane />
              </a>
              <a href="#" className={style.twitter}>
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className={style.contact__map}>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1iMLpIEagV8bUKlB6gotM9LwdSiw&hl=en_US&ehbc=2E312F"
            width="640"
            height="480"
          ></iframe>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contacts;
