import styled from "styled-components";

import { mobile } from "../toolkit/responsive";
import CategoryItem from "./CategoryItem";
import loi from "../image/loi.jpg";
import lavie from "../image/lavie.jpg";
import nature from "../image/nature.jpg";
import sport from "../image/sport.jpg";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

 const categories = [
  {
    id: 1,
    img: loi ,
    title: "NATURE HUMAINE",
    cat: "loi",
  },
  {
    id: 2,
    img: lavie,
    title: "La Vie De Chateau",
    cat: "lavie",
  },
  {
    id: 3,
    img: nature,
    title: " LA NATURE",
    cat: "nature",
  },
    {
    id: 4,
    img: sport,
    title: "SPORT",
    cat: "sport",
  },
];

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
