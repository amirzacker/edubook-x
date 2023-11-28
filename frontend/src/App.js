import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Messenger from "./pages/messenger/Messenger";
import Dashboard from "./components/Dashboard";
import PublicationList from "./pages/publication/PublicationList";
import Publication from "./pages/publication/Publication";
import NewPublication from "./components/publication/NewPublication";
import EditPublication from "./components/publication/EditPublication";
import Profile from "./pages/dashboard/Profile";
import Publications from "./pages/dashboard/MyPublications";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import MyOrders from "./pages/dashboard/MyOrders";
import DetailPublication from "./components/publication/DetailPublication";


const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user.currentUser);
  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Les routes sans AppLayout */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/publications" element={<PublicationList />} />
        <Route path="/publications/:publicationId" element={<Publication />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* Les routes avec AppLayout */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/messenger" element={<Messenger />} />
          {/* <Route path="/dashboard/publications" element={<PublicationList />} /> */}
          <Route path="/dashboard/publications" element={<Publications />} />
          <Route path="/dashboard/orders" element={<MyOrders />} />
          <Route
            path="/dashboard/publications/:publicationId"
            element={<EditPublication />}
          />
          <Route
            path="/dashboard/publications/detail/:publicationId"
            element={<DetailPublication />}
          />
          <Route
            path="/dashboard/publications/new"
            element={<NewPublication />}
          />
          <Route path="/dashboard/profile" element={<Profile />} />
          {/* <Route path="*" element={<Navigate to="/dashboard/publications" replace />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
