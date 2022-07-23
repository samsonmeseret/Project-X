import React from "react";
import TextField from "@mui/material/TextField";

import style from "./feedback.module.css";

const Feedback = () => {
  return (
    <div className={style.feedback_container}>
      <div className={style.feedback}>
        <h2>Lets hear from you</h2>
        <div className={style.feedback_text}>
          <form action="">
            <div className={style.feedback_text_name}>
              <TextField
                type={"text"}
                required
                id="outlined-basic"
                label="FirstName"
                variant="standard"
                style={{
                  width: "20rem",
                }}
              />
              <TextField
                type={"text"}
                required
                id="outlined-basic"
                label="LastName"
                variant="standard"
                style={{
                  width: "20rem",
                }}
              />
            </div>
            <TextField
              type={"text"}
              required
              id="outlined-basic"
              label="Your Email"
              variant="standard"
              //   style={{
              //     width: "20rem",
              //   }}
            />
            <TextField
              type={"email"}
              required
              id="outlined-basic"
              label="Subject"
              variant="standard"
            />
            <TextField
              type={"email"}
              required
              id="outlined-basic"
              label="Message"
              variant="standard"
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
