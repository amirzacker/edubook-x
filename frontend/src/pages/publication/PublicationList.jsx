import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Publications from "../../components/Publications";
import Footer from "../../components/Footer";
import { mobile } from "../../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const PublicationList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("vente");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Livres:</FilterText>
          <Select name="cat" onChange={handleFilters}>
            <Option disabled>Categorie</Option>
            <Option>fiction</Option>
            <Option>General</Option>
            <Option>litterature</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Trier Publications:</FilterText>
          <Select name="sort" onChange={(e) => setSort(e.target.value)}>
            <Option disabled>Type de publication</Option>
            <Option>Vente</Option>
            <Option>Don</Option>
            <Option>Echange</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Publications cat={cat} filters={filters} sort={sort} />
    </Container>
  );
};

export default PublicationList;
