import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContaxt";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishlistContext";
import { userId } from "../../Context/UserIDContext";

export default function WishList() {
  let [wishlist, setWishlist] = useState([]);
  let { wishList, setWishList } = useContext(wishContext);

  let { userToken } = useContext(userContext);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let { cart, setCart } = useContext(userId);

  useEffect(() => {
    setLoading(true);
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setWishlist(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }
  async function addToCart(id) {
    toast.success("Item Added To Cart");
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
      })
      .catch((err) => {
      });
  }
  async function removeItemFromWishlist(id) {
    toast.success("Item Removed From Wishlist");
    setLoading(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        let ids = [];
        for (let i = 0; i < res.data.data.length; i++) {
          ids.push(res.data.data[i].id);
        }
        setWishList(ids);
        getUserWishlist();
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-main" role="status">
            <span className="visually-hidden">
              <i className="fas fa-spinner fa-spin position-absolute"></i>
            </span>
          </div>
        </div>
      ) : (
        <>
          {wishlist?.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center py-5 vh-100 flex-column row-gap-4">
              <h2 className="text-main">Your wishlist is empty</h2>
              <Link to={"/Home"}>
                {" "}
                <button className="btn bg-main text-white">
                  Keep Shopping?
                </button>{" "}
              </Link>
            </div>
          ) : (
            <div className="mt-4 mb-3 py-4 px-4 bg-main-light">
              <h2>My wish List :</h2>
              <div className="row justify-content-between align-items-center p-0 m-0 row-gap-3 p-2">
                {wishlist?.map((item) => {
                  return (
                    <div className="col-12 p-0 m-0" key={item?.id}>
                      <div className="row justify-content-between align-items-center p-0 m-0 pb-2 border-bottom border-1">
                        <div className="col-4 col-md-1 p-0">
                          <div className="product-img">
                            <img
                              src={item?.imageCover}
                              alt={item?.title}
                              className="w-100"
                            />
                          </div>
                        </div>
                        <div className="col-8 col-md-9">
                          <p className="fw-bolder">{item?.title}</p>
                          <p className="text-main">
                            Price : {item?.price} EGP{" "}
                          </p>
                          <button
                            className="bg-transparent border-0 p-0"
                            onClick={() => {
                              removeItemFromWishlist(item?.id);
                            }}
                          >
                            <i className="fa-solid fa-trash-can text-main"></i>{" "}
                            Remove
                          </button>
                        </div>
                        <div className="col-12 col-md-2 mt-3 mt-md-0 d-flex align-items-center justify-content-end p-0">
                          <button
                            onClick={() => {
                              addToCart(item?.id);
                            }}
                            className="btn bg-main text-white form-control"
                          >
                            Add to card
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
