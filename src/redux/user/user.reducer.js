import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  members: [],
  onlineUsers: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.UPDATE_ONLINE_USER:
      return {
        ...state,
        onlineUsers: action.payload,
      };

    case UserActionTypes.SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
