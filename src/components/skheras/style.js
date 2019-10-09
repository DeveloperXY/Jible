import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

export const SkherasContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  margin-top: 100px;

  .loading-label {
    margin-top: 16px;
  }
`;

export const ColoredCircularProgress = withStyles({
  root: {
    color: "#419D78"
  }
})(CircularProgress);
