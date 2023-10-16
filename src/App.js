import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import DisplayCategory from "./Components/DisplayCategory/DisplayCategory";
import DisplayProduct from "./Components/DisplayProduct/DisplayProduct";
import UserContextProvider from "./Context/UserContaxt";
import WishList from "./Components/WishList/WishList";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import WishListContextProvider from "./Context/WishlistContext";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/allOrders/AllOrders";
import UserIdContextProvider from "./Context/UserIDContext";

let routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: "/",
        element: (
          <ProtectedRoute>
            <Navigate to={"/Home"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "/Login", element: <Login /> },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/DisplayProduct/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <DisplayProduct />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/Wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        index: "/allorders",
        element: (
          <ProtectedRoute>
            <Navigate to={"/AllOrders"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/VerifyCode",
        element: <VerifyCode />,
      },
      {
        path: "/ResetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/ChangePassword",
        element: <ChangePassword />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <UserIdContextProvider>
      <UserContextProvider>
        <WishListContextProvider>
          <RouterProvider router={routes}></RouterProvider>;
        </WishListContextProvider>
      </UserContextProvider>
    </UserIdContextProvider>
  );
}

export default App;
