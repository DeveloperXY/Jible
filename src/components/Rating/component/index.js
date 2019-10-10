import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent"
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ""}>
      <div {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};

const useStyles = makeStyles({
  rating1: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
});

export default function HoverRating({ rating, setRating }) {
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <div className={classes.rating1}>
          <Rating
            name="hover-side"
            value={rating}
            precision={1}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Box ml={2} color="#419d78">
            {labels[hover !== -1 ? hover : rating]}
          </Box>
        </div>
      </Box>
    </div>
  );
}
