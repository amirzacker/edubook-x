import { useEffect, useState } from "react";
import styled from "styled-components";
import Publication from "./Publication"; 
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Publications = ({ cat, filters, sort }) => {
  const [publications, setPublications] = useState([]); 
  const [filteredPublications, setFilteredPublications] = useState([]); 

  useEffect(() => {
    const getPublications = async () => { 
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:8000/api/publications?category=${cat}`
            : "http://localhost:8000/api/publications"
        );
        setPublications(res.data); 
      } catch (err) {}
    };
    getPublications();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredPublications(
        publications.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [publications, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredPublications((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredPublications((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredPublications((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredPublications.map((item) => <Publication item={item} key={item.id} />)
        : publications
            .slice(0, 8)
            .map((item) => <Publication item={item} key={item.id} />)}
    </Container>
  );
};

export default Publications;
