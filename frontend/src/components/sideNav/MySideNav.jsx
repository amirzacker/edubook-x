import React, { useEffect } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookIcon from "@material-ui/icons/Book";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./MySideNav.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls";


const MySideNav = ({ setSidebarOpen, sidebaropen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = (expanded) => {
    setSidebarOpen(expanded);
  };

  const handleSelect = (eventKey) => {
    setSidebarOpen(false);
    if (eventKey === "logout") {
      handleLogout();
      return;
    }
    navigate("/dashboard/" + eventKey);
  };

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login"); // Rediriger vers la page de connexion après la déconnexion
  };

  useEffect(() => {
    if (sidebaropen) {
      navigate("/dashboard/publications");
    }
  }, [navigate, sidebaropen]);
  return (
    <SideNav
      onToggle={handleToggle}
      onSelect={handleSelect}
      className="mysidenav"
      expanded={sidebaropen}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="publications">
        <NavItem eventKey="messenger">
          <NavIcon>
            <MailOutlineIcon />
          </NavIcon>
          <NavText>Messenger</NavText>
        </NavItem>
        <NavItem eventKey="publications">
          <NavIcon className="nav-item-icon">
            <BookIcon />
          </NavIcon>
          <NavText>Liste de Publications</NavText>
        </NavItem>
        <NavItem eventKey="profile">
          <NavIcon>
            <AccountCircleIcon />
          </NavIcon>
          <NavText>Profil</NavText>
        </NavItem>
        <NavItem eventKey="logout">
          <NavIcon>
            <ExitToAppIcon />
          </NavIcon>
          <NavText>Déconnexion</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default MySideNav;
