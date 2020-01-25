import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { postHaiku, clearErrors } from "../../redux/actions/dataActions";
import WrappedButton from "../../util/WrappedButton";

const styles = theme => ({
  ...theme.spreadable,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
    marginBottom: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "3%"
  }
});

class PostHaiku extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.postHaiku({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <WrappedButton onClick={this.handleOpen} tooltipTitle="Post a haiku!">
          <AddIcon color="secondary" />
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
          <DialogTitle>Post a new haiku!</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Haiku"
                multiline
                rows="3"
                placeholder="5
                7
                5"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth={true}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostHaiku.propTypes = {
  postHaiku: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postHaiku, clearErrors })(
  withStyles(styles)(PostHaiku)
);
