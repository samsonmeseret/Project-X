import React from "react";
import Hero from "../../components/landingPageComponents/Hero/Hero";
import Team from "../../components/landingPageComponents/Team/Team";
import Footer from "../../components/landingPageComponents/Footer/Footer";
import Testimonials from "../../components/landingPageComponents/Testimonies/Testimonials";
import Service from "../../components/landingPageComponents/Service/Service";
import About from "../../components/landingPageComponents/About/About";
import Quality from "../../components/landingPageComponents/QualityText/Qualities";
import Contacts from "../../components/landingPageComponents/Contacts/Contacts";
import Feedback from "../../components/landingPageComponents/Feedback/Feedback";
// import PulseLoader from "../../components/PulseLoader/PulseLoader";
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
        <Feedback />
        <Footer />
      </div>
    </>
  );
};

export default Home;
