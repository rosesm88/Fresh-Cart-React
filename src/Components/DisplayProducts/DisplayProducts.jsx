import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/UserContaxt";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishlistContext";
import { userId } from "../../Context/UserIDContext";

export default function DisplayProducts() {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let { userToken } = useContext(userContext);
  let { wishList, setWishList } = useContext(wishContext);
  let { cart, setCart } = useContext(userId);
  let [keyword, setKeyword] = useState("");
  let inputRef = useRef();
  useEffect(() => {
    setLoading(true);
    getUserWishlist();
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let products = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(products.data.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addToWishList(id) {
    if (wishList.includes(id)) {
      toast.error("Product already in your wishlist");
      return;
    }
    let newWishlist = [...wishList];
    newWishlist.push(id);
    setWishList(newWishlist);
    toast.success("Product added successfully to your wishlist");
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
  async function getUserWishlist() {
    let ids = [];
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  return (
    <>
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
          <input
            type="text"
            id="search"
            name="search "
            className="form-control mb-3"
            placeholder="Search for a product"
            onInput={() => {
              setKeyword(document.getElementById("search").value);
            }}
          />
          <div
            id="productRow"
            className="row align-items-center g-3 row-cols-2 row-cols-md-4 row-cols-lg-6 row-gap-4 pb-0 pb-md-5"
          >
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((product) => {
                return (
                  <div
                    className="col product overflow-hidden"
                    key={product?.id}
                  >
                    <Link
                      className="text-decoration-none  text-black"
                      to={`/DisplayProduct/${product._id}`}
                    >
                      <img
                        src={product.imageCover}
                        className="w-100"
                        alt={product.title}
                        height={300}
                      />
                      <div className="px-2">
                        <p className="text-main p-0 m-0">
                          {product.category.name}
                        </p>
                        <h5 className="text-black">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h5>
                        <p className="d-flex justify-content-between p-0 m-0">
                          <span>{product.price} EGP</span>
                          <span>
                            <i className="fas fa-star rating-color me-1"></i>
                            {product.ratingsAverage}
                          </span>
                        </p>
                      </div>
                    </Link>
                    <div className="row justify-content-between align-items-center g-2 my-2">
                      <div className="col-9 ">
                        <button
                          onClick={() => {
                            addToCart(product._id);
                          }}
                          className="btn bg-main text-white w-100"
                        >
                          Add to card
                        </button>
                      </div>
                      <div className="col-3 ">
                        <button
                          onClick={() => {
                            addToWishList(product._id);
                          }}
                          className="btn d-flex justify-content-center  w-100 border border-1"
                        >
                          {wishList.includes(product._id) ? (
                            <i className="fa-solid fa-heart red-icon icon-font"></i>
                          ) : (
                            <i className="fas fa-heart text-black icon-font" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
