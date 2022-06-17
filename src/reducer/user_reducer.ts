import { LOGIN_USER } from "../actions/user_action";

export default function user(state = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    default:
      return state;
  }
}
