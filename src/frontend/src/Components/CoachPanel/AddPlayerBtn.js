import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const AddPlayerBtn = () => {
  const webApiURL = process.env.REACT_APP_API_URL;

  const initialValues = {
    playerName: "",
    playerRegion: "EUN1",
  };

  const searchID = localStorage.getItem("AnalitixID");

  const validationSchema = Yup.object({
    playerName: Yup.string().required("Summoner name is required"),
    // region: Yup.string().required("Region is required"),
  });

  const handleFormSubmit = useMutation(async (values) => {
    try {
      const response = await axios.put(
        `${webApiURL}/api/teams/${searchID}/add-player`,
        values
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      // console.log(err.response.data.message);
      formik.setErrors({ addUserError: err.response.data.message });
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
    <div className="add-player-section">
      <div className="add-player-heading">
        <FontAwesomeIcon
          className="add-player-icon"
          icon={faCircleExclamation}
        />
        It looks like you didn't add all of your team members. Go ahead and add
        them below!
      </div>
      {formik.errors.addUserError ? (
        <div className="add-player-error">{formik.errors.addUserError}</div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="add-player-input">
          <input
            className="input-field"
            onChange={formik.handleChange}
            type="text"
            placeholder="Name"
            name="playerName"
            value={formik.values.playerName}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.playerName && formik.errors.playerName ? (
            <div className="add-player-error">{formik.errors.playerName}</div>
          ) : null}
        </div>

        <div className="add-player-input">
          <select
            className="input-field select"
            name="playerRegion"
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

          {formik.touched.playerRegion && formik.errors.playerRegion ? (
            <div className="add-player-error">{formik.errors.playerRegion}</div>
          ) : null}
        </div>
        <div className="add-player-submit">
          <button type="submit" className="submit-btn">
            Add player
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlayerBtn;
