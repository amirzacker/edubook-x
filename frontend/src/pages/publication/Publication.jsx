import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { publicRequest, userRequest } from "../../toolkit/requestMethods";
import styled from "styled-components";
import { mobile } from "../../toolkit/responsive";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MailIcon from "@material-ui/icons/Mail";
import { useDispatch, useSelector } from "react-redux";
import { addPublication } from "../../redux/cartRedux";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

const StyledContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  max-width: 80%;
  margin: 2rem auto;
  padding: 1rem;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}

  .image-wrapper img {
    width: 100%;
    max-height: 60vh;
    object-fit: contain;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #000;
    padding: 20px;
  }

  .text h2 {
    color: #001524;
    font-size: 35px;
    padding-bottom: 30px;
  }

  .text h3 {
    color: #000;
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .custom-button {
    color: white;
    background-color: teal;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #2a344a;
    }
  }
`;

const Publication = () => {
  const { publicationId } = useParams();
  const [publication, setPublication] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user?.currentUser) || {};
  useEffect(() => {
    const getPublication = async () => {
      try {
        const res = await publicRequest.get("/publications/" + publicationId);
        setPublication({
          ...res.data,
          name: res.data.book.title,
          src: res.data.book.image,
          description: res.data.comment,
          price: res.data.price,
        });
      } catch (err) {
        console.error(err);
      }
    };
    getPublication();
  }, [publicationId]);

  const handleClick = () => {
    dispatch(addPublication({ ...publication }));
  };

  const cart = useSelector((state) => state.cart);

  const isInCart = cart.publications.some((item) => item.id === publication.id);

  const handleExchange = async () => {
    if (!user) {
      navigateToLogin();
      return;
    }

    if (user.id === publication?.user.id) {
      alert("Vous ne pouvez pas créer une conversation avec vous-même.");
      return;
    }

    try {
      const exists = await checkConversationExists();
      if (!exists) {
        await createNewConversation();
      }
      navigate('/dashboard/messenger');
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const navigateToLogin = () => {
    navigate("/login", { state: { from: `/publications/${publicationId}` } });
  };

  const checkConversationExists = async () => {
    const response = await userRequest.get(`/conversations/find/${user.id}/${publication?.user?.id}`);
    return response.data;
  };
console.log(publication);
  const createNewConversation = async () => {
    const data = {
      senderId: user.id,
      receiverId: publication.user.id,
      publicationId: publication.id
    };
    await userRequest.post("/conversations/new", data);
  };

  return (
    <>
    <Header />
      <StyledContainer>
        <Grid container>
          <Grid item xs={12} md={6} className="image-wrapper">
            <img src={publication.book?.image} alt={publication.book?.title} />
            <br />
            <Typography variant="h6" color="secondary">
              Auteur: <b>{publication.book?.author}</b>
            </Typography>
            Commentaire:
            <Typography
              variant="p"
              dangerouslySetInnerHTML={{ __html: publication.comment }}
            />
          </Grid>
          <Grid item xs={12} md={5} className="text">
            <Typography variant="h2">
              <b>{publication.book?.title}</b>
            </Typography>
            <Typography
              variant="p"
              dangerouslySetInnerHTML={{
                __html: publication.book?.description,
              }}
            />
            <Typography variant="h3" color="secondary">
              Price: <b>{publication.book?.price}</b>
            </Typography>
            <br />
            <div className="button-group">
              <button
                disabled={isInCart}
                className="custom-button"
                onClick={handleClick}
              >
                <ShoppingCartIcon /> Add to Cart
              </button>
              <button className="custom-button" onClick={handleExchange}>
                <MailIcon /> Echanger
              </button>
            </div>
          </Grid>
        </Grid>
      </StyledContainer>
      <Footer/>
    </>
  );
};

export default Publication;
