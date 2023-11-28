import { useEffect, useState } from "react";
import styled from "styled-components";
import Publication from "./Publication";
import Pagination from "@material-ui/lab/Pagination";
import { publicRequest } from "../toolkit/requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Publications = ({ cat, sort }) => {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Définissez ici le nombre d'articles par page

  useEffect(() => {
    const getPublications = async () => {
      try {
        const res = await publicRequest.get(
          cat ? `publications/category/${cat}` : "publications"
        );
        setPublications(res.data);
      } catch (err) {}
    };
    getPublications();
  }, [cat]);

  useEffect(() => {
    if (sort) {
      setFilteredPublications(
        publications.filter((publication) => publication.book_state === sort)
      );
    } else {
      setFilteredPublications(publications);
    }
  }, [publications, sort]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentItems = sort
    ? filteredPublications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : publications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const pagesCount = Math.ceil(publications.length / itemsPerPage);
  return (
    <>
      <Container>
        {currentItems.map((item) => (
          <Publication item={item} key={item.id} />
        ))}
      </Container>
      <PaginationContainer>
        <Pagination
          count={pagesCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </PaginationContainer>
    </>
  );
};

export default Publications;
