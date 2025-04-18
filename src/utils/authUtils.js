const LOGIN_TOKEN_KEY = "cc-token";

const fetchToken = (key) => {
  if (sessionStorage.getItem(key) !== null) {
    const { token, role, username } = JSON.parse(sessionStorage.getItem(key));

    return { token, role, username };
  } else {
    return {};
  }
};

const storeToken = (key, token) => {
  if (token) {
    sessionStorage.setItem(key, token);
  }
};

const removeToken = (key) => {
  sessionStorage.removeItem(key);
};

export { LOGIN_TOKEN_KEY, fetchToken, storeToken, removeToken };
