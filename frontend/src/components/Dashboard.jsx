import React, { useState } from "react";
import MySideNav from "./sideNav/MySideNav";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./header/Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = styled.div`
  position: sticky;
  display: block;
  height: 100%;
  min-height: 80vh;
`;

const Content = styled.div`
  flex-grow: 1;
  transition: padding-left 0.3s ease;
  padding-left: ${(props) => (props.$sidebaropen ? "250px" : "70px")};
`;

const Dashboard = () => {
  const [sidebaropen, setSidebarOpen] = useState(false);

  const location = useLocation();

  // Redirection si l'utilisateur accède directement à '/dashboard' ou '/dashboard/'
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/"
  ) {
    return <Navigate to="/dashboard/publications" replace />;
  }

  return (
    <>
      <Navbar />
      <MainLayout>
        <MySideNav sidebaropen={sidebaropen} setSidebarOpen={setSidebarOpen} />
        <Content $sidebaropen={sidebaropen}>
          <Outlet />
        </Content>
      </MainLayout>
      <Footer/>
    </>
  );
};

export default Dashboard;
