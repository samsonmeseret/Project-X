import React from "react";
import "./hero.css";
import Kume from "../../svg/Kume";
import { SvgBlob } from "react-svg-blob";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>We care about your Health</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
            corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nam, laboriosam!
          </p>
          <a className="hero-btn" href="/book">
            Connect to our Doctor's
          </a>
        </div>
        <div className="hero-image">
          <Kume p="width:340 height:480" />
        </div>
      </section>
    </>
  );
};

export default Hero;
