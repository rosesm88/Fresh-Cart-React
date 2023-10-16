import React from "react";
import img2 from "../../Assets/images/1680392991271-cover.jpeg";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function DisplayCategory() {
  let productId = useParams("id");
  let product = {
    name: "anyhting",
    description:
      "    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quisquam quas facere. Eligendi numquam, error natus praesentium aut eos dicta.",
    category: "Electronics",
    price: "1500",
    averageRating: 4.8,
  };

  return (
    <>
      <Helmet>
        <title>DisplayCategory</title>
      </Helmet>
      <div class="row justify-content-center align-items-center g-4 py-0 py-lg-5 my-0 mb-4 mb-md-0 my-lg-5">
        <div className="col-12 col-md-3">
          <img src={img2} className="w-100" alt="" />
        </div>
        <div className="col-12 col-md-8">
          <h2>{product.name}</h2>
          <p className="px-2">{product.description}</p>
          <h3>
            <Link className="text-main text-decoration-none fs-5" to="/">
              {product.category}
            </Link>
          </h3>
          <h4 className="my-3 d-flex justify-content-between h5">
            <p>{product.price} EGP</p>
            <p>
              {" "}
              <i className="fas fa-star rating-color"></i>{" "}
              {product.averageRating}
            </p>
          </h4>
          <button className="btn bg-main text-white w-100">Add to card</button>
        </div>
        <div className="col-12 col-md-1">
          <button className="btn btn-outline-danger">-</button>
          <span className="px-1">3</span>
          <button className="btn btn-outline-success">+</button>
        </div>
      </div>
    </>
  );
}
