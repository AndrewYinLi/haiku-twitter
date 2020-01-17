import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Haiku from "../components/Haiku";

export class home extends Component {
  state = {
    haikus: null
  };
  componentDidMount() {
    axios
      .get("/haikus")
      .then(res => {
        this.setState({
          haikus: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let recentHaikusMarkup = this.state.haikus ? (
      this.state.haikus.map(haiku => (
        <Haiku key={haiku.haikuID} haiku={haiku} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentHaikusMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>profile</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
