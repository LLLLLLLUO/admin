const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'info';

function setToken(k) {
  sessionStorage.setItem(TOKEN_KEY, k);
}

function getToken() {
  return sessionStorage[TOKEN_KEY]
}

function removeToken() {
  sessionStorage.removeItem(TOKEN_KEY);
};

function setUserInfo(user) {
  sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
};

function getUserInfos() {
  return JSON.parse(sessionStorage[USER_INFO_KEY]);
};

function removeUserInfo() {
  sessionStorage.removeItem(USER_INFO_KEY);
}

export {
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  getUserInfos,
  removeUserInfo
}
