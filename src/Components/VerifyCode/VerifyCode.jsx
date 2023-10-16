import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function VerifyCode() {
  const location = useLocation();
  let [loading, setLoading] = useState(false);
  const { email } = location.state;
  let navigate = useNavigate();

  async function handleSubmit(values) {
    setLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((res) => {
        navigate("/ChangePassword", { state: { email } });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
    setLoading(false);
  }

  let validationSchema = yup.object({
    resetCode: yup.string().required("Reset Code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <form className="w-75 mx-auto py-5 my-5" onSubmit={formik.handleSubmit}>
        <h1>Verify Code: </h1>
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
        <label htmlFor="resetCode">
          Enter The Reset Code Thast Was Sent To Your Mailbox:
        </label>
        <input
          onChange={formik.handleChange}
          onBlurCapture={formik.handleBlur}
          type="text"
          name="resetCode"
          className="form-control mb-2"
          id="resetCode"
          value={formik.values.resetCode}
          placeholder="Enter The Reset Code"
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
              Send Code
            </button>
          )}
        </div>
      </form>
    </>
  );
}
