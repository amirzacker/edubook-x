import styled from "styled-components";
import { mobile } from "../toolkit/responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../redux/apiCalls";

import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
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

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    const user = {
      // Adapt this object according to your backend requirements
      name: userInfo.name,
      lastName: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
    };

    try {
      await register(dispatch, userInfo);
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
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Link href="/login">Do You a account LOGIN</Link>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
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
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
        {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
      </Wrapper>
    </Container>
  );
};

export default Register;
