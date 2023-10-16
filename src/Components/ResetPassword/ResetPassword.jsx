import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  async function handleSubmit(values) {
    setLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((res) => {
        navigate("/VerifyCode", { state: { email: values.email } });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setLoading(false);
  }
  let validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <form className="w-75 mx-auto py-5 my-5" onSubmit={formik.handleSubmit}>
        <h1>Reset Password: </h1>
        <label htmlFor="email">email:</label>
        <input
          onBlur={formik.handleBlur}
          onInput={formik.handleChange}
          type="email"
          name="email"
          className="form-control mb-2"
          id="email"
          value={formik.values.email}
          placeholder="Enter Your Email"
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
