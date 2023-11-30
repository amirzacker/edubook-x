import { Badge } from "@material-ui/core"; 
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../toolkit/responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  height-min: 60px; 
   align-items: center; 

    background: 	#d63333;
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
  height: 20px;
  width:300px; 
  display: flex;
  align-items: center;
   border: 1px solid #bbb;
   border-radius: 25px;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width:300px;
  ${mobile({ width: "50px" })}
`;

 

const Center = styled.div`
  flex: 1;
  text-align: center;
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
  
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

 
const Navbar = () => {
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
          {/* <Language>EN</Language> */}
         <Logo>EduBookX</Logo>
        </Left>
        <Center>
            <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 20 }} />
          </SearchContainer> 
        </Center>
        <Right>

             {user ? (
            <>
              <Link onClick={() => navigate("/dashboard")}>
                <Person />
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

export default Navbar;
