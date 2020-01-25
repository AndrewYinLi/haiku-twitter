import {
  SET_HAIKUS,
  LOADING_DATA,
  LIKE_HAIKU,
  UNLIKE_HAIKU,
  DELETE_HAIKU,
  POST_HAIKU,
  SET_HAIKU
} from "../types";

const initialState = {
  haikus: [],
  haiku: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_HAIKUS:
      return {
        ...state,
        haikus: action.payload,
        loading: false
      };
    case LIKE_HAIKU:
    case UNLIKE_HAIKU:
      let unlikeIndex = state.haikus.findIndex(
        haiku => haiku.haikuID === action.payload.haikuID
      );
      state.haikus[unlikeIndex] = action.payload;
      if (state.haiku.haikuID === action.payload.haikuID) {
        state.haiku = action.payload;
      }
      return {
        ...state
      };

    case DELETE_HAIKU:
      let deleteIndex = state.haikus.findIndex(
        haiku => haiku.haikuID === action.payload
      );
      state.haikus.splice(deleteIndex, 1);
      return {
        ...state
      };
    case POST_HAIKU:
      return {
        ...state,
        haikus: [action.payload.resHaiku, ...state.haikus]
      };
    case SET_HAIKU:
      return {
        ...state,
        haiku: action.payload
      };
    default:
      return state;
  }
}
