import axios from "axios";
import url from "@Helpers/api/url.json";

// export const PRODUCTCATEGORIES_URL = "api/productCategories";
export const PRODUCTCATEGORIES_URL = `${url.PRODUCTCATEGORIES_URL}`;

// CREATE =>  POST: add a new productCategory to the server
export function createProductCategory(productCategory) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(`${PRODUCTCATEGORIES_URL}`, productCategory, configuration);
}

// READ
export function getAllProductCategories() {
  return axios.get(PRODUCTCATEGORIES_URL);
}

export function getProductCategoryById(productCategoryId) {
  return axios.get(`${PRODUCTCATEGORIES_URL}/${productCategoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProductCategories() {
  return axios.get(`${PRODUCTCATEGORIES_URL}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
// export function findProductCategories(queryParams) {
// return axios.post(`${PRODUCTCATEGORIES_URL}/find`, { queryParams });
// return axios.get(
// `${PRODUCTCATEGORIES_URL}?ProductCategoryCategoryId=${queryParams.filter.productCategoryCategoryId}&PageNumber=${queryParams.pageNumber}&PageSize=${queryParams.pageSize}`
// );
// }

// UPDATE => PUT: update the procuct on the server
export function updateProductCategory(productCategory) {
  const configuration = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.put(`${PRODUCTCATEGORIES_URL}`, productCategory, configuration);
  // return axios.put(`${PRODUCTCATEGORIES_URL}/${productCategory.id}`, { productCategory });
}

// UPDATE Status
// export function updateStatusForProductCategories(ids, status) {
//   return axios.post(`${PRODUCTCATEGORIES_URL}/updateStatusForProductCategories`, {
//     ids,
//     status
//   });
// }

// DELETE => delete the productCategory from the server
export function deleteProductCategory(id) {
  return axios.delete(`${PRODUCTCATEGORIES_URL}/${id}`);
}

// DELETE ProductCategories by ids
export function deleteProductCategories(ids) {
  const idsForDelete = [];
  ids.map((id) => idsForDelete.push(id));

  return axios.delete(`${PRODUCTCATEGORIES_URL}`, {
    data: { Id: idsForDelete },
  });
}
