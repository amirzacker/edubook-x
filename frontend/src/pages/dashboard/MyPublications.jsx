import "./MyPublications.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePublication, getPublications } from "../../redux/apiCalls";
import Pagination from "@material-ui/lab/Pagination"; 
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const Comment = styled.p`
  margin: 10px 0;
`;

const Price = styled.span`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const EditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled(DeleteOutline)`
  color: red;
  cursor: pointer;
`;

const Publications = () => {
  const dispatch = useDispatch();
  const publications = useSelector((state) => state.publication.publications);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const pagesCount = Math.ceil(publications.length / itemsPerPage);

  useEffect(() => {
    getPublications(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deletePublication(id, dispatch);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculer les rangs pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = publications.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Mes Annonces</h1>
        <Link to="/dashboard/publications/new">
          <button className="publicationAddButton">Nouvelle annonce</button>
        </Link>
      </div>

      <Container>
        {currentItems.map((publication) => (
          <Card key={publication.id}>
            <Image src={publication.book.image} alt="Couverture" />
            <Comment>{publication.comment}</Comment>
            <Price>{`${publication.price} €`}</Price>
            <Actions>
              <Link to={`/dashboard/publications/${publication.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
              <DeleteButton onClick={() => handleDelete(publication.id)} />
            </Actions>
          </Card>
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
