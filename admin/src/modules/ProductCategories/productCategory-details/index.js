import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "@Redux/productCategories/productCategoriesActions";
import { Container } from "react-bootstrap";
import { ProductCategoryDetailsItem } from "./ProductCategoryDetailsItem";

const ProductCategoryDetails = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const { actionsLoading, productCategoryForDetails } = useSelector(
    (state) => ({
      actionsLoading: state.productCategories.actionsLoading,
      productCategoryForDetails:
        state.productCategories.productCategoryForDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchProductCategoryForProductCategoryDetails(id));
    } else {
      backToProductCategoriesList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const backToProductCategoriesList = () => {
    history.push(`/productCategory`);
  };

  const editProductCategoryHandler = (id) => {
    history.push(`/productCategory/edit/${id}`);
  };

  const deleteProductCategory = (id) => {
    // server request for deleting productCategory by id
    dispatch(actions.deleteProductCategory(id))
      .then(() => backToProductCategoriesList())
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <ProductCategoryDetailsItem
        actionsLoading={actionsLoading}
        productCategoryForDetails={productCategoryForDetails}
        editProductCategoryHandler={editProductCategoryHandler}
        deleteProductCategoryHandler={deleteProductCategory}
      />
    </Container>
  );
};

export default ProductCategoryDetails;
