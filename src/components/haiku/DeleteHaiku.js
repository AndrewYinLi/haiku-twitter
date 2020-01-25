import React, { Component, Fragment } from "react";

import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import WrappedButton from "../../util/WrappedButton";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";

import { deleteHaiku } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class DeleteHaiku extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteHaiku = () => {
    this.props.deleteHaiku(this.props.haikuID);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <WrappedButton
          tooltipTitle="Delete haiku"
          onClick={this.handleOpen}
          buttonClassName={classes.deleteButton}
        >
          <DeleteOutlineIcon color="secondary" />
        </WrappedButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure that you want to delete this haiku?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteHaiku} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteHaiku.propTypes = {
  deleteHaiku: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  haikuID: PropTypes.string.isRequired
};

export default connect(null, { deleteHaiku })(withStyles(styles)(DeleteHaiku));
