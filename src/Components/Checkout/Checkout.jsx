import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../../Context/UserContaxt";
import toast from "react-hot-toast";
import { userId } from "../../Context/UserIDContext";

export default function Checkout() {
  const location = useLocation();
  let [loading, setLoading] = useState(false);
  let { totalCartPrice, cartOwner } = location.state;
  let paymentOption1 = useRef();
  let paymentOption2 = useRef();
  const navigate = useNavigate();
  let { userid, getUserID, setCart } = useContext(userId);

  let validationSchema = yup.object({
    details: yup.string().required("Details is required"),
    phone: yup
      .string()
      .matches(/^01[015][0-9]{8}$/, "Enter a valid Phone")
      .required("Phone is required"),
    city: yup.string().required("City is required"),
  });
  const { userToken } = useContext(userContext);
  let url = "";
  async function handleSubmit(values) {
    if (paymentOption1.current.checked) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartOwner}`;
    } else if (paymentOption2.current.checked) {
      url = `https://ecommerce.routemisr.com/api/v1/orders/${cartOwner}`;
    } else {
      toast.error("Please Select Payment Method");
      return;
    }

    setLoading(true);
    await axios
      .post(url, values, {
        params: { url: "https://ziadessam12.github.io/FreshCart2/#" },

        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        if (paymentOption1.current.checked)
          window.location.href = res.data.session.url;
        else {
          setCart([]);
          navigate("/allOrders");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="w-75 mx-auto my-5 py-5">
        <h1>Checkout:</h1>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            name="details"
            id="details"
            className="form-control mb-2"
            placeholder="Enter Your Details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-danger mb-4">{formik.errors.details}</div>
          ) : null}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control mb-2"
            placeholder="Enter Your Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger mb-4">{formik.errors.phone}</div>
          ) : null}

          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control mb-2"
            placeholder="Enter Your City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-danger mb-4">{formik.errors.city}</div>
          ) : null}
          <div className="d-flex flex-column flex-md-row  my-3 gap-3">
            <div>
              <span className="">Payment Method</span>
            </div>
            <input
              className="form-check-input checked"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              ref={paymentOption1}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Credit Card
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              ref={paymentOption2}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Cash on delevery
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <h2 className="h6 text-main">Total Price: {totalCartPrice}</h2>

            {loading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="button"
                className="btn bg-main text-white mt-2"
              >
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Pay Now
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
