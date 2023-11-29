import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import React from "react";
import styled from "styled-components";
import { mobile } from "../../toolkit/responsive";
import { useSelector } from "react-redux";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls";

const Container = styled.div`
  height: 80px;
  background: teal;
  color: white;
  position: fixe;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  display: contents;
  cursor: pointer;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Link = styled.a`
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;
const LogoImage = styled.img`
  max-width: 50px;
  height: auto;
  margin-right: 20px;
`;

const Header = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login"); // Rediriger vers la page de connexion après la déconnexion
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>FR</Language>
          <SearchContainer>
            <Input placeholder="Recherche..." />
            <Search style={{ fontSize: 20 }} />
          </SearchContainer>
          <Link onClick={() => navigate("/")}>
            <MenuItem>HOME</MenuItem>
          </Link>
        </Left>
        <Center onClick={() => navigate("/")}>
          <Logo>EduBookX</Logo>
          <Link>
            <LogoImage src={logo} className="logo" alt="Logo" />
          </Link>
        </Center>
        <Right>
          <Link onClick={() => navigate("/publications")}>
            <MenuItem>PUBLICATIONS</MenuItem>
          </Link>
          {user ? (
            <>
              <Link onClick={() => navigate("/dashboard")}>
                <Person style={{ marginLeft: 35 }} />
              </Link>
              <Link onClick={handleLogout}>
                <ExitToAppIcon style={{ marginLeft: 35 }} />
              </Link>
            </>
          ) : (
            <>
              <Link onClick={() => navigate("/register")}>
                <MenuItem>S'INSCRIRE</MenuItem>
              </Link>
              <Link onClick={() => navigate("/login")}>
                <MenuItem>SE CONNECTER</MenuItem>
              </Link>
            </>
          )}

          <Link onClick={() => navigate("/cart")}>
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
