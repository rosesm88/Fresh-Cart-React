import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContaxt";
import Cookies from "js-cookie";
import { userId } from "../../Context/UserIDContext";
export default function Navbar() {
  let { userToken, setUserToken } = useContext(userContext);
  let { cart, setUserID, userid } = useContext(userId);

  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken ? (
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"} aria-current="page">
                  Home <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/Wishlist"}>
                  Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Categories"}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Brands"}>
                  Brands
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/allOrders"}>
                  Orders
                </Link>
              </li>
            </ul>
          ) : null}
          <ul className="navbar-nav list-unstyled me-4 ms-auto mt-2 mt-lg-0 d-flex flex-column flex-md-row">
            <li className="nav-item">
              <ul className="list-unstyled d-flex flex-row d-md-none  d-lg-flex ">
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://www.instagram.com/"} target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://www.facebook.com/"} target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://www.tiktok.com/en/"} target="_blank">
                    <i className="fa-brands fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://twitter.com/"} target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://www.linkedin.com/"} target="_blank">
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link className="nav-link cursor-pointer me-2" to={"https://www.youtube.com/"} target="_blank">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </li>
                {userToken ? (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping fs-6 text-success"></i>{" "}
                      <sup className="fw-bolder fs-6">{cart.length}</sup>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </li>
            {userToken ? (
              <li className="nav-item">
                <span
                  className="nav-link cursor-pointer fw-normal text-danger"
                  onClick={() => {
                    Cookies.remove("userToken");
                    setUserToken(null);
                    setUserID(null);
                    navigate("/login");
                  }}
                >
                  Signout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Login"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Register"}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
