import axios from "axios";
import url from "@Helpers/api/url.json";

// export const PRODUCTS_URL = "api/products";
export const PRODUCTS_URL = `${url.PRODUCTS_URL}`;

// CREATE =>  POST: add a new product to the server
export function createProduct(product) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(`${PRODUCTS_URL}`, product, configuration);
}

// READ
export function getAllProducts() {
  return axios.get(PRODUCTS_URL);
}

export function getProductById(productId) {
  return axios.get(`${PRODUCTS_URL}/${productId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts() {
  return axios.get(`${PRODUCTS_URL}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
// export function findProducts(queryParams) {
// return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
// return axios.get(
// `${PRODUCTS_URL}?ProductCategoryId=${queryParams.filter.productCategoryId}&PageNumber=${queryParams.pageNumber}&PageSize=${queryParams.pageSize}`
// );
// }

// UPDATE => PUT: update the procuct on the server
export function updateProduct(product) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.put(`${PRODUCTS_URL}`, product, configuration);
  // return axios.put(`${PRODUCTS_URL}/${product.id}`, { product });
}

// UPDATE Status
// export function updateStatusForProducts(ids, status) {
//   return axios.post(`${PRODUCTS_URL}/updateStatusForProducts`, {
//     ids,
//     status
//   });
// }

// DELETE => delete the product from the server
export function deleteProduct(id) {
  return axios.delete(`${PRODUCTS_URL}/${id}`);
}

// DELETE Products by ids
export function deleteProducts(ids) {
  const idsForDelete = [];
  ids.map((id) => idsForDelete.push(id));

  return axios.delete(`${PRODUCTS_URL}`, { data: { Id: idsForDelete } });
}
