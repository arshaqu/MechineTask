import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.post("/api/user/getProducts");
      setProducts(response.data.productslist);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageClick = async (productId) => {
  console.log(productId);
  const token = localStorage.getItem('token');
  if(token){
    const response = await axios.post(
      "/api/user/addCart",
      { Pro_id: productId },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    navigate(`/cart`);
  }else{
    const response = await axios.post(
      "/api/user/getProduct",
      { Pro_id: productId },
    )
    const data = [{
      productid: response.data._id,
      product: response.data.product,
      price: response.data.price,
      model: response.data.model,
      image: response.data.image,
      category: response.data.category,
      size: response.data.size,
      color: response.data.color,
      description: response.data.description,
      count: 1  
    }]

    let isData = localStorage.getItem('cartProduct');
    isData = JSON.parse(isData);

    if(isData) {
      localStorage.removeItem('cartProduct');
      isData.push(data);
      localStorage.setItem('cartProduct', JSON.stringify(isData));
      navigate(`/cart`);
    } else {
      localStorage.setItem('cartProduct', JSON.stringify(data));
      navigate(`/cart`);
    }

  }
  };


  useEffect(() => {
    const data = localStorage.getItem('cartProduct')
    console.log(data);
    getProduct();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#A1C398",
          fontFamily: "-moz-initial",
        }}
      >
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <h6
              style={{ fontFamily: "revert", pointerEvents: "none" }}
              className="navbar-brand nav_colo mt-2"
              href="#"
            >
              PRODUCT MEDIA
            </h6>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link 
             nav_colo"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav_colo" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav_colo" href="#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    style={{ marginLeft: "750px" }}
                    className="nav-link nav_colo"
                    href="/cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                    Cart
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link nav_colo mx-4" href="/login">
                    SIGN IN
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav_colo" href="/register">
                    SIGN UP
                  </a>
                </li>
               
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <h1 className="pro_h1 mt-2">PRODUCT LISTING</h1>
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "12000px",
            margin: "0 auto",
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="card mt-5 mx-5 mb-3"
              style={{ width: "15rem" }}
            >
              <img
                style={{ height: "280px", cursor: "pointer" }}
                onClick={() => handleImageClick(product._id)}
                className="rounded-t-lg"
                alt="pics is Not showing"
                src={`http://localhost:5000/file/${product.image[0]}`} 
              />
              <div style={{ fontFamily: "initial" }} className="card-body">
                <p
                  style={{ color: "green", fontSize: "21px" }}
                  className="card-text"
                >
                  Price ₹{product.price}
                </p>
                <p className="card-text"> Product Name :- {product.product}</p>
                <p className="card-text"> Category :- {product.category}</p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
