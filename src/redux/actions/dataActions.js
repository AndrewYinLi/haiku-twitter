import { SET_HAIKUS, LOADING_DATA, LIKE_HAIKU, UNLIKE_HAIKU } from "../types";
import axios from "axios";

export const getHaikus = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/haikus")
    .then(res => {
      dispatch({
        type: SET_HAIKUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_HAIKUS,
        payload: []
      });
    });
};

export const likeHaiku = haikuID => dispatch => {
  axios
    .get(`/haiku/${haikuID}/like`)
    .then(res => {
      dispatch({
        type: LIKE_HAIKU,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const unlikeHaiku = haikuID => dispatch => {
  axios
    .get(`/haiku/${haikuID}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_HAIKU,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
