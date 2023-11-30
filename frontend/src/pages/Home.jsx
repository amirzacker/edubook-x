import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Publications from "../components/Publications";
import HomeComponent from "../components/home/Home";
import Header from "../components/header/Header";
import lib from "../image/lib.jpg"
import book from "../image/book.jpg"


 

const Home = () => {
  return (
     <> 
     
      <Navbar />
      <div style={{ backgroundImage: `url(${lib})` ,backgroundSize: 'cover',alignItems: 'center',height:'700px',
      margin:"20px" ,justifyContent: 'center',display: 'flex',  borderRadius: "35px"}}>


<div style={{ display: 'flex',  alignItems: 'center',   backgroundColor:' rgb(255, 255, 255,0.7)',  justifyContent: 'center',
width:'1000px',height:'300px',borderRadius: "25px",padding: "0px 25px" , flexDirection: 'column',}}>

<img src={book}  style={{width:"200px",height:"150px",marginBottom:"30px",marginTop:"-150px",  borderRadius: "50px",border:"0.5px solid" ,borderColor:"#000"}}/>



  <text style={{color:" #000", fontSize: 20 }}> 
  Bienvenue dans la Bibliothèque Étudiante
Votre Passerelle vers une Lecture Abordable et Durable
La Bibliothèque Étudiante est votre destination tout-en-un pour acheter, vendre ou échanger des livres d'occasion,
 et même partager le don de vos livres. Conçue par et pour les étudiants, cette plateforme en ligne offre un accès facile à
 une vaste sélection de livres universitaires et scolaires à des prix abordables.</text>
</div>

          
 
     
    </div>
  <Footer />
    </>
  );
};

export default Home;
