import React from "react";
import Hero from "../../components/Hero/Hero";

import Team from "../../components/Team/Team";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../../components/Testimonies/Testimonials";
import Service from "../../components/Service/Service";

const Home = () => {
  return (
    <>
      <Hero />
      {/* <Service />
      <Team /> */}
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
