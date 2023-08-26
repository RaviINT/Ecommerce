import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";

function App() {
  const navigate = useNavigate();
  const User = useSelector((state) => state?.authSlice?.userLogin?.email);
  useEffect(() => {
    console.log("dete", User);
    if (!User) {
      navigate("/login");
    }
  }, [User]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
