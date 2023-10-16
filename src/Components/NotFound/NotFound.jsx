import React from "react";
import notFoundImg from "../../Assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>NotFound</title>
      </Helmet>
      <div className="">
        <img
          src={notFoundImg}
          className="d-block mx-auto py-5 my-5"
          alt="Not Found Page"
        />
      </div>
    </>
  );
}
