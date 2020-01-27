import {
  SET_USER,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_HAIKU,
  UNLIKE_HAIKU,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_HAIKU:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.userHandle,
            haikuID: action.payload.haikuID
          }
        ]
      };
    case UNLIKE_HAIKU:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.haikuID !== action.payload.haikuID
        )
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notification => (notification.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
