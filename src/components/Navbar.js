import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
import { Badge } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [position, setPosition] = useState("sticky");
  const cartItem = useCart();
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    navigate("/login");
  };
  function scrolled() {
    if (window.scrollY > 100) {
      setPosition("fixed");
    } else {
      setPosition("sticky");
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-success position-${position} top-0`}
        style={{
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowNav(!showNav)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className=" navbar-collapse"
            style={showNav ? { display: "block" } : { display: "none" }}
            onClick={() => setShowNav(false)}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-3 active"
                    aria-current="page"
                    to="/order"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {localStorage.getItem("authToken") ? (
              <div>
                <button
                  className="btn bg-white text-success mx-2 "
                  onClick={() => setCartView(true)}
                >
                  Cart{" "}
                  <Badge pill bg="danger fs-6">
                    {cartItem.length}
                  </Badge>
                </button>
                <Modal onClose={() => setCartView(false)} isOpened={cartView}>
                  <Cart onClose={() => setCartView(false)} />
                </Modal>
                <button
                  className="btn bg-white text-success"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success" to="/login">
                  Login
                </Link>

                <Link className="btn bg-white text-success mx-3" to="/signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
