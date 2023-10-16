import React, { useState } from "react";
import styles from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    let response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });

    if (response.data.message === "success") {
      navigate("/login");
    }
    setLoading(false);
  }

  // function validate(values) {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z](?=.*\d{6,20})\S*$/;
  //   const phoneregex = /^01[015][0-9]{8}$/;
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "Name can't be empty";
  //   } else if (values.name.split(" ").length < 2) {
  //     errors.name = "You should add your first and second name";
  //   }

  //   if (!values.email) {
  //     errors.email = "Email can't be empty";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "Enter a valid email";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password can't be empty";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password =
  //       "Password should start with a capital then a small letter then from 6 to 20 to any digit";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Phone can't be empty";
  //   } else if (!phoneregex.test(values.phone)) {
  //     errors.phone = "Enter a valid Phone";
  //   }

  //   if (values.rePassword !== values.password) {
  //     errors.rePassword = "Both passwords doesn't match";
  //   }
  //   return errors;
  // }

  let validateSchema = yup.object({
    name: yup
      .string()
      .required("Name can't be empty")
      .min(2, "You should add your first and second name"),
    email: yup
      .string()
      .required("Email can't be empty")
      .email("Enter a valid email"),
    password: yup
      .string()
      .required("Password can't be empty")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z](?=.*\d{3,20})\S*$/,
        "Password should start with a capital then a small letter then from 6 to 20 to any digit"
      ),
    rePassword: yup
      .string()
      .required("Password can't be empty")
      .oneOf([yup.ref("password")], "Both passwords doesn't match"),
    phone: yup
      .string()
      .required("Phone can't be empty")
      .matches(/^01[015][0-9]{8}$/, "Enter a valid Phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validateSchema,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-75 m-auto py-5">
        <h1>Register Now:</h1>
        {error ? (
          <div className="alert alert-danger p-2 mt-2">{error}</div>
        ) : (
          ""
        )}
        <form action="" className="w-100" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            className="form-control mb-2"
            type="name"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
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
            onBlur={formik.handleBlur}
          />

          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            className="form-control mb-2"
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone:</label>
          <input
            className="form-control mb-2"
            type="phone"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          {loading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="button"
              className="btn bg-main text-white ms-auto d-block mt-2"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white ms-auto d-block mt-2"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
