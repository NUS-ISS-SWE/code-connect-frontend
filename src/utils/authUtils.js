const LOGIN_TOKEN_KEY = "cc-token";

const fetchToken = (key) => {
  if (localStorage.getItem(key) !== null) {
    const { token, username } = JSON.parse(localStorage.getItem(key));

    return { token, username };
  } else {
    return {};
  }
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
