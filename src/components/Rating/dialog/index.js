import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import RatingBar from "../component";
import { RateLabel } from "./style";
import { updateSkheraRating } from "../../../api/skheraApi";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ColorButton = withStyles(theme => ({
  root: {
    color: "#419d78",
    "&:hover": {
      backgroundColor: "#e5e5e5"
    }
  }
}))(Button);

export default function CustomizedDialogs({ rider, skheraId }) {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (rating !== 0) {
      handleClose();
      updateSkheraRating(skheraId, rating);
    }
  };

  return (
    <div>
      <RateLabel onClick={handleClickOpen}>Rate the rider</RateLabel>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Rate the rider
        </DialogTitle>
        <DialogContent dividers>
          <div className="dialog-body">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={rider.image} alt="" className="rider-profile-img" />
              <Typography
                gutterBottom
                style={{ padding: "16px", fontFamily: "Ropa Sans" }}
              >
                {rider.name}
              </Typography>
            </div>
            <RatingBar rating={rating} setRating={setRating} />
          </div>
        </DialogContent>
        <DialogActions>
          <ColorButton onClick={handleSave} color="#419d78">
            SAVE
          </ColorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
