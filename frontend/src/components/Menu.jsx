import { Badge } from "@material-ui/core"; 
import { Search, ShoppingCartOutlined, Person } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../toolkit/responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 40px; 
  display: flex;
   align-items: center; 
   background-color: #00b300 ;
   margin-bottom: 10px;
   justify-content: center;
  ${mobile({ height: "50px" })}
`;

 
 

const Center = styled.div`
  display: flex; 
  background-color: #999 ;
  gap: 20px;
  align-items: center; 
  
`;



const MenuItem = styled.div`
  font-size: 14px; 
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Menu = () => {
  const quantity = useSelector((state) => state.cart.quantity); 
  return (
    <Container>   
               <Link to="/register" style={{ textDecoration: 'none' }}>
              <MenuItem><text style={{ color: "#ffffff", fontSize: 15}}>REGISTER</text></MenuItem>
            </Link>
        <MenuItem><text style={{ color:" #fff", fontSize: 15 }}>|</text></MenuItem>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <MenuItem><text style={{ color: "#fff", fontSize: 15 }}>LOGIN IN</text></MenuItem>
          </Link>
         
    </Container>
  );
};

export default Menu;
