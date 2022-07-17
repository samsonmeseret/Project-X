import React from "react";
import Hero from "../../components/landingPageComponents/Hero/Hero";
import Team from "../../components/landingPageComponents/Team/Team";
import Footer from "../../components/landingPageComponents/Footer/Footer";
import Testimonials from "../../components/landingPageComponents/Testimonies/Testimonials";
import Service from "../../components/landingPageComponents/Service/Service";
import About from "../../components/landingPageComponents/About/About";
import Quality from "../../components/landingPageComponents/QualityText/Qualities";
import "./home.css";
const Home = () => {
  return (
    <>
      <div className="home">
        <Hero />
        <About />
        <Quality />
        <Team />
        <Service />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default Home;
