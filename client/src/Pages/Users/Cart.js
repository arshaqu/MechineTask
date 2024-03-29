import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams ,useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(id);

  const getproduct = async () => {
    console.log("hii");
    const token = localStorage.getItem('token');
    if(token) {
      const response = await axios.post(
        "/api/user/getcartdata",
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data, "-----------------------");
      setProduct(response.data.Products);
    } else {
      let cartProduct = localStorage.getItem('cartProduct');
      cartProduct = JSON.parse(cartProduct);
      cartProduct = cartProduct.flat();
      setProduct(cartProduct);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  const checkoout = async () =>{
    let token = await localStorage.getItem('token')
    console.log(token);
    try {
      if(!token){
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (productToDelete) => {
    console.log(productToDelete);
    const token = localStorage.getItem('token');
    if(token) {
        try {
        const response = await axios.post(
          "/api/user/delete",
          { product: productToDelete },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        setProduct(
          product.filter((product) => product._id !== productToDelete._id)
        );
        alert("Item has been deleted.");
      } catch (error) {
        console.log(error);
      }
      }else{
        let data = localStorage.getItem('cartProduct');
        data = JSON.parse(data);
        data = data.flat();
        localStorage.removeItem('cartProduct');
        const filter = data.filter(item => item.productid !== productToDelete.productid);
        setProduct(filter)
        localStorage.setItem('cartProduct',JSON.stringify(filter))
      }
  };

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
                    style={{ marginLeft: "850px" }}
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
        <h1 style={{ color: "#D20062" }} className="pro_h1 mt-2">
          CART
        </h1>
      </div>

      {product.map((product, index) => (
        <div
          key={index}
          style={{
            width: "80%",
            fontFamily: "initial",
            marginLeft: "150px",
            height: "auto",
            boxShadow: "0 0 8px grey",
          }}
          className=" mt-2 mb-2 "
        >
          <div style={{ boxshadow: "" }} className="row  ">
            <div className="col-md-4">
              <img
                src={`http://localhost:5000/file/${product.image}`}
                alt=""
                className="img-fluid rounded-top mt-2 mx-3"
                style={{ width: "250px", height: "250px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="row">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "300px",
                  }}
                >
                  <p className="mt-2">Product Name : </p>
                  <h4 className="mb-2 mt-1 mx-1" style={{ color: "#7E5A0C" }}>
                    {product.product}
                  </h4>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>
                    Model Number: <u>{product.model}</u>
                  </p>
                  <p style={{marginLeft:'350px' }}>
                    PRICE: {product.price}                  
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>
                    <strong>Color:</strong>{" "}
                    <span style={{ color: "red" }}>{product.color}</span>
                  </p>
                  <p style={{ marginLeft: "280px" }}>size :</p>
                  <p className="mx-2">{product.size}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p>
                    <strong>Category:</strong>{" "}
                    <span style={{ color: "red" }}>{product.category}</span>
                  </p>
                  <p style={{ marginLeft: "250px" }}>Count :</p>
                  <p className="mx-2">{product.count}</p>
                </div>
              </div>

              <div className="col text-lg mt-3">
                <p>Description:</p>
                <p className="font-weight-bold">{product.description}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  marginTop: "-80px",
                }}
              >
                <p className="mt-1" style={{ marginLeft: "480px" }}>
                 TOTAL PRIZE :
                </p>
                <p
                  style={{ fontSize: "20px", color: "green" }}
                  className="mx-2"
                >
                  {product.price * product.count }{" "}
                </p>
                <button
                  onClick={() => {
                    handleDelete(product);
                  }}
                  style={{ width: "100px", marginLeft: "25px", height: "40px" }}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
      onClick={() => {checkoout()}}
        style={{
          margin: 0,
          width: "250px",
          backgroundColor: "#D20062",
          color: "white",
          fontFamily: "serif",
          marginLeft: "1120px",
          height: "40px",
        }}
        className="btn mt-2 mb-3"
        type="button"
      >
        Check Out
      </button>
    </div>
  );
}

export default Cart;
