import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import './FiristButton.css'

const FiristButton = () => {
    return ( <Button className="first-button" variant="contained" endIcon={<SendIcon />}></Button>)
}
   
export default FiristButton