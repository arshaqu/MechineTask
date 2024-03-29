import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Allrounder.css";
import lottie from "lottie-web";
import login from "../.././Assets/Animation - 1711628287745.json";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current,
      animationData: login,
      loop: true,
      autoplay: true,
    });
    animation.setSpeed(0.9);
    return () => {
      animation.destroy();
    };
  }, []);

  const onFinish = async () => {
    try {
      const values = {
        email,
        password,
      };

      const cartProduct = localStorage.getItem('cartProduct');
      console.log(cartProduct,"----------------");
     
      const response = await axios.post("/api/user/login", values);
      if (response.data.success) {
        toast.success("Login Successfully");
        localStorage.setItem("token", response.data.data);

        if (cartProduct) {
          const token = localStorage.getItem("token");
          const response1 = await axios.post('/api/user/localCart', JSON.parse(cartProduct), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response1);
          localStorage.removeItem('cartProduct')
          navigate("/");
         }
      } else {
        toast.error("Email or Password is Incorrect");
      }
    } catch (error) {
      console.log(error);
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
        <div style={{ width: "700px" }} ref={lottieContainer}></div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <h2 style={{ color: "#A1C398" }} className="Font_Family mb-4">
            USER LOGIN
          </h2>

          <form style={{ width: "400px" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-3"
            >
              <h6
                style={{ color: "#070F2B", fontWeight: "inherit" }}
                className="names mx-1 Font_Family"
              >
                Email
              </h6>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control inputs mt-1"
              placeholder="Enter Email..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />

            <div
              style={{ display: "flex", alignItems: "center" }}
              className="fle mt-4"
            >
              <h6
                style={{ color: "#070F2B", fontWeight: "inherit" }}
                className="names Font_Family"
              >
                Password
              </h6>
            </div>

            <div>
              <div>
                <input
                  id="hide"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control inputs mt-1 mb-4"
                  placeholder="Enter Password..."
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div></div>
              </div>
            </div>

            <div className="d-grid gap-2 col-6 mt-5">
              <button
                onClick={onFinish}
                style={{
                  margin: 0,
                  width: "470px",
                  backgroundColor: "#070F2B",
                  color: "white",
                  fontFamily: "serif",
                }}
                className="btn  ml- mb-3"
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
                <p style={{ margin: 0 }}>Are you New ?</p>
                <Link
                  className="mx-2"
                  to="/register"
                  style={{
                    cursor: "pointer",
                    fontFamily: "cursive",
                    color: "#A1C398",
                  }}
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
