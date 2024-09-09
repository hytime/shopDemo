import { request } from "@/util/request";

/**
 * user login method
 * @param {*} param0
 * @returns
 */
export const login = async ({ username, password }) => {
  // console.log(urlParams.toString());
  return request("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });
};

export const refresh = (expiresInMins = 60) => {
  return request("https://dummyjson.com/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expiresInMins, // optional, defaults to 60
    }),
  })
    .then(async (res) => {
      const user = await res.json();
      localStorage.setItem("user", user);
      localStorage.setItem("token", user && user.token);
    })
    .console.error((err) => {
      console.error(err);
    });
};
