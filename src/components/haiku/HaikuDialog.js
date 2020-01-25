import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import WrappedButton from "../../util/WrappedButton";
import LikeButton from "./LikeButton";

import dayjs from "dayjs";

import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import { connect } from "react-redux";
import { getHaiku } from "../../redux/actions/dataActions";

const styles = themes => ({
  ...themes.spreadable,
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});

class HaikuDialog extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getHaiku(this.props.haikuID);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      haiku: {
        haikuID,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
            variant="h5"
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton haikuID={haikuID} {...this.props} />
          <span>{likeCount} likes</span>
          <WrappedButton tooltipTitle="Comments">
            <ChatIcon color="primary" />
          </WrappedButton>
          <span>{commentCount} comments</span>
        </Grid>
        <Grid item sm={5}>
          haha
        </Grid>
      </Grid>
    );

    return (
      <Fragment>
        <WrappedButton
          onClick={this.handleOpen}
          tooltipTitle="View comments"
          tooltipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary" />
        </WrappedButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="sm"
        >
          <WrappedButton
            tooltipTitle="Close"
            onClick={this.handleClose}
            tooltipClassName={classes.closeButton}
          >
            <CloseIcon />
          </WrappedButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

HaikuDialog.propTypes = {
  getHaiku: PropTypes.func.isRequired,
  haikuID: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  haiku: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  haiku: state.data.haiku,
  UI: state.UI
});

const mapActionsToProps = {
  getHaiku
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HaikuDialog));
