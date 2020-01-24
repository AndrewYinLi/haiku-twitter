import {
  SET_HAIKUS,
  LOADING_DATA,
  LIKE_HAIKU,
  UNLIKE_HAIKU,
  DELETE_HAIKU,
  POST_HAIKU,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_HAIKU,
  STOP_LOADING_UI
} from "../types";
import axios from "axios";

export const getHaiku = haikuID => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/haiku/${haikuID}`)
    .then(res => {
      dispatch({
        type: SET_HAIKU,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

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

export const postHaiku = newHaiku => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/haiku", newHaiku)
    .then(res => {
      dispatch({
        type: POST_HAIKU,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

export const deleteHaiku = haikuID => dispatch => {
  axios
    .delete(`/haiku/${haikuID}`)
    .then(() => {
      dispatch({ type: DELETE_HAIKU, payload: haikuID });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
