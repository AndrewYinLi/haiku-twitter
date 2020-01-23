import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Haiku from "../components/Haiku";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getHaikus } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getHaikus();
  }
  render() {
    const { haikus, loading } = this.props.data;
    let recentHaikusMarkup = !loading ? (
      haikus.map(haiku => <Haiku key={haiku.haikuID} haiku={haiku} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentHaikusMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getHaikus: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getHaikus })(home);
