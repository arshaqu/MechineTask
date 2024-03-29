import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Allrounder.css";
import lottie from "lottie-web";
import register from "../.././Assets/Animation1 - 1711628978097.json";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current,
      animationData: register,
      loop: true,
      autoplay: true,
    });
    animation.setSpeed(0.9);
    return () => {
      animation.destroy();
    };
  }, []);

  const navigate = useNavigate();
  const onFinish = async () => {
    try {
      const values = {
        name,
        email,
        phone,
        password,
      };
      const response = await axios.post("/api/user/register", values);
      console.log(response.data);
      if (response.data.success) {
        toast.success("user Registered");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error is occure please try later");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#C6EBC5",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <h2
            style={{ color: "#A1C398", color: "black" }}
            className="Font_Family mb-4"
          >
            USER REGISTRATION{" "}
          </h2>
          <form style={{ width: "400px" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-3"
            >
              <h6 style={{ color: "#070F2B" }} className="names Font_Family">
                Name{" "}
              </h6>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control inputs "
              placeholder="Enter Name..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-3"
            >
              <h6
                style={{ color: "#070F2B" }}
                className="names mx-1 Font_Family"
              >
                Email
              </h6>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control inputs "
              placeholder="Enter Email..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />

            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-3"
            >
              <h6 style={{ color: "#070F2B" }} className="names Font_Family">
                Phone
              </h6>
            </div>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control inputs "
              placeholder="Enter Phone..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />

            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-3"
            >
              <h6 style={{ color: "#070F2B" }} className="names Font_Family">
                Password
              </h6>
            </div>
            <input
              id="hide"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control inputs  mb-3"
              placeholder="Enter Password..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <div></div>
            <div className="d-grid gap-2 col-6 ">
              <button
                onClick={onFinish}
                style={{
                  width: "460px",
                  backgroundColor: "#070F2B",
                  color: "white",
                  fontFamily: "serif",
                  fontWeight: "",
                }}
                className="btn  mt-4 "
                type="button"
              >
                Submit
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "80px",
                marginTop: "30px",
                fontSize: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ margin: 0, color: "gray" }}>Already an User ?</p>
                <Link
                  className="mx-2"
                  to="/login"
                  style={{
                    cursor: "pointer",
                    fontFamily: "cursive",
                    color: "#557C55",
                  }}
                >
                  Go to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flexDirection: "column" }}></div>
        <div style={{ width: "700px" }} ref={lottieContainer}></div>
      </div>
    </div>
  );
}

export default Register;
