import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import react from "../image/react.jpg";
import spring from "../image/spring.jpg";
import symfony from "../image/symfony.jpg";

import { mobile } from "../toolkit/responsive";

const sliderItems = [
  {
    id: 1,
    img: symfony,
    title: "symfony",
    desc: "PHP est toujours aussi populaire qu’en 2023 que durant les années précédentes.",
    author: "php",
  },
  {
    id: 2,
    img: react,
    title: "React",
    desc: "Ce livre s'adresse aux développeurs qui souhaitent lever la complexité apparente du framework Front End React pour réaliser des applications web et mobiles bien architecturées et aisées à maintenir.",
    author: "React",
  },
  {
    id: 3,
    img: spring,
    title: "Spring",
    desc: "Cet ouvrage montre comment développer des applications Java EE professionnelles performantes à l'aide du framework Spring.",
    author: "Spring",
  },
];
const Container = styled.div`
 
 background-color:rgb(0, 204, 0,0.15);
  width: 99%;
  height: 300px;
  display: flex;
  position: relative;
   padding: 3px;
  justify-content: center;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex; 
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Desc = styled.p`
  margin: 40px 0px;
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color:#fff;
  border:none;
  border-radius:5px;
  background-color:  #00b300;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>Détail</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
