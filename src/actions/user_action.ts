import axios from "axios";

// type
export const LOGIN_USER = "LOGIN_USER";

export function loginUser(dataToSubmit: object) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => {
      response.data as any;
    });
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
