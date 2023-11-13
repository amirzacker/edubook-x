import React, { useState } from "react";
import MySideNav from "./MySideNav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  transition: padding-left 0.3s ease;
  padding-left: ${(props) => (props.sidebarOpen ? "250px" : "70px")};
`;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MainLayout>
      <MySideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Content sidebarOpen={sidebarOpen}>
        <Outlet />
      </Content>
    </MainLayout>
  );
};

export default Dashboard;
