import { request } from "@/util/request";
export const getUserCart = (id) => {
  return request(`https://dummyjson.com/auth/carts/user/${id}`);
};

export const addUserCart = (id, data) => {
  return request(`https://dummyjson.com/auth/carts/add`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ userId: id, data }),
  });
};

export const delUserCart = (id) => {
  return request(`https://dummyjson.com/auth/carts/${id}`, {
    method: "DELETE",
  });
};
export const editUserCart = (id, data) => {
  return request(`https://dummyjson.com/auth/carts/${id}`, {
    method: "PUT" /* or PATCH */,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ merge: true, data }),
  });
};
