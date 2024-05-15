//App component
//web app renders from here

import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Orders";
import Favorite from "./pages/Favorite";

//render function
function App() {
  return (
    <>
      <Toaster ></Toaster>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>

    </>
  );
}

export default App;
