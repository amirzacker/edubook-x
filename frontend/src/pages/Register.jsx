import styled from "styled-components";
import { mobile } from "../toolkit/responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../redux/apiCalls";

import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import logo from "../components/header/logo.png";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const LogoImage = styled.img`
  max-width: 50px;
  height: auto;
  margin-right: 20px;
`;

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    const user = {
      lastname: userInfo.lastName,
      firstname: userInfo.lastName,
      username: userInfo.email,
      email: userInfo.email,
      password: userInfo.password,
    };

    try {
      await register(dispatch, user);
      login(
        dispatch,
        { username: userInfo.email, password: userInfo.password },
        () => {
          navigate("/dashboard");
        }
      );
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Wrapper>
          <Title>CRÉER UN COMPTE</Title>
          <LogoImage src={logo} className="logo" alt="Logo" />
          <Link onClick={goToLogin}>Vous avez déjà un compte ? CONNECTEZ-VOUS</Link>
          <Form onSubmit={handleSubmit}>
            <Input
              name="firstname"
              placeholder="Prénom"
              onChange={handleInputChange}
            />
            <Input
              name="lastName"
              placeholder="Nom de famille"
              onChange={handleInputChange}
            />
            <Input
              name="username"
              placeholder="Nom d'utilisateur"
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Mot de passe"
              onChange={handleInputChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
              onChange={handleInputChange}
            />
            <Agreement>
            En créant un compte, je consens au traitement de mes données personnelles conformément à la <b>POLITIQUE DE CONFIDENTIALITÉ</b>
            </Agreement>
            <Button type="submit">CRÉER</Button>
          </Form>
          {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        </Wrapper>
      </Container>
      <Footer/>
    </>
  );
};

export default Register;
