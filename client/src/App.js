import React from "react";
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from "./Pages/Users/Login";
import Register from "./Pages/Users/Register";
import {Toaster} from 'react-hot-toast'
import Home from "./Pages/Users/Home";
import AddProducts from "./Pages/Users/AddProducts";
import Cart from "./Pages/Users/Cart";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import PublicRoutes from "./Components/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/addproduct" element={<AddProducts/>}/>
        <Route path="/cart" element={<Cart/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
