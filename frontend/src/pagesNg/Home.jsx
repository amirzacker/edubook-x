import React from "react";
import Categories from "../componentsNg/Categories";
import Footer from "../componentsNg/Footer";
import Navbar from "../componentsNg/Navbar";
import Menu from "../componentsNg/Menu";
import Publications from "../componentsNg/Publications";
import Slider from "../componentsNg/Slider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Menu />
      <Slider />
      <Categories />
      <Publications />
      <Footer />
    </div>
  );
};

export default Home;
