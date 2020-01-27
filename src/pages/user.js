import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Haiku from "../components/haiku/Haiku";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    haikuIDParam: null
  };
  componentDidMount() {
    const userHandle = this.props.match.params.userHandle;
    const haikuID = this.props.match.params.haikuID;

    if (haikuID) {
      this.setState({ haikuIDParam: haikuID });
    }

    this.props.getUserData(userHandle);
    axios
      .get(`/user/${userHandle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { haikus, loading } = this.props.data;
    const { haikuIDParam } = this.state;

    const haikusMarkup = loading ? (
      <p>Loading data...</p>
    ) : haikus === null ? (
      <p>User has no haikus</p>
    ) : !haikuIDParam ? (
      haikus.map(haiku => <Haiku key={haiku.haikuID} haiku={haiku} />)
    ) : (
      haikus.map(haiku => {
        if (haiku.haikuID !== haikuIDParam) {
          return <Haiku key={haiku.haikuID} haiku={haiku} />;
        } else {
          return <Haiku key={haiku.haikuID} haiku={haiku} openDialog />;
        }
      })
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {haikusMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
