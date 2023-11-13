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

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <Router>
      <Routes>
        {/* Les routes sans AppLayout */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={user ? <Navigate to="/" replace /> : <Login />} /> */}
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* Les routes avec AppLayout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/messenger" element={<Messenger />} />
          <Route path="/dashboard/publications" element={<PublicationList />} />
          <Route path="/dashboard/publications/:publicationId" element={<Publication />} />
          <Route path="/dashboard/publications/new" element={<NewPublication />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
