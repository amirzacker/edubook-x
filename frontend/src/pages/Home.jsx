import React from "react";
import Footer from "../components/Footer";
import Publications from "../components/Publications";
import HomeComponent from "../components/home/Home";
import Header from "../components/header/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeComponent/>
      <Publications />
      <Footer />
    </div>
  );
};

export default Home;
