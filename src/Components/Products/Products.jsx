import React, { useEffect, useRef, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import DisplayProducts from "../DisplayProducts/DisplayProducts";

export default function Products() {
  let inputRef = useRef();
  let [Products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let Products = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/Products"
    );
    setProducts(Products.data.data);
    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="mt-5">
        <DisplayProducts />
      </div>
    </>
  );
}
