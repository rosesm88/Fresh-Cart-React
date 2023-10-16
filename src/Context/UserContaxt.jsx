import Cookies from "js-cookie";
import { createContext, useState } from "react";
export let userContext = createContext();

export default function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(Cookies.get("userToken"));
  return (
    <userContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </userContext.Provider>
  );
}
