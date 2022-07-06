import React from "react";
import Hero from "../../components/Hero/Hero";

import Team from "../../components/Team/Team";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../../components/Testimonies/Testimonials";
import Service from "../../components/Service/Service";
import About from "../../components/About/About";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="home">
        <Hero />
        {/* <About /> */}
        <Team />
        <Service />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default Home;
