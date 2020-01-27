import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PostHaiku from "../haiku/PostHaiku";

import Notifications from "./Notifications";

import PropTypes from "prop-types";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//import Tooltip from "@material-ui/core/Tooltip";

// icons
import HomeIcon from "@material-ui/icons/Home";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";

import WrappedButton from "../../util/WrappedButton";
import { Typography } from "@material-ui/core";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <FilterVintageIcon color="secondary" />
          <Typography color="secondary">haiku twitter</Typography>
          <div className="nav-container">
            {authenticated ? (
              <Fragment>
                <Link to="/">
                  <WrappedButton tooltipTitle="Home">
                    <HomeIcon color="secondary" />
                  </WrappedButton>
                </Link>
                <PostHaiku />
                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Log In
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </Fragment>
            )}
          </div>
          <FilterVintageIcon color="primary" />
          <Typography color="primary">haiku twitter</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
