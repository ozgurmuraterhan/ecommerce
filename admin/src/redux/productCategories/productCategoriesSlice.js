import { createSlice } from "@reduxjs/toolkit";

const initialProductCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productCategoryForEdit: undefined,
  productCategoryForDetails: undefined,
  productCategorySold: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: initialProductCategoriesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getProductCategoryById
    productCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.productCategoryForEdit = action.payload.productCategoryForEdit;
      state.error = null;
    },
    // getProductCategoryByIdForProductCategoryDetails
    productCategoryFetchedForProductCategoryDetails: (state, action) => {
      state.actionsLoading = false;
      state.productCategoryForDetails =
        action.payload.productCategoryForDetails;
      state.error = null;
    },
    // findProductCategories
    productCategoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // productCategorySoldReport
    productCategorySoldFetched: (state, action) => {
      const { totalCount, productCategorySold } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.productCategorySold = productCategorySold;
      state.totalCount = totalCount;
    },
    // createProductCategory
    productCategoryCreated: (state, action) => {
      console.log({ action });
      state.actionsLoading = false;
      state.error = null;
      // state.entities.push(action.payload.productCategory);
      state.entities.unshift(action.payload.productCategory);
    },
    // updateProductCategory
    productCategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.productCategory.id) {
          return action.payload.productCategory;
        }
        return entity;
      });
    },
    // deleteProductCategory
    productCategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteProductCategories
    productCategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // productCategoriesUpdateState
    productCategoriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
