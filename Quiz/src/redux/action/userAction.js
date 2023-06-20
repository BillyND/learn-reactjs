export const FETCH_USER_ACCESS_LOGIN = "FETCH_USER_ACCESS_LOGIN";
export const LOGOUT_USER = "LOGOUT_USER";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_ACCESS_LOGIN,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: LOGOUT_USER,
  };
};
