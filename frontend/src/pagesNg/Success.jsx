import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../toolkit/requestMethods";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GoHomeButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const Success = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state?.stripeData;
  const cart = location.state?.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.id,
          publications: cart.publications.map((item) => ({
            publicationId: item.id,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data.id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <GoHomeButton onClick={handleGoHome}>Retour à l'accueil</GoHomeButton>
    </div>
  );
};

export default Success;
