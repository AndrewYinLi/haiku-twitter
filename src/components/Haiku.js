import React, { Component } from "react";

import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import WrappedButton from "../util/WrappedButton";
import DeleteHaiku from "./DeleteHaiku";
import HaikuDialog from "./HaikuDialog";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeHaiku, unlikeHaiku } from "../redux/actions/dataActions";
import { LikeButton } from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Haiku extends Component {
  likedHaiku = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.haikuID === this.props.haiku.haikuID
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeHaiku = () => {
    this.props.likeHaiku(this.props.haiku.haikuID);
  };

  unlikeHaiku = () => {
    this.props.unlikeHaiku(this.props.haiku.haikuID);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      haiku: {
        body,
        createdAt,
        userImage,
        userHandle,
        haikuID,
        likeCount,
        commentCount
      },
      user: { authenticated, credentials }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === credentials.userHandle ? (
        <DeleteHaiku haikuID={haikuID} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="secondary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton haikuID={haikuID} {...this.props} />
          <span>{likeCount} likes</span>
          <WrappedButton tooltipTitle="Comments">
            <ChatIcon color="primary" />
          </WrappedButton>
          <span>{commentCount} comments</span>
          <HaikuDialog haikuID={haikuID} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Haiku.propTypes = {
  likeHaiku: PropTypes.func.isRequired,
  unlikeHaiku: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  haiku: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeHaiku,
  unlikeHaiku
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Haiku));
