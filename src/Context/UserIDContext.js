import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const userId = createContext();

export default function UserIdContextProvider({ children }) {
  let [userid, setUserID] = useState("");
  let [cart, setCart] = useState([]);
  let userToken = Cookies.get("userToken");

  async function getUserID() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        setCart(res.data.data.products);
        setUserID(res.data.data.cartOwner);
      })
      .catch((err) => {
        setUserID(
          err.response.data.message.split("No cart exist for this user: ")[1]
        );
      });
  }
  useEffect(() => {
    getUserID();
  }, []);
  return (
    <userId.Provider value={{ userid, cart, setCart, getUserID, setUserID }}>
      {children}
    </userId.Provider>
  );
}
