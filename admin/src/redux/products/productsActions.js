import * as requestFromServer from "./productsCrud";
import { productsSlice, callTypes } from "./productsSlice";

const { actions } = productsSlice;

export const fetchProducts = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProducts()
    .then((response) => {
      // const { totalCount, entities } = response.data;
      const { totalCount } = response.data.meta;
      const { data: entities } = response.data;
      dispatch(actions.productsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find products";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProductForProductDetails = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.productFetchedForProductDetails({ productForDetails: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(id)
    .then((response) => {
      const product = response.data.data;
      dispatch(
        actions.productFetchedForProductDetails({ productForDetails: product })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchProduct = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.productFetched({ productForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(id)
    .then((response) => {
      const product = response.data.data;
      dispatch(actions.productFetched({ productForEdit: product }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProduct = (productForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProduct(productForCreation)
    .then((response) => {
      productForCreation = JSON.stringify(productForCreation.serializeObject());
      const { productId } = response.data.productId;
      productForCreation._id = productId;
      dispatch(actions.productCreated({ productForCreation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProduct = (product) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProduct(product)
    .then((response) => {
      // fetchProducts();
      product = JSON.stringify(product.serializeObject());
      dispatch(actions.productUpdated({ product }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProduct(id)
    .then((response) => {
      dispatch(actions.productDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete product";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

////////// *** --- *** End Useful Functions *** --- *** //////////

// export const fetchProducts = (queryParams) => (dispatch) => {
//   // console.log("debug :: actions :: fetchProducts :: isDone :D", queryParams);
//   dispatch(actions.startCall({ callType: callTypes.list }));
//   return requestFromServer
//     .findProducts(queryParams)
//     .then((response) => {
//       // const { totalCount, entities } = response.data;
//       const { totalCount } = response.data.meta;
//       const { data: entities } = response.data;
//       dispatch(actions.productsFetched({ totalCount, entities }));
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find products";
//       dispatch(actions.catchError({ error, callType: callTypes.list }));
//     });
// };

// export const updateProductsStatus = (ids, status) => dispatch => {
//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .updateStatusForProducts(ids, status)
//     .then(() => {
//       dispatch(actions.productsStatusUpdated({ ids, status }));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't update products status";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };

export const deleteProducts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProducts(ids)
    .then(() => {
      dispatch(actions.productsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete products";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
