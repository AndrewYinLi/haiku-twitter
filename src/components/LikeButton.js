import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from "react-redux";
import { likeHaiku, unlikeHaiku } from "../redux/actions/dataActions";
import WrappedButton from "../util/WrappedButton";

export class LikeButton extends Component {
  likedHaiku = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.haikuID === this.props.haikuID)
    )
      return true;
    else return false;
  };
  likeHaiku = () => {
    this.props.likeHaiku(this.props.haikuID);
  };
  unlikeHaiku = () => {
    this.props.unlikeHaiku(this.props.haikuID);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <WrappedButton tooltipTitle="Like">
          <FavoriteBorder color="primary" />
        </WrappedButton>
      </Link>
    ) : this.likedHaiku() ? (
      <WrappedButton tooltipTitle="Undo like" onClick={this.unlikeHaiku}>
        <FavoriteIcon color="primary" />
      </WrappedButton>
    ) : (
      <WrappedButton tooltipTitle="Like" onClick={this.likeHaiku}>
        <FavoriteBorder color="primary" />
      </WrappedButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  haikuID: PropTypes.string.isRequired,
  likeHaiku: PropTypes.func.isRequired,
  unlikeHaiku: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeHaiku,
  unlikeHaiku
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
