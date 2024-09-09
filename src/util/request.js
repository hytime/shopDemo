import { message } from "antd";

export const request = async (url = "", init = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: "Bearer " + token,
  };
  if (token) {
    if (init && init.headers) {
      init.headers = { ...init.headers, ...headers };
    } else {
      init.headers = headers;
    }
  }
  const result = await fetch(url, init);
  return new Promise((resolve, reject) => {
    if (result.status == 403 || result.status == 401) {
      message.error("user not logged in");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      reject(result);
      goLogin();
    } else if (result.status == 200) {
      resolve(result);
    }
  });
};
function goLogin() {
  window.location.href = "/login";
}
