const isloggedIn = null;

// action
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const ADMIN_USER = "ADMIN_USER";

export default function user(state: boolean | null = isloggedIn, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return (state = true);
    case LOGIN_FAIL:
      return (state = false);
    case ADMIN_USER:
      return (state = null);
    default:
      return state;
  }
}
