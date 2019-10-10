import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { LoadingContainer } from "./style";

export const ColoredCircularProgress = withStyles({
  root: {
    color: "#419D78"
  }
})(CircularProgress);

const Loading = ({ disableText, text, size }) => (
  <LoadingContainer>
    <ColoredCircularProgress size={size} />
    {!disableText && <div className="loading-label">{text}</div>}
  </LoadingContainer>
);

Loading.defaultProps = {
  disableText: false,
  text: "Loading...",
  size: 120
};

export default Loading;
