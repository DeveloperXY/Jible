import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { LoadingContainer } from "./style";

export const ColoredCircularProgress = withStyles({
  root: {
    color: "#419D78"
  }
})(CircularProgress);

const Loading = ({ text, size }) => (
  <LoadingContainer>
    <ColoredCircularProgress size={size} />
    <div className="loading-label">{text}</div>
  </LoadingContainer>
);

export default Loading;
