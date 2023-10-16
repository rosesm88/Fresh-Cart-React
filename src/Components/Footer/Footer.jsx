import React from "react";
import amazonPayLogo from "../../Assets/images/Amazon_Pay_logo.svg.png";
import amricanExpressLogo from "../../Assets/images/American-Express-Color.png";
import masterCardLogo from "../../Assets/images/MasterCard_Logo.svg.webp";
import paypalLogo from "../../Assets/images/paypal-784404_640.webp";
import appStoreLogo from "../../Assets/images/app.png";
import googlePlayLogo from "../../Assets/images/Google_Play_Store_badge_EN.svg.png";
import style from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <h2>Get the FreshCart App</h2>
        <p>
          We will send you a link, open it on your phone to downlaod the app.
        </p>
        <form className="d-flex column-gap-1 column-gap-lg-4 ms-0">
          <input
            className="ms-0 ms-lg-4 form-control w-75"
            type="email"
            placeholder="Enter..."
          />
          <button
            type="submit"
            className="btn bg-main text-white footerSmallFont"
          >
            Share App Link
          </button>
        </form>
        <div className="row row-cols-1 row-cols-lg-2 border border-1 border-start-0 border-end-0 mt-4 justify-content-between align-items-center">
          <div className="col">
            <div className="d-flex align-items-center py-2">
              <p className="">Payment Partners</p>
              <img
                src={amazonPayLogo}
                width={80}
                height={20}
                alt="amazon pay logo"
                className="mb-1 ms-3"
              />
              <img
                src={amricanExpressLogo}
                width={100}
                height={30}
                alt="amrican Express logo"
                className="mb-2 ms-3"
              />
              <img
                src={masterCardLogo}
                width={60}
                height={30}
                alt="amrican Express logo"
                className="mb-2 ms-3"
              />
              <img
                src={paypalLogo}
                width={60}
                height={30}
                alt="amrican Express logo"
                className="mb-2 ms-3"
              />
            </div>
          </div>
          <div className="col">
            <div className="d-flex align-items-center">
              <p className="p-0 m-0">Get deliveries with FreshCart</p>
              <img
                src={appStoreLogo}
                width={100}
                height={30}
                alt="amazon pay logo"
                className="mb-1 ms-3"
              />
              <img
                src={googlePlayLogo}
                width={100}
                height={30}
                alt="amazon pay logo"
                className="mb-1 ms-3"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
