// stores token in client browser
export const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};

// returns token in client browser
export const getToken = () => {
  return localStorage.getItem("token");
};

// delete user token from client browser
export const deleteToken = () => {
  return localStorage.removeItem("token");
};
