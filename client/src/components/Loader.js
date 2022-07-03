import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const Loader = (props) => {
  const override = css`
    display: block;
    margin: 0 auto;
    transition: all 0.4s;
  `;
  return (
    <ClipLoader
      color="rgb(184, 129, 235)"
      size={60}
      loading={props.load}
      css={override}
    />
  );
};

export default Loader;
