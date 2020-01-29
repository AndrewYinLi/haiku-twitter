import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import WrappedButton from "../../util/WrappedButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

import dayjs from "dayjs";

import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { getHaiku, clearErrors } from "../../redux/actions/dataActions";

const styles = themes => ({
  ...themes.spreadable,
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
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});

class HaikuDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, haikuID } = this.props;
    const newPath = `/users/${userHandle}/haiku/${haikuID}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getHaiku(this.props.haikuID);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
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
        userHandle,
        comments
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
          <Typography variant="body2" color="textPrimary">
            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          {
            // <LikeButton haikuID={haikuID} />
            // <span>{likeCount} likes</span>
            // <WrappedButton tooltipTitle="Comments">
            //   <ChatIcon color="primary" />
            // </WrappedButton>
            // <span>{commentCount} comments</span>
          }
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm haikuID={haikuID} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <WrappedButton onClick={this.handleOpen} tooltipTitle="View comments">
          <ChatIcon color="primary" />
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
  clearErrors: PropTypes.func.isRequired,
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
  getHaiku,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HaikuDialog));
