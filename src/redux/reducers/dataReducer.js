import { SET_HAIKUS, LOADING_DATA, LIKE_HAIKU, UNLIKE_HAIKU } from "../types";

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
      let index = state.haikus.findIndex(
        haiku => haiku.haikuID === action.payload.haikuID
      );
      state.haikus[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
