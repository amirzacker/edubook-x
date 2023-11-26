import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Success from "./pagesNg/Success";
import { useSelector } from "react-redux";
import Login from "./pagesNg/Login";
import Register from "./pagesNg/Register";
import Cart from "./pagesNg/Cart";
import Messenger from "./pagesNg/messenger/Messenger";
import Dashboard from "./componentsNg/Dashboard";
import { Public } from "@material-ui/icons";
import PublicationList from "./pagesNg/publication/PublicationList";
import Publication from "./pagesNg/publication/Publication";
import NewPublication from "./componentsNg/publication/NewPublication";
import EditPublication from "./componentsNg/publication/EditPublication";
import DetailPublication from "./componentsNg/publication/DetailPublication";
import Profile from "./pagesNg/dashboard/Profile";
import Publications from "./pagesNg/dashboard/MyPublications";
import Home from "./pagesNg/Home";
import NotFoundPage from "./pagesNg/NotFoundPage";

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
