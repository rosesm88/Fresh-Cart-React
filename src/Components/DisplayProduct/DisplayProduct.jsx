import React, { useContext, useEffect, useState } from "react";
import img2 from "../../Assets/images/1680392991271-cover.jpeg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../Context/UserContaxt";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { wishContext } from "../../Context/WishlistContext";
import { userId } from "../../Context/UserIDContext";
export default function DisplayProduct() {
  let { id } = useParams();
  let [productInfo, setProduct] = useState({});
  let [loading, setLoading] = useState(false);
  let { userToken } = useContext(userContext);
  let { wishList, setWishList } = useContext(wishContext);
  let { cart, setCart } = useContext(userId);

  useEffect(() => {
    {
      setLoading(true);
      getProductById();
    }
  }, []);
  async function getProductById() {
    let productInfo = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(productInfo.data.data);
    setLoading(false);
  }
  async function addToCart(id) {
    toast.success("Product added successfully to your cart");

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => {
        setCart(res.data.data.products);
      });
  }

  async function addToWishList(id) {
    toast.success("Product added successfully to your wishlist");
    let newWishlist = [...wishList];
    newWishlist.push(id);
    setWishList(newWishlist);
    await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      {
        headers: {
          token: userToken,
        },
      }
    );
  }

  return (
    <>
      <Helmet>
        <title>{productInfo?.title}</title>
      </Helmet>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 py-5">
          <div className="spinner-border text-main" role="status">
            <span className="visually-hidden">
              <i className="fas fa-spinner fa-spin position-absolute"></i>
            </span>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center align-items-center g-4 py-0 py-lg-5 my-0 mb-4 mb-md-0 my-lg-5">
          <div className="col-12 col-md-3">
            <img src={productInfo?.imageCover} className="w-100" alt="" />
          </div>
          <div className="col-12 col-md-9">
            <h2>{productInfo?.title}</h2>
            <p className="px-2">{productInfo?.description}</p>
            <h3>
              <Link className="text-main text-decoration-none fs-5" to="/">
                {productInfo?.category?.name}
              </Link>
            </h3>
            <h4 className="my-3 d-flex justify-content-between h5">
              <p>{productInfo?.price} EGP</p>
              <p>
                {" "}
                <i className="fas fa-star rating-color"></i>{" "}
                {productInfo?.ratingsAverage}
              </p>
            </h4>
            <div className="row justify-content-between align-items-center g-2 p-0">
              <div className="col-10 p-0">
                <button
                  onClick={() => {
                    addToCart(id);
                  }}
                  className="btn bg-main text-white w-100"
                >
                  Add to card
                </button>
              </div>
              <div className="col-1 p-0">
                <button
                  onClick={() => {
                    addToWishList(id);
                  }}
                  className="btn text-black w-100  d-flex justify-content-center"
                >
                  {wishList.includes(id) ? (
                    <i className="fa-solid fa-heart red-icon icon-font"></i>
                  ) : (
                    <i className="fas fa-heart text-black icon-font" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
