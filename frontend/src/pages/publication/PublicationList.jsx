import styled from "styled-components";
import Publications from "../../components/Publications";
import Footer from "../../components/Footer";
import { mobile } from "../../toolkit/responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { publicRequest } from "../../toolkit/requestMethods";

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
  const [cat, setCat] = useState(null);
  const [sort, setSort] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest.get("categories");
        setCategories(res.data);
      } catch (err) {}
    };
    getCategories();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Livres:</FilterText>
            <Select name="cat" onChange={(e) => setCat(e.target.value)}>
              <Option >Categorie</Option>
              {categories.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Filter>
          <Filter>
            <FilterText>Trier Publications:</FilterText>
            <Select name="sort" onChange={(e) => setSort(e.target.value)}>
              <Option > Choisir Type de publication</Option>
              <Option value="exchange">Neuf</Option>
              <Option value="Usé">Usé</Option>
              <Option value="Très usé">Très usé</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Publications cat={cat}  sort={sort} />
      </Container>
      <Footer />
    </>
  );
};

export default PublicationList;
