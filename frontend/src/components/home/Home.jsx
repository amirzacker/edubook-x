import styled from "styled-components";
import logo1 from "./Bookshop.gif";
import scrollImg from "./scroll.gif";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const HeroContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
`;

const HeroImage = styled.img`
  height: 720px;
`;

const ScrollImg = styled.img`
  position: absolute;
  right: 0;
  bottom: 40px;
  height: 100px;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroHeader = styled.h1`
  text-align: center;
  color: #001524;
  font-size: 68px;
  font-family: "Poppins";
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 0.9;
  word-spacing: 8px;
  width: 660px;
  padding-bottom: 8px;
`;


const Home = () => {
  return (
    <Main>
      <ScrollImg src={scrollImg} />
      <HeroContainer>
        <HeroImage src={logo1} />
        <HeroContent>
          <HeroHeader>Découvrez votre prochain livre préféré ici.</HeroHeader>
        </HeroContent>
      </HeroContainer>
    </Main>
  );
};

export default Home;
