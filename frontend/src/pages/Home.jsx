import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Publications from "../components/Publications";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Slider />
      <Categories />
      <Publications />
      <Footer />
    </div>
  );
};

export default Home;
