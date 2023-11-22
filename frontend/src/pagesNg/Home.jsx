import React from "react";
import Categories from "../componentsNg/Categories";
import Footer from "../componentsNg/Footer";
import Navbar from "../componentsNg/Navbar";
import Publications from "../componentsNg/Publications";
import Slider from "../componentsNg/Slider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Publications />
      <Footer />
    </div>
  );
};

export default Home;
