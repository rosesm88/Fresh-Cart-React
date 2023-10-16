import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { userContext } from "../../Context/UserContaxt";
import { Helmet } from "react-helmet";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { userToken, setUserToken } = useContext(userContext);

  async function handleSubmit(values) {
    setLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        Cookies.set("userToken", res.data.token, { expires: 1 });
        setUserToken(res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    setLoading(false);
  }

  let validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z](?=.*\d{3,20})\S*$/,
        "Password should start with a capital then a small letter then from 6 to 20 to any digit"
      )
      .min(6, "Password should be at least 6 characters")
      .max(20, "Password should be at most 20 characters"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 m-auto py-5 mt-5">
        <h2>Login Now:</h2>
        {error ? (
          <div className="alert alert-danger p-2 mt-2">{error}</div>
        ) : (
          ""
        )}
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlurCapture={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">password:</label>
          <input
            className="form-control mb-2"
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlurCapture={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between">
            <Link
              className="font-sm text-decoration-none text-danger"
              to={"/ResetPassword"}
            >
              forget Your password?
            </Link>
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
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
