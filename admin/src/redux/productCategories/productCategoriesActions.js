import * as requestFromServer from "./productCategoriesCrud";
import { productCategoriesSlice, callTypes } from "./productCategoriesSlice";

const { actions } = productCategoriesSlice;

export const fetchAllProductCategories = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProductCategories()
    .then((response) => {
      // const { totalCount, entities } = response.data;
      const { totalCount } = response.data.meta;
      const { data: entities } = response.data;
      dispatch(actions.productCategoriesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProductCategories = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProductCategories()
    .then((response) => {
      // const { totalCount, entities } = response.data;
      const { totalCount } = response.data.meta;
      const { data: entities } = response.data;
      dispatch(actions.productCategoriesFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProductCategoryForProductCategoryDetails = (id) => (
  dispatch
) => {
  if (!id) {
    return dispatch(
      actions.productCategoryFetchedForProductCategoryDetails({
        productCategoryForDetails: undefined,
      })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductCategoryById(id)
    .then((response) => {
      const productCategory = response.data.data;
      dispatch(
        actions.productCategoryFetchedForProductCategoryDetails({
          productCategoryForDetails: productCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchProductCategory = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.productCategoryFetched({ productCategoryForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductCategoryById(id)
    .then((response) => {
      const productCategory = response.data.data;
      dispatch(
        actions.productCategoryFetched({
          productCategoryForEdit: productCategory,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProductCategory = (productCategoryForCreation) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProductCategory(productCategoryForCreation)
    .then((response) => {
      productCategoryForCreation = JSON.stringify(
        productCategoryForCreation.serializeObject()
      );
      const { productCategoryId } = response.data.productCategoryId;
      productCategoryForCreation._id = productCategoryId;
      dispatch(actions.productCategoryCreated({ productCategoryForCreation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProductCategory = (productCategory) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProductCategory(productCategory)
    .then((response) => {
      // fetchProductCategories();
      productCategory = JSON.stringify(productCategory.serializeObject());
      dispatch(actions.productCategoryUpdated({ productCategory }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProductCategory = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductCategory(id)
    .then((response) => {
      dispatch(actions.productCategoryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productCategory";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

////////// *** --- *** End Useful Functions *** --- *** //////////

// export const fetchProductCategories = (queryParams) => (dispatch) => {
//   // console.log("debug :: actions :: fetchProductCategories :: isDone :D", queryParams);
//   dispatch(actions.startCall({ callType: callTypes.list }));
//   return requestFromServer
//     .findProductCategories(queryParams)
//     .then((response) => {
//       // const { totalCount, entities } = response.data;
//       const { totalCount } = response.data.meta;
//       const { data: entities } = response.data;
//       dispatch(actions.productCategoriesFetched({ totalCount, entities }));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find productCategories";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     });
// };

// export const updateProductCategoriesStatus = (ids, status) => dispatch => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateStatusForProductCategories(ids, status)
//     .then(() => {
//       dispatch(actions.productCategoriesStatusUpdated({ ids, status }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't update productCategories status";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };

export const deleteProductCategories = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProductCategories(ids)
    .then(() => {
      dispatch(actions.productCategoriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete productCategories";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
