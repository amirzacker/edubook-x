import logo from "./logo.svg";
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
import { Public } from "@material-ui/icons";
import PublicationList from "./pages/publicationList/PublicationList";
import Publication from "./components/publication/Publication";
import NewPublication from "./components/publication/NewPublication";
import EditPublication from "./components/publication/EditPublication";
import Profile from "./pages/Profile";
import Publications from "./pages/publicationList/Publications";


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
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Les routes avec AppLayout */}

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="/dashboard/messenger" element={<Messenger />} />
          {/* <Route path="/dashboard/publications" element={<PublicationList />} /> */}
          <Route path="/dashboard/publications" element={<Publications />} />
          <Route path="/dashboard/publications/:publicationId" element={<EditPublication />} />
          <Route path="/dashboard/publications/new" element={<NewPublication />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard/publications" replace />} />
        </Route>

        <Route path="*" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
