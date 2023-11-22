import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../redux/apiCalls";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const StyledLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

const Profile = () => {
  const { user } = useSelector((state) => state.user.currentUser);
  const [userInfo, setUserInfo] = useState({
    email: user?.email,
    username: user?.username,
    //profileImage: user?.profileImage || "", // Ajoutez un champ pour l'image de profil
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    setUserInfo({
      email: user?.email,
      username: user?.username,
      // ... autres champs
    });
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserInfo({
        ...userInfo,
        profileImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(dispatch, userInfo);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Mon Profil</Title>
        <Form onSubmit={handleSubmit}>
          <ProfileImage src={"/img/avatar1.png"} alt="Profile Image" />

          <Input
            type="file"
            onChange={handleImageChange}
            style={{ margin: "10px 0" }}
          />
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <Input
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <StyledLabel htmlFor="username">Nom d'utisateur</StyledLabel>
          <Input
            name="username"
            placeholder="Nom d'utilisateur"
            value={userInfo.username}
            onChange={handleInputChange}
            readOnly
          />
          <Button type="submit">Mettre à jour</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Profile;
