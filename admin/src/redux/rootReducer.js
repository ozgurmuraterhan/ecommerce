import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "@Redux/auth/authRedux";
import { usersSlice } from "@Redux/users/usersSlice";
import { productsSlice } from "@Redux/products/productsSlice";
import { productCategoriesSlice } from "@Redux/productCategories/productCategoriesSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  users: usersSlice.reducer,
  products: productsSlice.reducer,
  productCategories: productCategoriesSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
