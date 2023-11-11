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
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Messenger from "./pages/messenger/Messenger";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={user ? <Navigate to="/" replace /> : <Login />} /> */}
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/product" element={<Product />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/login" element={<Login />} />
        <Route path="/slider" element={<Sidebar />} />
      </Routes>
        <Sidebar />
    </Router>
  );
}

export default App;
