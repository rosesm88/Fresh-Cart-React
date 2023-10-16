import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../Context/UserContaxt";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userId } from "../../Context/UserIDContext";

export default function Cart() {
  let [cart, setCart] = useState({});
  let [loading, setLoading] = useState(false);
  let { userToken } = useContext(userContext);
  let [timeoutReq, setTimeoutReq] = useState(null);
  let [cartOwner, setCartOwner] = useState(null);
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let { cart: cartItems, setCart: setCartItems } = useContext(userId);
  // let { userid, getUserID } = useContext(userId);

  useEffect(() => {
    setLoading(true);
    getUserCart();
  }, []);
  async function getUserCart() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setCartOwner(res.data.data._id);
        setCart(res.data.data);
        setCartItems(res.data.data.products);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoading(false);
  }
  async function removeItemFromCart(id) {
    toast.success("Item Removed From Cart");
    setLoading(true);
    let newCart = [...cartItems];
    newCart.length = cart.products.length - 1;
    setCartItems(newCart);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setCart(res.data.data);
        setCartItems(res.data.data.products);
        if (cartItems === 0) {
          setError("0 Items in Cart");
          removeCartitems();
        }
        setLoading(false);
      })
      .catch((err) => {
        
        setLoading(false);
      });
  }
  async function removeCartitems() {
    setError("0 Items in Cart");
    setCartItems([]);
    setLoading(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setCart(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  async function updateItemCount(id, count, index) {
    if (count < 1) {
      removeItemFromCart(id);
    } else if (count >= 1) {
      toast.success("Item Count Updated");
      let newCart = { ...cart };
      let productMainPrice = newCart.products[index].price;

      newCart.totalCartPrice +=
        productMainPrice * (count - newCart.products[index].count);
      newCart.products[index].count = count;
      setCart(newCart);

      clearTimeout(timeoutReq);
      setTimeoutReq(
        setTimeout(async () => {
          await axios
            .put(
              `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
              {
                count,
              },
              {
                headers: {
                  token: userToken,
                },
              }
            )
            .then((res) => {
              setCart(res.data.data);
            })
            .catch((err) => {
              toast.error("Something Went Wrong");
            });
        }, 3000)
      );
    }
  }

  function checkout(totalCartPrice) {
    navigate("/Checkout", { state: { totalCartPrice, cartOwner } });
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
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
          {cart?.products?.length == 0 ||
          cart?.totalCartPrice == 0 ||
          cartItems == 0 ? (
            <div className="d-flex justify-content-center align-items-center py-5 vh-100 flex-column row-gap-4">
              <h2 className="text-main">Your Cart is empty</h2>
              <Link to={"/Home"}>
                {" "}
                <button className="btn bg-main text-white">
                  Keep Shopping?
                </button>{" "}
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-4 mb-3 py-4 px-4 bg-main-light">
                <h2 className="py-4 fw-bold">Shop Cart:</h2>
                <div className="row justify-content-between align-items-center p-0 m-0 row-gap-3">
                  {cart?.products?.map((item, index) => {
                    return (
                      <div className="col-12 p-0 m-0" key={item?.product?.id}>
                        <div className="row justify-content-between align-items-center p-0 m-0 pb-2 border-bottom border-1">
                          <div className="col-4 col-md-1 p-0">
                            <div className="product-img">
                              <img
                                src={item?.product?.imageCover}
                                alt={item?.product?.title}
                                className="w-100"
                              />
                            </div>
                          </div>
                          <div className="col-4 col-md-9">
                            <p className="fw-bolder">{item?.product?.title}</p>
                            <p className="text-main">
                              Price : {item?.price * item?.count} EGP{" "}
                            </p>
                            <button
                              className="bg-transparent border-0 p-0"
                              onClick={() => {
                                removeItemFromCart(item?.product?.id);
                              }}
                            >
                              <i className="fa-solid fa-trash-can text-main"></i>{" "}
                              Remove
                            </button>
                          </div>
                          <div className="col-4 col-md-2 d-flex align-items-center justify-content-end">
                            <button
                              onClick={() => {
                                updateItemCount(
                                  item?.product?.id,
                                  item?.count - 1,
                                  index
                                );
                              }}
                              className="btn btn-outline-danger"
                            >
                              -
                            </button>
                            <span className="px-3">{item?.count}</span>
                            <button
                              onClick={() => {
                                updateItemCount(
                                  item.product.id,
                                  item?.count + 1,
                                  index
                                );
                              }}
                              className="btn btn-outline-success"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-0">
                  <p className="text-main fw-bold">
                  Total Cart Price :{" "}
                  {cart?.totalCartPrice ? cart?.totalCartPrice : "0"} EGP{" "}
                </p>
                    <button
                      className="btn bg-main text-white w-100"
                      onClick={() => {
                        checkout(cart?.totalCartPrice);
                      }}
                    >
                      CheckOut
                    </button>
                  </div>
                </div>
                
              </div>
              <button
                className="btn bg-danger text-white d-block ms-auto mb-4"
                onClick={() => {
                  removeCartitems();
                }}
              >
                <i className="fa-solid fa-trash-can"></i> Clear Cart
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
