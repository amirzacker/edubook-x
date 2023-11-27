import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";
import { userRequest } from "../../toolkit/requestMethods";
import { Link } from "react-router-dom";

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

const OrderDetail = styled.div`
  margin: 10px 0;
`;


const OrderStatus = styled.span`
  color: ${(props) => (props.status === "completed" ? "green" : "red")};
`;

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const pagesCount = Math.ceil(myOrders.length / itemsPerPage);
  const { user } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/user/" + user.id);
        setMyOrders(res.data);
      } catch (err) {}
    };
    getOrders();
  }, [user]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
       <div className="publicationTitleContainer">
        <h1 className="publicationTitle">Mes commmandes</h1>
        <Link to="/dashboard/publications/new">
          <button className="publicationAddButton">Nouvelle annonce</button>
        </Link>
      </div>
      <Container>
        {currentItems.map((order) => (
          <Card key={order.id}>
            <OrderDetail>{`Commande ID: ${order.id}`}</OrderDetail>
            <OrderDetail>{`Total: ${order.amount} €`}</OrderDetail>
            <OrderDetail>{`Adresse: ${order.address}`}</OrderDetail>
            <OrderStatus status={order.status}>
              {`Statut: ${order.status}`}
            </OrderStatus>
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

export default MyOrders;
