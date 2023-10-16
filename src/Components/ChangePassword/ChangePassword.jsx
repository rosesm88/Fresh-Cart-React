import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ChangePassword() {
  const location = useLocation();
  let [loading, setLoading] = useState(false);
  const { email } = location.state;
  let navigate = useNavigate();

  async function handleSubmit(values) {
    setLoading(true);
    let data = {
      email,
      newPassword: values.newPassowrd,
    };
    console.log(values);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data)
      .then((res) => {
        toast.success("Password Changed Successfully");
        navigate("/Login");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    setLoading(false);
  }

  let validationSchema = yup.object({
    newPassowrd: yup
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
      newPassowrd: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <form className="w-75 mx-auto py-5 my-5" onSubmit={formik.handleSubmit}>
        <h1>Change Password: </h1>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          name="email"
          className="form-control mb-4 disabled"
          id="email"
          value={email}
          placeholder="Enter Your Email"
          disabled
        />
        <label htmlFor="newPassowrd">Enter Your New Password:</label>
        <input
          onChange={formik.handleChange}
          onBlurCapture={formik.handleBlur}
          type="password"
          name="newPassowrd"
          className="form-control mb-2"
          id="newPassowrd"
          value={formik.values.newPassowrd}
          placeholder="Enter The New Password"
        />

        <div className="d-flex justify-content-between">
          <Link className="font-sm text-decoration-none" to={"/Login"}>
            want to login?
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
              Change Password
            </button>
          )}
        </div>
      </form>
    </>
  );
}
