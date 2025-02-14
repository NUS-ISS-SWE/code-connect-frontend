const LOGIN_TOKEN_KEY = "cc-token";

const fetchToken = (key) => {
  return localStorage.getItem(key);
};

const storeToken = (key, token) => {
  if (token) {
    localStorage.setItem(key, token);
  }
};

const removeToken = (key) => {
  localStorage.removeItem(key);
};

export { LOGIN_TOKEN_KEY, fetchToken, storeToken, removeToken };
