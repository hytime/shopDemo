import { request } from "@/util/request";
export const getProduct = async ({ limit = 20, skip = 0, q = "" }) => {
  const url = "https://dummyjson.com/products/search";
  const urlParams = new URL(url);
  urlParams.searchParams.append("limit", limit);
  urlParams.searchParams.append("skip", skip);
  urlParams.searchParams.append("q", q);
  // console.log(urlParams.toString());
  return request(urlParams.toString(), {
    method: "GET",
  });
};
/**
 *   product detail
 * @param {*} id
 * @returns
 */
export const getProductDetail = async (id) => {
  const url = `https://dummyjson.com/products/${id}`;
  const urlParams = new URL(url);

  // console.log(urlParams.toString());
  return request(urlParams.toString(), {
    method: "GET",
  });
};

export const getProductCategoryies = async () => {
  const url = `https://dummyjson.com/products/categories`;
  const urlParams = new URL(url);

  // console.log(urlParams.toString());
  return request(urlParams.toString(), {
    method: "GET",
  });
};
export const getProductCategoryie = async (categorie) => {
  const url = `https://dummyjson.com/products/categorie/${categorie}`;
  const urlParams = new URL(url);

  // console.log(urlParams.toString());
  return request(urlParams.toString(), {
    method: "GET",
  });
};
export const updateProduct = async (id, data) => {
  /* updating title of product with id 1 */
  return request(`https://dummyjson.com/auth/products/${id}`, {
    method: "PUT" /* or PATCH */,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteProduct = async (id) => {
  return request(`https://dummyjson.com/auth/products/${id}`, {
    method: "DELETE",
  });
};
