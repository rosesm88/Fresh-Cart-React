import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContaxt";
import Cookies from "js-cookie";

export let wishContext = createContext();

export default function WishListContextProvider({ children }) {
  let { userToken } = useContext(userContext);
  let [wishList, setWishList] = useState([]);
  async function getUserWishlist() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
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
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getUserWishlist();
  }, []);
  return (
    <wishContext.Provider
      value={{
        wishList,
        setWishList,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
