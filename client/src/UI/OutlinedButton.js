import * as React from "react";
import Button from "@mui/material/Button";
import ButtonStyles from "./ButtonStyles.module.css";

const OutlinedButton = () => {
  return (
    <Button className={ButtonStyles.button} variant="outlined">
      Submit
    </Button>
  );
};

export default OutlinedButton;
