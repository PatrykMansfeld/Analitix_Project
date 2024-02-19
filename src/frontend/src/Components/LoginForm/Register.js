import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import background from "../../assets/videos/home_page_bg.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Register = () => {
  const webApiURL = process.env.REACT_APP_API_URL;

  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    teamName: "",
    region: "EUN1",
  };

  // console.log(checked);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Wrong e-mail format")
      .required("E-mail is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleFormSubmit = useMutation(async (values) => {
    try {
      const response = await axios.post(
        `${webApiURL}/api/users/register`,
        values
      );
      // console.log(response.data);
      // console.log(response.status);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      // console.log(err.response.data.message);
      formik.setErrors({ registerError: err.response.data.message });
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
    <div className="register-container">
      {/* Background image */}
      <video autoPlay loop muted className="main-aboutapp-video">
        <source src={background} type="video/mp4" />
      </video>

      <motion.div
        className="register-section"
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
        initial={{ opacity: 0 }}
      >
        <div className="register-section-heading">Register</div>
        {/* SWITCH SECTION */}
        <div className="switch-container">
          <p className="switch-info">Player</p>
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
            onColor="#754bc4"
            offColor="#754bc4"
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <p className="switch-info">Coach</p>
        </div>
        {/* REGISTER FORM */}
        {checked ? (
          // COACH FORM

          <motion.form
            animate={{ opacity: 1, x: "0px" }}
            initial={{ opacity: 0, x: "-100px" }}
            className="register-form-coach"
            value={(formik.values.accountType = "coach")}
            onSubmit={formik.handleSubmit}
          >
            {/* FORM ERROR HANDLING */}
            {formik.errors.registerError ? (
              <div className="form-error">{formik.errors.registerError}</div>
            ) : (
              <div className="form-error-ph"> </div>
            )}
            <div className="register-section-input">
              <input
                className="input-field"
                onChange={formik.handleChange}
                type="text"
                placeholder="Your nickname..."
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                required
              />
              {/* ERROR HANDLING */}
              {formik.touched.name && formik.errors.name ? (
                <div className="input-error">{formik.errors.name}</div>
              ) : (
                <div className="input-error-ph"></div>
              )}
            </div>

            <div className="register-section-input">
              <input
                className="input-field"
                type="email"
                placeholder="Your e-mail address..."
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              {/* ERROR HANDLING */}
              {formik.touched.email && formik.errors.email ? (
                <div className="input-error">{formik.errors.email}</div>
              ) : (
                <div className="input-error-ph"></div>
              )}
            </div>

            <div className="register-section-input">
              <input
                className="input-field"
                type="password"
                placeholder="Your password..."
                name="password"
                minLength="8"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
              {/* ERROR HANDLING */}
              {formik.touched.password && formik.errors.password ? (
                <div className="input-error">{formik.errors.password}</div>
              ) : (
                <div className="input-error-ph"></div>
              )}
            </div>

            <div className="register-section-input">
              <input
                className="input-field"
                type="password"
                placeholder="Confirm your password..."
                name="confirmPassword"
                minLength="8"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                required
              />
              {/* ERROR HANDLING */}
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="input-error">
                  {formik.errors.confirmPassword}
                </div>
              ) : (
                <div className="input-error-ph"></div>
              )}
            </div>

            <div className="register-section-input">
              <input
                className="input-field"
                type="teamName"
                placeholder="Your team name..."
                name="teamName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.teamName}
              />
              {/* ERROR HANDLING */}
              {formik.touched.teamName && formik.errors.teamName ? (
                <div className="input-error">{formik.errors.teamName}</div>
              ) : (
                <div className="input-error-ph"></div>
              )}
            </div>
            {/* SUBMIT BUTTON SECTION */}
            <div className="register-section-submit">
              <button type="submit" className="submit-btn">
                Register
              </button>
            </div>
          </motion.form>
        ) : (
          // change to second register
          <motion.div
            animate={{ opacity: 1, x: "0px" }}
            initial={{ opacity: 0, x: "100px" }}
          >
            <form
              id="register-form-player"
              className="register-form-player"
              value={(formik.values.accountType = "player")}
              onSubmit={formik.handleSubmit}
            >
              {/* FORM ERROR HANDLING */}
              {formik.errors.registerError ? (
                <div className="form-error">{formik.errors.registerError}</div>
              ) : (
                <div className="form-error-ph"> </div>
              )}
              <div className="account-type-info">
                <p>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="account-type-icon"
                  />
                  Summoner name field shoud contain your League of Legends
                  summoner name.
                </p>
              </div>

              <div className="register-section-input">
                <input
                  className="input-field"
                  onChange={formik.handleChange}
                  type="text"
                  placeholder="Your summoner name..."
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  required
                />
                {/* ERROR HANDLING */}
                {formik.touched.name && formik.errors.name ? (
                  <div className="input-error">{formik.errors.name}</div>
                ) : (
                  <div className="input-error-ph"> </div>
                )}
              </div>

              <div className="register-section-input">
                <input
                  className="input-field"
                  type="email"
                  placeholder="Your e-mail address..."
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                {/* ERROR HANDLING */}
                {formik.touched.email && formik.errors.email ? (
                  <div className="input-error">{formik.errors.email}</div>
                ) : (
                  <div className="input-error-ph"></div>
                )}
              </div>

              <div className="register-section-input">
                <input
                  className="input-field"
                  type="password"
                  placeholder="Your password..."
                  name="password"
                  minLength="8"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {/* ERROR HANDLING */}
                {formik.touched.password && formik.errors.password ? (
                  <div className="input-error">{formik.errors.password}</div>
                ) : (
                  <div className="input-error-ph"></div>
                )}
              </div>

              <div className="register-section-input">
                <input
                  className="input-field"
                  type="password"
                  placeholder="Confirm your password..."
                  name="confirmPassword"
                  minLength="8"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  required
                />
                {/* ERROR HANDLING */}
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="input-error">
                    {formik.errors.confirmPassword}
                  </div>
                ) : (
                  <div className="input-error-ph"></div>
                )}
              </div>

              <div className="register-section-input">
                <select
                  className="input-field select"
                  name="region"
                  placeholder="region"
                  {...formik.getFieldProps("region")}
                >
                  <option id="option_1" value="EUN1">
                    Europe Nordic & East
                  </option>
                  <option id="option_2" value="EUW1">
                    Europe West
                  </option>
                  <option id="option_3" value="NA1">
                    North America
                  </option>
                  <option id="option_4" value="JP1">
                    Japan
                  </option>
                  <option id="option_5" value="KR">
                    Korea
                  </option>
                  <option id="option_6" value="BR1">
                    Brazil
                  </option>
                  <option id="option_7" value="LA1">
                    Latin America South
                  </option>
                  <option id="option_8" value="LA2">
                    Latin America North
                  </option>
                  <option id="option_9" value="OC1">
                    Oceania
                  </option>
                  <option id="option_10" value="TR1">
                    Turkey
                  </option>
                  <option id="option_11" value="RU">
                    Commonwealth of Independent States
                  </option>
                </select>
                {/* ERROR HANDLING */}
                {formik.touched.region && formik.errors.region ? (
                  <div className="input-error">{formik.errors.region}</div>
                ) : (
                  <div className="input-error-ph"></div>
                )}
              </div>
              <div className="register-section-submit">
                <button type="submit" className="submit-btn">
                  Register
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
