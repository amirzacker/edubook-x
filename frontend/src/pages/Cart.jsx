import { Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../toolkit/responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../toolkit/requestMethods";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { removePublication } from "../redux/cartRedux";
import { colors } from "@material-ui/core";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  margin: 10px;
  border-bottom: 0.1px solid grey;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 120px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BookTitle = styled.span``;

const Author = styled.span``;

const PublicationType = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BookPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const KEY = process.env.REACT_APP_STRIPE;

  console.log(KEY);
  console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/payment", {
          stripeToken: stripeToken.id,
          amount: 500,
        });
        console.log(stripeToken);
        navigate("/success", {
          stripeData: res.data,
          publications: cart,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleRemove = (publication) => {
    dispatch(removePublication(publication));
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <Top>
          <TopButton>CONTINUER SUR EDUBOOK</TopButton>
          <TopButton type="filled">Commander</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart?.publications?.map((publication) => (
              <Product>
                <ProductDetail>
                  <Image src={publication.book.image} />
                  <Details>
                    <BookTitle>
                      <b>Livre:</b> {publication.book.title}
                    </BookTitle>
                    <Author>
                      <b>Auteur:</b> {publication.book.author}
                    </Author>
                    <PublicationType>
                      <b>Type:</b> {publication.book_state}
                    </PublicationType>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleRemove(publication)}
                    />
                  </ProductAmountContainer>
                  <BookPrice>$ {publication.price}</BookPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>RECAPITULATIF</SummaryTitle>
            {cart?.publications?.map((publication) => (
              <SummaryItem>
                <SummaryItemText>{publication?.book?.title}</SummaryItemText>
                <SummaryItemPrice>$ {publication?.price}</SummaryItemPrice>
              </SummaryItem>
            ))}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Edubook-X"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>COMMANDER MAINTENANT</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
