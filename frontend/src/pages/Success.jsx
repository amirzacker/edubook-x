import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../toolkit/requestMethods";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { removeAllPublications } from "../redux/cartRedux";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigate("/");
  };

  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state?.stripeData;
  const cart = location.state?.cart;
  const {user} = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);


  useEffect(() => {
    const createOrder = async () => {
      const formattedAddress = [
        data.billing_details.address.line1,
        data.billing_details.address.line2,
        data.billing_details.address.city,
        data.billing_details.address.postal_code,
        data.billing_details.address.country
      ].filter(Boolean).join(", "); 

      const res = await userRequest.post("/orders", {
        userId: user?.id,
        publications: cart?.publications.map((item) => (item.id)),
        amount: cart.total,
        address: formattedAddress,
      });
      setOrderId(res.data.id);
    };

    if (data) {
      createOrder();
      dispatch(removeAllPublications());
    }
  }, [cart, data, user, dispatch]);

  return (
    <>
      <Header />
      <div
        style={{
          height: "70vh",
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
      <Footer />
    </>
  );
};

export default Success;
