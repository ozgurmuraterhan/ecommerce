import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "@Redux/auth/authRedux";
import { productsSlice } from "@Redux/products/productsSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  products: productsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
