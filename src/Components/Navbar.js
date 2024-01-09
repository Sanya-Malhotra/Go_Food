import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal.js";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer.js";

function Navbar() {
  let data = useCart();
  let userEmail = localStorage.getItem("userEmail");
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand fs-1 fst-italic " to="/">
              GoFood
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="/navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 mt-2"
                    aria-current="page"
                    to="/"
                  >
                    <button className="btn bg-white text-success"> Home</button>
                  </Link>
                </li>

                {localStorage.getItem("authToken") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5 mt-2"
                      aria-current="page"
                      to="/myorder"
                    >
                      <button className="btn bg-white text-success">
                        My Orders
                      </button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {!localStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <div
                    className="btn bg-success text-success mx-2"
                 
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                     <Badge pill bg="danger" style={{width:'50px',height:'50px',fontWeight:'bold',fontSize:'26px',padding:'10px'}}>
                     {userEmail.slice(0,1).toUpperCase()}
                    </Badge>
                
                  </div>
                  <div
                    className="btn bg-white text-success mx-2"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    My Cart{" "}
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <div
                    className="btn bg-white text-danger mx-2"
                    onClick={handlelogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
