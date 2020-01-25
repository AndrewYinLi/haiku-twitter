import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";

// mui
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

//icons TODO: change icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import { connect } from "react-redux";

import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import WrappedButton from "../../util/WrappedButton";

const styles = theme => ({
  ...theme.spreadable
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: {
          userHandle,
          createdAt,
          imageURL,
          bio,
          website,
          location
        },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageURL} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />

              <WrappedButton
                tooltipTitle="Edit profile picture"
                onClick={this.handleEditPicture}
                buttonClassName="button"
              >
                <EditIcon color="secondary"></EditIcon>
              </WrappedButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
                variant="h5"
              >
                @{userHandle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>

            <WrappedButton tooltipTitle="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="secondary" />
            </WrappedButton>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography component={"span"} variant="body2" align="center">
            No profile found, please login!
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStatesToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStatesToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
