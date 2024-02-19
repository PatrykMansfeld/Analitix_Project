import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../../assets/videos/home_page_bg.mp4";
import { motion } from "framer-motion";

const LoginForm = () => {
  const webApiURL = process.env.REACT_APP_API_URL;

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required!"),
    email: Yup.string()
      .email("Wrong e-mail format!")
      .required("E-mail is required!"),
  });

  const handleFormSubmit = useMutation(async (values) => {
    try {
      const response = await axios.post(`${webApiURL}/api/users/login`, values);

      if (response.status === 200 && response.data.accountType === "coach") {
        const userName = response.data.name;
        const userID = response.data.id;

        window.localStorage.setItem("AnalitixID", userID);
        window.localStorage.setItem("Name", userName);
        navigate("/CoachPanel");
      } else if (
        response.status === 200 &&
        response.data.accountType === "player"
      ) {
        const analitixID = response.data.analitixId;
        const userName = response.data.name;
        const userID = response.data.id;

        window.localStorage.setItem("AnalitixID", analitixID);
        window.localStorage.setItem("Name", userName);
        window.localStorage.setItem("ID", userID);
        navigate("/UserPanel");
      }
    } catch (err) {
      // console.log(err.response.data.message);
      formik.setErrors({ loginError: err.response.data.message });
    }
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleFormSubmit.mutate(values);
    },
  });

  return (
    <div className="login-page-container">
      {/* Background image */}
      <video autoPlay loop muted className="main-aboutapp-video">
        <source src={background} type="video/mp4" />
      </video>
      <motion.div
        animate={{
          opacity: 1,
          transition: { duration: 0.5, delay: 0.3 },
        }}
        initial={{ opacity: 0 }}
        className="login-section"
      >
        <div className="login-section-heading">Login</div>

        <form onSubmit={formik.handleSubmit} className="login-form">
          {/* FORM ERROR HANDLING */}
          {formik.errors.loginError ? (
            <div className="form-error">{formik.errors.loginError}</div>
          ) : (
            <div className="form-error-ph"> </div>
          )}
          <div className="login-section-input">
            {/* <label htmlFor="email" className="input-label">
              E-mail
            </label> */}
            <input
              id="email"
              name="email"
              type="text"
              className="input-field"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Your e-mail adress..."
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="input-error">{formik.errors.email}</div>
            ) : (
              <div className="input-error-ph"></div>
            )}
          </div>
          <div className="login-section-input">
            {/* <label htmlFor="password" className="input-label">
              Password
            </label> */}
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Your password..."
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="input-error">{formik.errors.password}</div>
            ) : (
              <div className="input-error-ph"></div>
            )}
          </div>
          <div className="login-section-submit">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
