import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "@Redux/products/productsActions";
// import { addToCart } from "@Redux/cart-000/actions/cartActions";
import { Container } from "react-bootstrap";
import { ProductDetailsItem } from "./ProductDetailsItem";

const ProductDetails = ({
  history,
  match: {
    params: { id },
  },
}) => {
  // const addToCartHandler = () => {
  //   dispatch(addToCart(product._id, qty));
  //   history.push("/cart");
  // };

  const dispatch = useDispatch();
  const { actionsLoading, productForDetails } = useSelector(
    (state) => ({
      actionsLoading: state.products.actionsLoading,
      productForDetails: state.products.productForDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchProductForProductDetails(id));
    } else {
      backToProductsList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const backToProductsList = () => {
    history.push(`/product`);
  };

  const editProductHandler = (id) => {
    history.push(`/product/edit/${id}`);
  };

  const deleteProduct = (id) => {
    // server request for deleting product by id
    dispatch(actions.deleteProduct(id))
      .then(() => backToProductsList())
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <ProductDetailsItem
        actionsLoading={actionsLoading}
        productForDetails={productForDetails}
        editProductHandler={editProductHandler}
        deleteProductHandler={deleteProduct}
      />
    </Container>
  );
};

export default ProductDetails;
